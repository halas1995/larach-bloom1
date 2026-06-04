#!/usr/bin/env python3
import os, sys, json, base64, hashlib, hmac, time, re, smtplib, threading, urllib.request
from http.server import HTTPServer, SimpleHTTPRequestHandler
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

HOST = '0.0.0.0'
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get('PORT', '8080'))
ROOT = os.path.dirname(os.path.abspath(__file__))

SMTP_EMAIL = os.environ.get('SMTP_EMAIL', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
DATABASE_URL = os.environ.get('DATABASE_URL', '')

ADMIN_USER = 'admin'
ADMIN_PASS = 'larachbloom'

use_db = bool(DATABASE_URL)
print(f'[LARACH] DATABASE_URL set: {bool(DATABASE_URL)}, using_db: {use_db}')
if use_db:
  import psycopg2
  import psycopg2.extras

  def get_db():
    print(f'[LARACH] Connecting to DB...')
    return psycopg2.connect(DATABASE_URL, sslmode='require')

  def init_db():
    try:
      conn = get_db()
      cur = conn.cursor()
      cur.execute('''
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL DEFAULT '',
          price REAL DEFAULT 0,
          qty INTEGER DEFAULT 0,
          image TEXT DEFAULT '',
          desc_text TEXT DEFAULT '',
          cat TEXT DEFAULT ''
        )
      ''')
      cur.execute('''
        CREATE TABLE IF NOT EXISTS media (
          key TEXT PRIMARY KEY,
          data BYTEA NOT NULL,
          mime TEXT NOT NULL DEFAULT 'application/octet-stream'
        )
      ''')
      cur.execute('''
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          date_text TEXT NOT NULL,
          status TEXT DEFAULT 'En attente',
          customer_json TEXT DEFAULT '{}',
          items_json TEXT DEFAULT '[]',
          total REAL DEFAULT 0,
          payment TEXT DEFAULT 'COD'
        )
      ''')
      conn.commit()
      print(f'[LARACH] DB tables created/verified')
      cur.close()
      conn.close()
    except Exception as e:
      print(f'[LARACH] DB init error: {e}')

  def load_products():
    try:
      conn = get_db()
      cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
      cur.execute('SELECT id, name, price, qty, image, desc_text AS desc, cat FROM products ORDER BY id')
      rows = cur.fetchall()
      cur.close()
      conn.close()
      prods = [dict(r) for r in rows]
      print(f'[LARACH] load_products returned {len(prods)} products from DB')
      return prods
    except Exception as e:
      print(f'[LARACH] load_products error: {e}')
      return None

  def save_products(prods):
    try:
      conn = get_db()
      cur = conn.cursor()
      cur.execute('DELETE FROM products')
      for p in prods:
        cur.execute('INSERT INTO products (id, name, price, qty, image, desc_text, cat) VALUES (%s,%s,%s,%s,%s,%s,%s)',
          (p.get('id'), p.get('name',''), p.get('price',0), p.get('qty',0), p.get('image',''), p.get('desc',''), p.get('cat','')))
      conn.commit()
      print(f'[LARACH] save_products saved {len(prods)} products to DB')
      cur.close()
      conn.close()
    except Exception as e:
      print(f'[LARACH] save_products error: {e}')

  def load_orders():
    try:
      conn = get_db()
      cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
      cur.execute('SELECT id, date_text, status, customer_json, items_json, total, payment FROM orders ORDER BY id')
      rows = cur.fetchall()
      cur.close()
      conn.close()
      result = []
      for r in rows:
        d = dict(r)
        d['date'] = d.pop('date_text')
        d['customer'] = json.loads(d.pop('customer_json'))
        d['items'] = json.loads(d.pop('items_json'))
        d['id'] = int(d['id'])
        d['total'] = float(d['total'])
        result.append(d)
      print(f'[LARACH] load_orders returned {len(result)} orders from DB')
      return result
    except Exception as e:
      print(f'[LARACH] load_orders error: {e}')
      return []

  def save_orders(orders):
    try:
      conn = get_db()
      cur = conn.cursor()
      cur.execute('DELETE FROM orders')
      for o in orders:
        cur.execute('INSERT INTO orders (id, date_text, status, customer_json, items_json, total, payment) VALUES (%s,%s,%s,%s,%s,%s,%s)',
          (o.get('id'), o.get('date',''), o.get('status','En attente'), json.dumps(o.get('customer',{})), json.dumps(o.get('items',[])), o.get('total',0), o.get('payment','COD')))
      conn.commit()
      print(f'[LARACH] save_orders saved {len(orders)} orders to DB')
      cur.close()
      conn.close()
    except Exception as e:
      print(f'[LARACH] save_orders error: {e}')

  def next_id(orders):
    max_id = 0
    for o in orders:
      try: max_id = max(max_id, int(o.get('id', 0)))
      except: pass
    return max_id + 1

  print(f'[LARACH] Calling init_db()...')
  init_db()
  print(f'[LARACH] init_db() done')

  def seed_media(key, filepath, mime, fallback_url=None):
    try:
      conn = get_db()
      cur = conn.cursor()
      cur.execute('SELECT 1 FROM media WHERE key = %s', (key,))
      if cur.fetchone():
        print(f'[LARACH] Media {key} already in DB')
        cur.close()
        conn.close()
        return
      data = None
      if os.path.exists(filepath):
        with open(filepath, 'rb') as f:
          data = f.read()
        print(f'[LARACH] Read {key} from disk ({len(data)} bytes)')
      elif fallback_url:
        print(f'[LARACH] Downloading {key} from {fallback_url}...')
        req = urllib.request.Request(fallback_url)
        resp = urllib.request.urlopen(req, timeout=120)
        data = resp.read()
        print(f'[LARACH] Downloaded {key} ({len(data)} bytes)')
      if data:
        cur.execute('INSERT INTO media (key, data, mime) VALUES (%s, %s, %s)',
                    (key, psycopg2.Binary(data), mime))
        conn.commit()
        print(f'[LARACH] Seeded media {key} into DB')
      else:
        print(f'[LARACH] Could not find or download {key}')
      cur.close()
      conn.close()
    except Exception as e:
      print(f'[LARACH] seed_media error: {e}')

  video_path = os.path.join(ROOT, 'assets', 'media', 'video-off.mp4')
  seed_media('video-off', video_path, 'video/mp4',
             fallback_url='https://larach-bloom.com/assets/media/video-off.mp4')
else:
  print(f'[LARACH] Using JSON file storage')
  DATA_DIR = os.path.join(ROOT, 'data')
  ORDERS_FILE = os.path.join(DATA_DIR, 'orders.json')
  PRODUCTS_FILE = os.path.join(DATA_DIR, 'products.json')
  os.makedirs(DATA_DIR, exist_ok=True)

  def load_orders():
    if not os.path.exists(ORDERS_FILE): return []
    try:
      with open(ORDERS_FILE, 'r', encoding='utf-8') as f: return json.load(f)
    except: return []

  def save_orders(orders):
    with open(ORDERS_FILE, 'w', encoding='utf-8') as f: json.dump(orders, f, ensure_ascii=False, indent=2)

  def load_products():
    if not os.path.exists(PRODUCTS_FILE): return None
    try:
      with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f: return json.load(f)
    except: return None

  def save_products(products):
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f: json.dump(products, f, ensure_ascii=False, indent=2)

  def next_id(orders):
    max_id = 0
    for o in orders:
      try: max_id = max(max_id, int(o.get('id', 0)))
      except: pass
    return max_id + 1

valid_statuses = {'En attente', 'Confirm\u00e9e', 'Exp\u00e9di\u00e9e', 'Livr\u00e9e', 'Annul\u00e9e'}

def auth_ok(headers):
  a = headers.get('Authorization', '')
  if not a.startswith('Basic '): return False
  try:
    raw = base64.b64decode(a[6:]).decode('utf-8')
    u, p = raw.split(':', 1)
    return u == ADMIN_USER and p == ADMIN_PASS
  except: return False

def send_order_email(order):
  if not SMTP_EMAIL or not SMTP_PASSWORD: return
  try:
    c = order.get('customer', {})
    items = order.get('items', [])
    total = order.get('total', 0)
    oid = order.get('id', '?')
    date = datetime.now().strftime('%d/%m/%Y %H:%M')

    items_html = ''.join(f'<tr><td style="padding:8px 12px;border-bottom:1px solid #eee">{i.get("name","")}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center">x{i.get("qty","")}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right">{i.get("price",0)*i.get("qty",1)} DH</td></tr>' for i in items)
    total_str = f'{total:,}'.replace(',', ' ') + ' DH'

    shop_html = f'''<html><body style="font-family:Arial,sans-serif;padding:20px">
<h2 style="color:#3d3530">Nouvelle commande #{oid}</h2>
<p><strong>Date :</strong> {date}</p>
<h3>Client</h3>
<p><strong>Nom :</strong> {c.get("firstName","")} {c.get("lastName","")}<br>
<strong>T\u00e9l\u00e9phone :</strong> {c.get("phone","")}<br>
<strong>Email :</strong> {c.get("email","") or "Non renseign\u00e9"}<br>
<strong>Ville :</strong> {c.get("city","")}<br>
<strong>Adresse :</strong> {c.get("address","")}<br>
<strong>Notes :</strong> {c.get("notes","") or "Aucune"}</p>
<h3>Articles</h3>
<table style="width:100%;border-collapse:collapse">{items_html}</table>
<p style="font-size:18px;font-weight:bold;margin-top:16px">Total : {total_str}</p>
<p style="color:#666">Paiement \u00e0 la livraison (COD)</p>
</body></html>'''

    client_html = f'''<html><body style="font-family:Arial,sans-serif;padding:20px">
<h2 style="color:#3d3530">Confirmation de commande #{oid} / \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628 #{oid}</h2>
<p>Bonjour {c.get("firstName","")} \u0645\u0631\u062d\u0628\u0627\u064b</p>
<p>Merci pour votre commande sur <strong>LARACH BLOOM</strong>. \u0634\u0643\u0631\u0627\u064b \u0644\u0637\u0644\u0628\u0643 \u0645\u0646 LARACH BLOOM</p>
<h3>R\u00e9capitulatif / \u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628</h3>
<table style="width:100%;border-collapse:collapse">{items_html}</table>
<p style="font-size:18px;font-weight:bold;margin-top:16px">Total / \u0627\u0644\u0645\u062c\u0645\u0648\u0639 : {total_str}</p>
<p><strong>Ville / \u0627\u0644\u0645\u062f\u064a\u0646\u0629 :</strong> {c.get("city","")}<br>
<strong>Adresse / \u0627\u0644\u0639\u0646\u0648\u0627\u0646 :</strong> {c.get("address","")}</p>
<p>Nous vous contacterons par t\u00e9l\u00e9phone pour confirmer la livraison.<br>
\u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0647\u0627\u062a\u0641\u064a\u0627\u064b \u0644\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u062a\u0648\u0635\u064a\u0644.</p>
<p>Cordialement,<br>\u0645\u0639 \u062a\u062d\u064a\u0627\u062a\u060c<br>LARACH BLOOM</p>
</body></html>'''

    def send(to, subject, html):
      msg = MIMEMultipart('alternative')
      msg['From'] = f'LARACH BLOOM <{SMTP_EMAIL}>'
      msg['To'] = to
      msg['Subject'] = subject
      msg.attach(MIMEText(html, 'html', 'utf-8'))
      try:
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login(SMTP_EMAIL, SMTP_PASSWORD)
        s.sendmail(SMTP_EMAIL, [to], msg.as_string())
        s.quit()
      except Exception as e:
        print(f'SMTP error to {to}: {e}')

    threading.Thread(target=send, args=(SMTP_EMAIL, f'Nouvelle commande #{oid}', shop_html)).start()
    cust_email = c.get('email', '').strip()
    if cust_email:
      threading.Thread(target=send, args=(cust_email, f'Confirmation commande #{oid} / \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628 #{oid}', client_html)).start()
  except Exception as e:
    print(f'Send email error: {e}')

class Handler(SimpleHTTPRequestHandler):
  def __init__(self, *a, **kw):
    super().__init__(*a, directory=ROOT, **kw)

  def do_GET(self):
    parsed = urlparse(self.path)
    if parsed.path == '/api/orders':
      if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
      orders = load_orders()
      qs = parse_qs(parsed.query)
      limit = int(qs.get('limit', [0])[0])
      if limit > 0: orders = orders[-limit:]
      self.send_json(orders)
    elif parsed.path == '/api/products':
      prods = load_products()
      if prods is None:
        self.send_json({'source': 'default'})
      else:
        self.send_json({'source': 'server', 'products': prods})
    elif re.match(r'^/api/orders/\d+$', parsed.path):
      if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
      oid = parsed.path.split('/')[-1]
      orders = load_orders()
      o = next((x for x in orders if str(x.get('id')) == oid), None)
      if not o: return self.send_err(404, 'Not found')
      self.send_json(o)
    elif re.match(r'^/api/media/.+$', parsed.path):
      key = parsed.path.split('/')[-1]
      self.serve_media(key)
    else:
      super().do_GET()

  def do_POST(self):
    if self.path == '/api/orders':
      length = int(self.headers.get('Content-Length', 0))
      body = self.rfile.read(length) if length else b'{}'
      try: data = json.loads(body)
      except: return self.send_err(400, 'Invalid JSON')
      orders = load_orders()
      oid = next_id(orders)
      order = { 'id': oid, 'date': datetime.now(timezone.utc).isoformat(), 'status': 'En attente', 'customer': data.get('customer', {}), 'items': data.get('items', []), 'total': data.get('total', 0), 'payment': data.get('payment', 'COD') }
      orders.append(order)
      save_orders(orders)
      send_order_email(order)
      self.send_json({ 'success': True, 'id': oid })
    elif self.path == '/api/products':
      if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
      length = int(self.headers.get('Content-Length', 0))
      body = self.rfile.read(length) if length else b'{}'
      try: data = json.loads(body)
      except: return self.send_err(400, 'Invalid JSON')
      save_products(data.get('products', []))
      self.send_json({ 'success': True })
    elif re.match(r'^/api/upload-image/\d+$', self.path):
      if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
      length = int(self.headers.get('Content-Length', 0))
      body = self.rfile.read(length) if length else b'{}'
      try: data = json.loads(body)
      except: return self.send_err(400, 'Invalid JSON')
      img_data = data.get('image', '')
      if not img_data or not img_data.startswith('data:image/'):
        return self.send_err(400, 'Invalid image data')
      try:
        header, encoded = img_data.split(',', 1)
        ext = header.split(';')[0].split('/')[-1]
        if ext not in ('jpeg', 'jpg', 'png', 'gif', 'webp'): ext = 'jpg'
        decoded = base64.b64decode(encoded)
        product_id = self.path.split('/')[-1]
        media_dir = os.path.join(ROOT, 'assets', 'media')
        os.makedirs(media_dir, exist_ok=True)
        filename = f'product-{product_id}.{ext}'
        filepath = os.path.join(media_dir, filename)
        with open(filepath, 'wb') as f: f.write(decoded)
        self.send_json({ 'success': True, 'path': f'assets/media/{filename}' })
      except Exception as e:
        self.send_err(500, str(e))
    elif re.match(r'^/api/upload-file/', self.path):
      if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
      filename = self.path.split('/')[-1]
      if not filename: return self.send_err(400, 'No filename')
      length = int(self.headers.get('Content-Length', 0))
      if length == 0: return self.send_err(400, 'Empty file')
      media_dir = os.path.join(ROOT, 'assets', 'media')
      os.makedirs(media_dir, exist_ok=True)
      filepath = os.path.join(media_dir, filename)
      with open(filepath, 'wb') as f:
          remaining = length
          while remaining > 0:
              chunk = self.rfile.read(min(65536, remaining))
              if not chunk: break
              f.write(chunk)
              remaining -= len(chunk)
      self.send_json({ 'success': True })
    else:
      self.send_err(404, 'Not found')

  def do_PUT(self):
    m = re.match(r'^/api/orders/(\d+)$', self.path)
    if not m: return self.send_err(404, 'Not found')
    if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
    oid = m.group(1)
    length = int(self.headers.get('Content-Length', 0))
    body = self.rfile.read(length) if length else b'{}'
    try: data = json.loads(body)
    except: return self.send_err(400, 'Invalid JSON')
    orders = load_orders()
    for o in orders:
      if str(o.get('id')) == oid:
        if 'status' in data and data['status'] in valid_statuses: o['status'] = data['status']
        if 'customer' in data: o['customer'].update(data['customer'])
        save_orders(orders)
        return self.send_json({ 'success': True })
    self.send_err(404, 'Not found')

  def do_DELETE(self):
    m = re.match(r'^/api/orders/(\d+)$', self.path)
    if not m: return self.send_err(404, 'Not found')
    if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
    oid = m.group(1)
    orders = load_orders()
    new = [x for x in orders if str(x.get('id')) != oid]
    if len(new) == len(orders): return self.send_err(404, 'Not found')
    save_orders(new)
    self.send_json({ 'success': True })

  def end_headers(self):
    self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
    self.send_header('Pragma', 'no-cache')
    self.send_header('Expires', '0')
    super().end_headers()

  def send_json(self, data):
    self.send_response(200)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write(json.dumps(data).encode())

  def serve_media(self, key):
    try:
      conn = get_db()
      cur = conn.cursor()
      cur.execute('SELECT data, mime FROM media WHERE key = %s', (key,))
      row = cur.fetchone()
      cur.close()
      conn.close()
      if not row:
        return self.send_err(404, 'Media not found')
      data, mime = row
      self.send_response(200)
      self.send_header('Content-Type', mime)
      self.send_header('Content-Length', str(len(data)))
      self.send_header('Cache-Control', 'public, max-age=31536000')
      self.end_headers()
      self.wfile.write(data)
    except Exception as e:
      print(f'[LARACH] serve_media error: {e}')
      self.send_err(500, str(e))

  def send_err(self, code, msg):
    self.send_response(code)
    self.send_header('Content-Type', 'application/json')
    self.send_header('Access-Control-Allow-Origin', '*')
    self.end_headers()
    self.wfile.write(json.dumps({ 'error': msg }).encode())

  def log_message(self, fmt, *a):
    pass

if __name__ == '__main__':
  srv = HTTPServer((HOST, PORT), Handler)
  print(f'Serving on http://0.0.0.0:{PORT}')
  try: srv.serve_forever()
  except KeyboardInterrupt: srv.shutdown()
