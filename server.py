#!/usr/bin/env python3
import os, sys, json, base64, hashlib, hmac, time, re
from http.server import HTTPServer, SimpleHTTPRequestHandler
from datetime import datetime, timezone
from urllib.parse import urlparse, parse_qs

HOST = '0.0.0.0'
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get('PORT', '8080'))
ROOT = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT, 'data')
ORDERS_FILE = os.path.join(DATA_DIR, 'orders.json')
PRODUCTS_FILE = os.path.join(DATA_DIR, 'products.json')

ADMIN_USER = 'admin'
ADMIN_PASS = 'larachbloom'

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

valid_statuses = {'En attente', 'Confirm\u00e9e', 'Exp\u00e9di\u00e9e', 'Livr\u00e9e', 'Annul\u00e9e'}

def next_id(orders):
  max_id = 0
  for o in orders:
    try: max_id = max(max_id, int(o.get('id', 0)))
    except: pass
  return max_id + 1

def auth_ok(headers):
  a = headers.get('Authorization', '')
  if not a.startswith('Basic '): return False
  try:
    raw = base64.b64decode(a[6:]).decode('utf-8')
    u, p = raw.split(':', 1)
    return u == ADMIN_USER and p == ADMIN_PASS
  except: return False

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
      self.send_json({ 'success': True, 'id': oid })
    elif self.path == '/api/products':
      if not auth_ok(self.headers): return self.send_err(401, 'Unauthorized')
      length = int(self.headers.get('Content-Length', 0))
      body = self.rfile.read(length) if length else b'{}'
      try: data = json.loads(body)
      except: return self.send_err(400, 'Invalid JSON')
      save_products(data.get('products', []))
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
