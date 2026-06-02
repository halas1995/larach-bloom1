const defaultProducts = [
  { id: 1, name: "Gommage \u00e0 la fleur d'oranger", price: 120, qty: 50, image: "assets/media/product-1.png", desc: "Gommage doux \u00e0 la fleur d'oranger pour une peau \u00e9clatante.", cat: "corps" },
  { id: 2, name: "Huile s\u00e8che \u00e0 la fleur d'oranger", price: 150, qty: 50, image: "assets/media/product-6.png", desc: "Huile s\u00e8che nourrissante au parfum d\u00e9licat de fleur d'oranger.", cat: "huiles" },
  { id: 3, name: "Gel douche \u00e0 la fleur d'oranger", price: 120, qty: 50, image: "assets/media/product-3.png", desc: "Gel douche onctueux \u00e0 la fleur d'oranger pour un bain sensoriel.", cat: "corps" },
  { id: 4, name: "Alba - pack complet", price: 350, qty: 50, image: "assets/media/product-9.png", desc: "Pack complet de soins \u00e0 la fleur d'oranger : gommage, huile et gel douche.", cat: "coffrets" }
];

const EMAIL_CONFIG = { publicKey: 'REMPLACEZ_PAR_VOTRE_CLE_PUBLIQUE_EMAILJS', serviceID: 'REMPLACEZ_PAR_VOTRE_SERVICE_ID', templateID: 'REMPLACEZ_PAR_VOTRE_TEMPLATE_ID', toEmail: 'LARACHBLOOM@GMAIL.COM' };
const ADMIN_CREDENTIALS = { username: 'admin', password: 'larachbloom' };
const API_BASE = '';

let lang = localStorage.getItem('lb_lang') || 'fr';

const TRANS = {
  fr: {
    topBar: "Livraison partout au Maroc \u2014 Paiement \u00e0 la livraison (COD)",
    home: "Accueil", products: "Produits", contact: "Contact",
    heroLabel: "Bienvenue",
    heroSub: "Inspir\u00e9 par la nature, cr\u00e9\u00e9 pour votre peau",
    heroBtn: "D\u00e9couvrir nos produits",
    essenceLabel: "Notre Essence",
    essenceText: "Chez Larach Bloom, chaque soin est inspir\u00e9 de la nature marocaine et con\u00e7u pour r\u00e9v\u00e9ler l'\u00e9clat naturel de votre peau. Des ingr\u00e9dients purs, un savoir-faire authentique, pour une beaut\u00e9 qui vous ressemble.",
    cartTitle: "Panier", cartEmpty: "Votre panier est vide", cartTotal: "Total", cartQty: "Qt\u00e9", cartCheckout: "Commander (COD)",
    footerTag: "Inspir\u00e9 par la nature, cr\u00e9\u00e9 pour votre peau",
    footerNav: "Navigation", footerContact: "Contact", footerFollow: "Suivez-nous",
    footerRights: "\u00a9 2026 LARACH BLOOM. Tous droits r\u00e9serv\u00e9s.",
    contactTitle: "Contactez-nous", contactPhone: "T\u00e9l\u00e9phone", contactEmail: "Email", contactSocial: "R\u00e9seaux sociaux",
    checkoutTitle: "Finaliser la commande", checkoutForm: "Vos informations", checkoutSummary: "R\u00e9capitulatif",
    checkoutFirstName: "Pr\u00e9nom", checkoutLastName: "Nom", checkoutPhone: "T\u00e9l\u00e9phone",
    checkoutEmail: "Email (optionnel)", checkoutAddress: "Adresse compl\u00e8te", checkoutNotes: "Notes (optionnel)",
    checkoutBtn: "Confirmer la commande", checkoutSuccess: "Commande confirm\u00e9e !",
    checkoutRef: "R\u00e9f\u00e9rence", checkoutThanks: "Merci pour votre commande. Nous vous contacterons bient\u00f4t.",
    checkoutClose: "Fermer", productTitle: "Nos Produits",
    productSub: "Soins naturels inspir\u00e9s de la tradition marocaine",
    contactBtn: "Contact", contactInfo: "Contact Info",
    checkoutFormTitle: "Informations de livraison", checkoutSubtotal: "Sous-total",
    checkoutShipping: "Livraison", checkoutFree: "À communiquer",
    checkoutCodLabel: "Paiement \u00e0 la livraison (COD)",
    checkoutCodDesc: "Payez en esp\u00e8ces \u00e0 la r\u00e9ception de votre commande",
    checkoutPaymentMethod: "Mode de paiement", checkoutCodBadge: "Paiement en esp\u00e8ces \u00e0 la livraison",
    checkoutBackHome: "Retour \u00e0 l'accueil",
    sending: "Envoi en cours...",
    addToCart: "Ajouter au panier", removeItem: "Retirer",
    waOrder: "Bonjour, je suis int\u00e9ress\u00e9 par",
    pageTitle: "Accueil", pageTitleProducts: "Produits", pageTitleCheckout: "Commande", pageTitleContact: "Contact", pageTitleAdmin: "Administration",
    p1_name: "Gommage \u00e0 la fleur d'oranger", p1_desc: "Gommage doux \u00e0 la fleur d'oranger pour une peau \u00e9clatante.",
    p2_name: "Huile s\u00e8che \u00e0 la fleur d'oranger", p2_desc: "Huile s\u00e8che nourrissante au parfum d\u00e9licat de fleur d'oranger.",
    p3_name: "Gel douche \u00e0 la fleur d'oranger", p3_desc: "Gel douche onctueux \u00e0 la fleur d'oranger pour un bain sensoriel.",
    p4_name: "Alba - pack complet", p4_desc: "Pack complet de soins \u00e0 la fleur d'oranger : gommage, huile et gel douche.",
    checkoutFirstNamePH: "Votre pr\u00e9nom", checkoutLastNamePH: "Votre nom",
    checkoutPhonePH: "06 XX XX XX XX", checkoutEmailPH: "votre@email.com",
    checkoutAddressPH: "Ville, quartier, rue, num\u00e9ro...", checkoutNotesPH: "Instructions de livraison...",
    adminLogin: "Administration", adminLoginSub: "LARACH BLOOM", adminUser: "Identifiant", adminPass: "Mot de passe",
    adminLoginBtn: "Se connecter", adminDashboard: "Tableau de bord", adminOrders: "Commandes", adminProducts: "Produits",
    adminAddProduct: "Ajouter / Modifier", adminLogout: "D\u00e9connexion", adminBack: "Retour au site",
    adminTotalOrders: "Total commandes", adminPending: "En attente", adminTotalProducts: "Produits",
    adminRecentOrders: "Derni\u00e8res commandes", adminNoOrders: "Aucune commande pour le moment",
    adminOrderRef: "Commande", adminClient: "Client", adminTotal: "Total", adminDate: "Date", adminStatus: "Statut",
    adminPhone: "T\u00e9l\u00e9phone", adminAddress: "Adresse", adminItems: "Articles", adminAction: "Action",
    adminImage: "Image", adminName: "Nom", adminPrice: "Prix", adminQty: "Qté", adminActions: "Actions",
    adminReset: "R\u00e9initialiser les donn\u00e9es", adminEdit: "Modifier", adminDelete: "Supprimer",
    adminCancelEdit: "Annuler", adminSave: "Enregistrer les modifications", adminAddBtn: "Ajouter le produit",
    adminProdName: "Nom du produit", adminProdPrice: "Prix (DH)", adminProdQty: "Quantité", adminProdImage: "Image du produit",
    adminProdDesc: "Description (optionnelle)", adminProdCat: "Cat\u00e9gorie",
    adminCatHuiles: "Huiles", adminCatSoins: "Soins visage", adminCatCorps: "Soins corps", adminCatCoffrets: "Coffrets",
    adminSaved: "Produit enregistr\u00e9 avec succ\u00e8s !",
    adminFillFields: "Veuillez remplir le nom et le prix.", adminSelectImage: "Veuillez s\u00e9lectionner une image.",
    adminImageTooBig: "Image trop volumineuse (max 10MB).", adminNotFound: "Produit introuvable.",
    adminConfirmDelete: "Supprimer ce produit ?", adminConfirmReset: "Supprimer toutes les donn\u00e9es ?",
    adminDataCleared: "Donn\u00e9es effac\u00e9es. Rafra\u00eechissez la page.",
    adminLoginError: "Identifiant ou mot de passe incorrect.",
    statusEnAttente: "En attente", statusConfirmee: "Confirm\u00e9e", statusExpediee: "Exp\u00e9di\u00e9e", statusLivree: "Livr\u00e9e", statusAnnulee: "Annul\u00e9e"
  },
  en: {
    topBar: "Free delivery across Morocco \u2014 Cash on delivery (COD)",
    home: "Home", products: "Products", contact: "Contact",
    heroLabel: "Welcome",
    heroSub: "Inspired by nature, created for your skin",
    heroBtn: "Discover our products",
    essenceLabel: "Our Essence",
    essenceText: "At Larach Bloom, every treatment is inspired by Moroccan nature and designed to reveal your skin\u2019s natural glow. Pure ingredients, authentic craftsmanship, for a beauty that reflects you.",
    cartTitle: "Cart", cartEmpty: "Your cart is empty", cartTotal: "Total", cartQty: "Qty", cartCheckout: "Order (COD)",
    footerTag: "Inspired by nature, created for your skin",
    footerNav: "Navigation", footerContact: "Contact", footerFollow: "Follow us",
    footerRights: "\u00a9 2026 LARACH BLOOM. All rights reserved.",
    contactTitle: "Contact Us", contactPhone: "Phone", contactEmail: "Email", contactSocial: "Social Media",
    checkoutTitle: "Complete your order", checkoutForm: "Your information", checkoutSummary: "Summary",
    checkoutFirstName: "First Name", checkoutLastName: "Last Name", checkoutPhone: "Phone",
    checkoutEmail: "Email (optional)", checkoutAddress: "Full Address", checkoutNotes: "Notes (optional)",
    checkoutBtn: "Confirm order", checkoutSuccess: "Order confirmed!",
    checkoutRef: "Reference", checkoutThanks: "Thank you for your order. We will contact you soon.",
    checkoutClose: "Close", productTitle: "Our Products",
    productSub: "Natural care inspired by Moroccan tradition",
    contactBtn: "Contact", contactInfo: "Contact Info",
    checkoutFormTitle: "Delivery Information", checkoutSubtotal: "Subtotal",
    checkoutShipping: "Shipping", checkoutFree: "To be communicated",
    checkoutCodLabel: "Cash on delivery (COD)",
    checkoutCodDesc: "Pay in cash upon receipt of your order",
    checkoutPaymentMethod: "Payment method", checkoutCodBadge: "Cash payment on delivery",
    checkoutBackHome: "Back to home",
    sending: "Sending...",
    addToCart: "Add to cart", removeItem: "Remove",
    waOrder: "Hello, I am interested in",
    pageTitle: "Home", pageTitleProducts: "Products", pageTitleCheckout: "Checkout", pageTitleContact: "Contact", pageTitleAdmin: "Administration",
    p1_name: "Orange Blossom Scrub", p1_desc: "Gentle orange blossom scrub for radiant skin.",
    p2_name: "Orange Blossom Dry Oil", p2_desc: "Nourishing dry oil with a delicate orange blossom fragrance.",
    p3_name: "Orange Blossom Shower Gel", p3_desc: "Creamy orange blossom shower gel for a sensory bath.",
    p4_name: "Alba - Full Set", p4_desc: "Complete orange blossom care set: scrub, oil, and shower gel.",
    checkoutFirstNamePH: "Your first name", checkoutLastNamePH: "Your last name",
    checkoutPhonePH: "06 XX XX XX XX", checkoutEmailPH: "your@email.com",
    checkoutAddressPH: "City, district, street, number...", checkoutNotesPH: "Delivery instructions...",
    adminLogin: "Administration", adminLoginSub: "LARACH BLOOM", adminUser: "Username", adminPass: "Password",
    adminLoginBtn: "Sign in", adminDashboard: "Dashboard", adminOrders: "Orders", adminProducts: "Products",
    adminAddProduct: "Add / Edit", adminLogout: "Logout", adminBack: "Back to site",
    adminTotalOrders: "Total orders", adminPending: "Pending", adminTotalProducts: "Products",
    adminRecentOrders: "Recent orders", adminNoOrders: "No orders yet",
    adminOrderRef: "Order", adminClient: "Client", adminTotal: "Total", adminDate: "Date", adminStatus: "Status",
    adminPhone: "Phone", adminAddress: "Address", adminItems: "Items", adminAction: "Action",
    adminImage: "Image", adminName: "Name", adminPrice: "Price", adminQty: "Qty", adminActions: "Actions",
    adminReset: "Reset data", adminEdit: "Edit", adminDelete: "Delete",
    adminCancelEdit: "Cancel", adminSave: "Save changes", adminAddBtn: "Add product",
    adminProdName: "Product name", adminProdPrice: "Price (MAD)", adminProdQty: "Quantity", adminProdImage: "Product image",
    adminProdDesc: "Description (optional)", adminProdCat: "Category",
    adminCatHuiles: "Oils", adminCatSoins: "Face care", adminCatCorps: "Body care", adminCatCoffrets: "Gift sets",
    adminSaved: "Product saved successfully!",
    adminFillFields: "Please fill in the name and price.", adminSelectImage: "Please select an image.",
    adminImageTooBig: "Image too large (max 10MB).", adminNotFound: "Product not found.",
    adminConfirmDelete: "Delete this product?", adminConfirmReset: "Delete all data?",
    adminDataCleared: "Data cleared. Refresh the page.",
    adminLoginError: "Incorrect username or password.",
    statusEnAttente: "Pending", statusConfirmee: "Confirmed", statusExpediee: "Shipped", statusLivree: "Delivered", statusAnnulee: "Cancelled"
  },
  ar: {
    topBar: "\u062a\u0648\u0635\u064a\u0644 \u0645\u062c\u0627\u0646\u064a \u0641\u064a \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0627\u0644\u0645\u063a\u0631\u0628 \u2014 \u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645",
    home: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", products: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a", contact: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
    heroLabel: "\u0645\u0631\u062d\u0628\u0627\u064b",
    heroSub: "\u0645\u0633\u062a\u0648\u062d\u0649 \u0645\u0646 \u0627\u0644\u0637\u0628\u064a\u0639\u0629\u060c \u0635\u064f\u0646\u0639 \u0644\u0628\u0634\u0631\u062a\u0643",
    heroBtn: "\u0627\u0643\u062a\u0634\u0641 \u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627",
    essenceLabel: "\u062c\u0648\u0647\u0631\u0646\u0627",
    essenceText: "\u0641\u064a \u0644\u0627\u0631\u0627\u0634 \u0628\u0644\u0648\u0645\u060c \u0643\u0644 \u0639\u0646\u0627\u064a\u0629 \u0645\u0633\u062a\u0648\u062d\u0627\u0629 \u0645\u0646 \u0627\u0644\u0637\u0628\u064a\u0639\u0629 \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629 \u0648\u0645\u0635\u0645\u0645\u0629 \u0644\u0625\u0638\u0647\u0627\u0631 \u0625\u0634\u0631\u0627\u0642 \u0628\u0634\u0631\u062a\u0643 \u0627\u0644\u0637\u0628\u064a\u0639\u064a. \u0645\u0643\u0648\u0646\u0627\u062a \u0646\u0642\u064a\u0629\u060c \u062d\u0631\u0641\u064a\u0629 \u0623\u0635\u064a\u0644\u0629\u060c \u0644\u062c\u0645\u0627\u0644 \u064a\u0639\u0643\u0633 \u0634\u062e\u0635\u064a\u062a\u0643.",
    cartTitle: "\u0627\u0644\u0633\u0644\u0629", cartEmpty: "\u0633\u0644\u062a\u0643 \u0641\u0627\u0631\u063a\u0629", cartTotal: "\u0627\u0644\u0645\u062c\u0645\u0648\u0639", cartQty: "\u0627\u0644\u0643\u0645\u064a\u0629", cartCheckout: "\u0637\u0644\u0628 (\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645)",
    footerTag: "\u0645\u0633\u062a\u0648\u062d\u0649 \u0645\u0646 \u0627\u0644\u0637\u0628\u064a\u0639\u0629\u060c \u0635\u064f\u0646\u0639 \u0644\u0628\u0634\u0631\u062a\u0643",
    footerNav: "\u0627\u0644\u062a\u0646\u0642\u0644", footerContact: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627", footerFollow: "\u062a\u0627\u0628\u0639\u0646\u0627",
    footerRights: "\u00a9 2026 \u0644\u0627\u0631\u0627\u0634 \u0628\u0644\u0648\u0645. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.",
    contactTitle: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627", contactPhone: "\u0627\u0644\u0647\u0627\u062a\u0641", contactEmail: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a", contactSocial: "\u0648\u0633\u0627\u0626\u0644 \u0627\u0644\u062a\u0648\u0627\u0635\u0644",
    checkoutTitle: "\u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u0637\u0644\u0628", checkoutForm: "\u0645\u0639\u0644\u0648\u0645\u0627\u062a\u0643", checkoutSummary: "\u0645\u0644\u062e\u0635 \u0627\u0644\u0637\u0644\u0628",
    checkoutFirstName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0623\u0648\u0644", checkoutLastName: "\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629", checkoutPhone: "\u0627\u0644\u0647\u0627\u062a\u0641",
    checkoutEmail: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)", checkoutAddress: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0643\u0627\u0645\u0644", checkoutNotes: "\u0645\u0644\u0627\u062d\u0638\u0627\u062a (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)",
    checkoutBtn: "\u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628", checkoutSuccess: "\u062a\u0645 \u062a\u0623\u0643\u064a\u062f \u0627\u0644\u0637\u0644\u0628!",
    checkoutRef: "\u0627\u0644\u0645\u0631\u062c\u0639", checkoutThanks: "\u0634\u0643\u0631\u0627\u064b \u0644\u0637\u0644\u0628\u0643. \u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064a\u0628\u0627\u064b.",
    checkoutClose: "\u0625\u063a\u0644\u0627\u0642", productTitle: "\u0645\u0646\u062a\u062c\u0627\u062a\u0646\u0627",
    productSub: "\u0639\u0646\u0627\u064a\u0629 \u0637\u0628\u064a\u0639\u064a\u0629 \u0645\u0633\u062a\u0648\u062d\u0627\u0629 \u0645\u0646 \u0627\u0644\u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u0645\u063a\u0631\u0628\u064a\u0629",
    contactBtn: "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627", contactInfo: "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0627\u062a\u0635\u0627\u0644",
    checkoutFormTitle: "\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644", checkoutSubtotal: "\u0627\u0644\u0645\u062c\u0645\u0648\u0639 \u0627\u0644\u0641\u0631\u0639\u064a",
    checkoutShipping: "\u0627\u0644\u062a\u0648\u0635\u064a\u0644", checkoutFree: "\u0633\u064a\u062a\u0645 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0639\u0646\u0647 \u0644\u0627\u062d\u0642\u064b\u0627",
    checkoutCodLabel: "\u0627\u0644\u062f\u0641\u0639 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645",
    checkoutCodDesc: "\u0627\u062f\u0641\u0639 \u0646\u0642\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0633\u062a\u0644\u0627\u0645 \u0637\u0644\u0628\u0643",
    checkoutPaymentMethod: "\u0637\u0631\u064a\u0642\u0629 \u0627\u0644\u062f\u0641\u0639", checkoutCodBadge: "\u0627\u0644\u062f\u0641\u0639 \u0646\u0642\u062f\u064b\u0627 \u0639\u0646\u062f \u0627\u0644\u0627\u0633\u062a\u0644\u0627\u0645",
    checkoutBackHome: "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629",
    sending: "\u062c\u0627\u0631\u064d \u0627\u0644\u0625\u0631\u0633\u0627\u0644...",
    addToCart: "\u0623\u0636\u0641 \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629", removeItem: "\u0625\u0632\u0627\u0644\u0629",
    waOrder: "\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0646\u0627 \u0645\u0647\u062a\u0645 \u0628\u0640",
    pageTitle: "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629", pageTitleProducts: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a", pageTitleCheckout: "\u0627\u0644\u0637\u0644\u0628", pageTitleContact: "\u0627\u062a\u0635\u0627\u0644", pageTitleAdmin: "\u0625\u062f\u0627\u0631\u0629",
    p1_name: "\u0645\u0642\u0634\u0631 \u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644", p1_desc: "\u0645\u0642\u0634\u0631 \u0644\u0637\u064a\u0641 \u0628\u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644 \u0644\u0628\u0634\u0631\u0629 \u0645\u0634\u0631\u0642\u0629.",
    p2_name: "\u0632\u064a\u062a \u062c\u0627\u0641 \u0628\u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644", p2_desc: "\u0632\u064a\u062a \u062c\u0627\u0641 \u0645\u063a\u0630\u064d \u0628\u0631\u0627\u0626\u062d\u0629 \u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644 \u0627\u0644\u0631\u0642\u064a\u0642\u0629.",
    p3_name: "\u062c\u0644 \u0627\u0633\u062a\u062d\u0645\u0627\u0645 \u0628\u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644", p3_desc: "\u062c\u0644 \u0627\u0633\u062a\u062d\u0645\u0627\u0645 \u0643\u0631\u064a\u0645\u064a \u0628\u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644 \u0644\u062d\u0645\u0627\u0645 \u062d\u0633\u064a.",
    p4_name: "\u0623\u0644\u0628\u0627 - \u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0643\u0627\u0645\u0644\u0629", p4_desc: "\u0645\u062c\u0645\u0648\u0639\u0629 \u0639\u0646\u0627\u064a\u0629 \u0643\u0627\u0645\u0644\u0629 \u0628\u0632\u0647\u0631\u0629 \u0627\u0644\u0628\u0631\u062a\u0642\u0627\u0644: \u0645\u0642\u0634\u0631\u060c \u0632\u064a\u062a\u060c \u0648\u062c\u0644 \u0627\u0633\u062a\u062d\u0645\u0627\u0645.",
    checkoutFirstNamePH: "\u0627\u0633\u0645\u0643 \u0627\u0644\u0623\u0648\u0644", checkoutLastNamePH: "\u0627\u0633\u0645 \u0627\u0644\u0639\u0627\u0626\u0644\u0629",
    checkoutPhonePH: "\u06F0\u06F6 XX XX XX XX", checkoutEmailPH: "\u0628\u0631\u064a\u062f\u0643@\u0645\u0648\u0642\u0639.\u0643\u0648\u0645",
    checkoutAddressPH: "\u0627\u0644\u0645\u062f\u064a\u0646\u0629\u060c \u0627\u0644\u062d\u064a\u060c \u0627\u0644\u0634\u0627\u0631\u0639\u060c \u0627\u0644\u0631\u0642\u0645...", checkoutNotesPH: "\u062a\u0639\u0644\u064a\u0645\u0627\u062a \u0627\u0644\u062a\u0648\u0635\u064a\u0644...",
    adminLogin: "\u0627\u0644\u0625\u062f\u0627\u0631\u0629", adminLoginSub: "\u0644\u0627\u0631\u0627\u0634 \u0628\u0644\u0648\u0645", adminUser: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645", adminPass: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
    adminLoginBtn: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062f\u062e\u0648\u0644", adminDashboard: "\u0644\u0648\u062d\u0629 \u0627\u0644\u062a\u062d\u0643\u0645", adminOrders: "\u0627\u0644\u0637\u0644\u0628\u0627\u062a", adminProducts: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",
    adminAddProduct: "\u0625\u0636\u0627\u0641\u0629 / \u062a\u0639\u062f\u064a\u0644", adminLogout: "\u062a\u0633\u062c\u064a\u0644 \u0627\u0644\u062e\u0631\u0648\u062c", adminBack: "\u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0645\u0648\u0642\u0639",
    adminTotalOrders: "\u0625\u062c\u0645\u0627\u0644\u064a \u0627\u0644\u0637\u0644\u0628\u0627\u062a", adminPending: "\u0642\u064a\u062f \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631", adminTotalProducts: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",
    adminRecentOrders: "\u0622\u062e\u0631 \u0627\u0644\u0637\u0644\u0628\u0627\u062a", adminNoOrders: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0637\u0644\u0628\u0627\u062a \u0628\u0639\u062f",
    adminOrderRef: "\u0627\u0644\u0637\u0644\u0628", adminClient: "\u0627\u0644\u0639\u0645\u064a\u0644", adminTotal: "\u0627\u0644\u0645\u062c\u0645\u0648\u0639", adminDate: "\u0627\u0644\u062a\u0627\u0631\u064a\u062e", adminStatus: "\u0627\u0644\u062d\u0627\u0644\u0629",
    adminPhone: "\u0627\u0644\u0647\u0627\u062a\u0641", adminAddress: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646", adminItems: "\u0627\u0644\u0645\u0648\u0627\u062f", adminAction: "\u0625\u062c\u0631\u0627\u0621",
    adminImage: "\u0627\u0644\u0635\u0648\u0631\u0629", adminName: "\u0627\u0644\u0627\u0633\u0645", adminPrice: "\u0627\u0644\u0633\u0639\u0631", adminQty: "\u0627\u0644\u0643\u0645\u064a\u0629", adminActions: "\u0625\u062c\u0631\u0627\u0621\u0627\u062a",
    adminReset: "\u0625\u0639\u0627\u062f\u0629 \u062a\u0639\u064a\u064a\u0646 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a", adminEdit: "\u062a\u0639\u062f\u064a\u0644", adminDelete: "\u062d\u0630\u0641",
    adminCancelEdit: "\u0625\u0644\u063a\u0627\u0621", adminSave: "\u062d\u0641\u0638 \u0627\u0644\u062a\u063a\u064a\u064a\u0631\u0627\u062a", adminAddBtn: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0646\u062a\u062c",
    adminProdName: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062a\u062c", adminProdPrice: "\u0627\u0644\u0633\u0639\u0631 (\u062f\u0631\u0647\u0645)", adminProdQty: "\u0627\u0644\u0643\u0645\u064a\u0629", adminProdImage: "\u0635\u0648\u0631\u0629 \u0627\u0644\u0645\u0646\u062a\u062c",
    adminProdDesc: "\u0627\u0644\u0648\u0635\u0641 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)", adminProdCat: "\u0627\u0644\u0641\u0626\u0629",
    adminCatHuiles: "\u0632\u064a\u0648\u062a", adminCatSoins: "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0627\u0644\u0648\u062c\u0647", adminCatCorps: "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0627\u0644\u062c\u0633\u0645", adminCatCoffrets: "\u0647\u062f\u0627\u064a\u0627",
    adminSaved: "\u062a\u0645 \u062d\u0641\u0638 \u0627\u0644\u0645\u0646\u062a\u062c \u0628\u0646\u062c\u0627\u062d!",
    adminFillFields: "\u064a\u0631\u062c\u0649 \u0645\u0644\u0621 \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0633\u0639\u0631.",
    adminSelectImage: "\u064a\u0631\u062c\u0649 \u0627\u062e\u062a\u064a\u0627\u0631 \u0635\u0648\u0631\u0629.",
    adminImageTooBig: "\u0627\u0644\u0635\u0648\u0631\u0629 \u0643\u0628\u064a\u0631\u0629 \u062c\u062f\u0627\u064b (\u0627\u0644\u062d\u062f \u0627\u0644\u0623\u0642\u0635\u0649 10 \u0645\u064a\u062c\u0627\u0628\u0627\u064a\u062a).",
    adminNotFound: "\u0627\u0644\u0645\u0646\u062a\u062c \u063a\u064a\u0631 \u0645\u0648\u062c\u0648\u062f.",
    adminConfirmDelete: "\u062d\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062a\u062c\u061f",
    adminConfirmReset: "\u062d\u0630\u0641 \u062c\u0645\u064a\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a\u061f",
    adminDataCleared: "\u062a\u0645 \u0645\u0633\u062d \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a. \u0642\u0645 \u0628\u062a\u062d\u062f\u064a\u062b \u0627\u0644\u0635\u0641\u062d\u0629.",
    adminLoginError: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063a\u064a\u0631 \u0635\u062d\u064a\u062d\u0629.",
    statusEnAttente: "\u0642\u064a\u062f \u0627\u0644\u0627\u0646\u062a\u0638\u0627\u0631", statusConfirmee: "\u0645\u0624\u0643\u062f", statusExpediee: "\u062a\u0645 \u0627\u0644\u0634\u062d\u0646", statusLivree: "\u062a\u0645 \u0627\u0644\u062a\u0633\u0644\u064a\u0645", statusAnnulee: "\u0645\u0644\u063a\u064a"
  }
};

function t(key) {
  var tr = TRANS[lang] || TRANS.fr;
  return tr[key] || key;
}

function pn(id) {
  var k = 'p' + id + '_name';
  var v = t(k);
  return v !== k ? v : null;
}

function pd(id) {
  var k = 'p' + id + '_desc';
  var v = t(k);
  return v !== k ? v : null;
}

function setLang(l) {
  lang = l;
  try { localStorage.setItem('lb_lang', l); } catch (e) {}
  document.querySelector('.top-bar').innerHTML = t('topBar') +
    '<span class="lang-switch"><button class="lang-btn' + (l === 'fr' ? ' active' : '') + '" onclick="setLang(\'fr\')">FR</button>' +
    '<button class="lang-btn' + (l === 'en' ? ' active' : '') + '" onclick="setLang(\'en\')">EN</button>' +
    '<button class="lang-btn' + (l === 'ar' ? ' active' : '') + '" onclick="setLang(\'ar\')">AR</button></span>';
  document.documentElement.lang = l === 'ar' ? 'ar' : (l === 'en' ? 'en' : 'fr');
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    var val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else if (el.tagName === 'IMG') {
      el.alt = val;
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  var page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  var titleKey = page === 'index' ? 'pageTitle' : 'pageTitle' + page.charAt(0).toUpperCase() + page.slice(1);
  var titleVal = t(titleKey);
  if (titleVal !== titleKey) document.title = 'LARACH BLOOM \u2014 ' + titleVal;
  renderProducts();
  updateCart();
  renderSummary();
}

function applyLang() { setLang(lang); }

function fmt(n) {
  return n.toLocaleString('fr-FR') + ' DH';
}

function esc(s) {
  if (typeof s !== 'string') return s;
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

let products = [];
let cart = [];
let orders = [];

function loadProducts() {
  try {
    var d = localStorage.getItem('lb_products');
    if (d) { products = JSON.parse(d); }
    else { products = JSON.parse(JSON.stringify(defaultProducts)); localStorage.setItem('lb_products', JSON.stringify(products)); }
  } catch(e) { products = JSON.parse(JSON.stringify(defaultProducts)); }
  products.forEach(function(p) { if (p.qty === undefined) p.qty = 0; });
  fetchProductsFromServer();
}

function fetchProductsFromServer() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', API_BASE + '/api/products', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        var resp = JSON.parse(xhr.responseText);
        if (resp.source === 'server' && Array.isArray(resp.products) && resp.products.length > 0) {
          var serverProducts = resp.products.map(function(p) {
            if (p._imageData && p._imageData.length > 50 && p._imageData.indexOf('data:image/') === 0) {
              try { localStorage.setItem('lb_img_' + p.id, p._imageData); } catch(e) {}
            }
            delete p._imageData;
            if (p.qty === undefined) p.qty = 0;
            return p;
          });
          defaultProducts.forEach(function(dp) {
            var found = false;
            for (var i = 0; i < serverProducts.length; i++) {
              if (serverProducts[i].id === dp.id) { found = true; break; }
            }
            if (!found) {
              var copy = JSON.parse(JSON.stringify(dp));
              serverProducts.push(copy);
            }
          });
          products = serverProducts;
          localStorage.setItem('lb_products', JSON.stringify(products));
          renderProducts();
          renderProductsTable();
        }
      } catch(e) {}
    }
  };
  xhr.send();
}

function saveProducts() {
  try { localStorage.setItem('lb_products', JSON.stringify(products)); } catch(e) {}
  var productsWithImages = products.map(function(p) {
    var img = null;
    try { img = localStorage.getItem('lb_img_' + p.id); } catch(e) {}
    var copy = Object.assign({}, p);
    if (img && img.length > 50 && img.indexOf('data:image/') === 0) {
      copy._imageData = img;
    }
    return copy;
  });
  var xhr = new XMLHttpRequest();
  xhr.open('POST', API_BASE + '/api/products', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(ADMIN_CREDENTIALS.username + ':' + ADMIN_CREDENTIALS.password));
  xhr.send(JSON.stringify({ products: productsWithImages }));
}
function loadCart() {
  try { var d = localStorage.getItem('lb_cart'); if (d) cart = JSON.parse(d); } catch(e) {}
}

function saveCart() {
  try { localStorage.setItem('lb_cart', JSON.stringify(cart)); } catch(e) {
    console.warn('localStorage full — cart not saved');
  }
}

function getProductImage(p) {
  try {
    var stored = localStorage.getItem('lb_img_' + p.id);
    if (stored) return stored;
  } catch(e) {}
  return p.image && p.image.startsWith('assets/') ? p.image : '';
}

function cartItemImg(id) {
  try {
    var stored = localStorage.getItem('lb_img_' + id);
    if (stored) return stored;
  } catch(e) {}
  var p = products.find(function(x) { return x.id === id; });
  return p && p.image && p.image.startsWith('assets/') ? p.image : '';
}

function compressFile(file, maxW, quality, cb) {
  var url = URL.createObjectURL(file);
  var img = new Image();
  img.onload = function() {
    var w = img.width, h = img.height;
    if (w > maxW) { h = h * maxW / w; w = maxW; }
    var c = document.createElement('canvas');
    c.width = w; c.height = h;
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    var data = c.toDataURL('image/jpeg', quality);
    URL.revokeObjectURL(url);
    cb(data);
  };
  img.onerror = function() { cb(null); URL.revokeObjectURL(url); };
  img.src = url;
}

function saveProductImage(id, dataUrl) {
  try { localStorage.setItem('lb_img_' + id, dataUrl); } catch(e) {}
}

function renderProducts() {
  var g = document.getElementById('produitsGrid');
  if (!g) return;
  g.innerHTML = '';
  products.forEach(function(p) {
    var pname = pn(p.id) || p.name;
    var pdesc = pd(p.id) || p.desc || '';

    var card = document.createElement('div');
    card.className = 'produit-card';

    var imgWrap = document.createElement('div');
    imgWrap.className = 'produit-img';
    var img = document.createElement('img');
    img.src = getProductImage(p);
    img.alt = pname;
    img.loading = 'lazy';
    img.onerror = function() {
      imgWrap.classList.add('img-fail');
      imgWrap.dataset.label = pname;
      img.remove();
    };
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);

    var h3 = document.createElement('h3');
    h3.textContent = pname;
    card.appendChild(h3);

    var priceDiv = document.createElement('div');
    priceDiv.className = 'price';
    priceDiv.textContent = fmt(p.price);
    card.appendChild(priceDiv);

    var actions = document.createElement('div');
    actions.className = 'produit-actions';

    var addBtn = document.createElement('button');
    addBtn.className = 'btn-add';
    addBtn.textContent = t('addToCart');
    addBtn.onclick = function() { add(p.id); };
    actions.appendChild(addBtn);

    var waMsg = encodeURIComponent(t('waOrder') + ' "' + pname + '"');
    var waBtn = document.createElement('button');
    waBtn.className = 'btn-wa';
    waBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    waBtn.onclick = function() { window.open('https://wa.me/212755296253?text=' + waMsg, '_blank'); };
    actions.appendChild(waBtn);

    card.appendChild(actions);
    g.appendChild(card);
  });
}

function add(id) {
  var p = products.find(function(x) { return x.id === id; });
  if (!p) return;
  var ex = cart.find(function(x) { return x.id === id; });
  if (ex) ex.qty++;
  else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  saveCart(); updateCart(); openCart();
}

function remove(id) {
  cart = cart.filter(function(x) { return x.id !== id; });
  saveCart(); updateCart();
}

function qty(id, d) {
  var x = cart.find(function(i) { return i.id === id; });
  if (!x) return;
  x.qty += d;
  if (x.qty <= 0) { remove(id); return; }
  saveCart(); updateCart();
}

function total() { return cart.reduce(function(s, x) { return s + x.price * x.qty; }, 0); }
function count() { return cart.reduce(function(s, x) { return s + x.qty; }, 0); }

function updateCart() {
  var cc = document.getElementById('cartCount');
  if (cc) cc.textContent = count();

  var body = document.getElementById('cartBody');
  var ct = document.getElementById('cartTotal');
  var cb = document.getElementById('checkoutBtn');

  if (body) {
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty">' + esc(t('cartEmpty')) + '</div>';
    } else {
      body.innerHTML = cart.map(function(x) {
        var cname = pn(x.id) || x.name;
        return '<div class="cart-item">' +
        '<img src="' + cartItemImg(x.id) + '" alt="' + esc(cname) + '" class="cart-item-img" onerror="this.style.display=\'none\'">' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + esc(cname) + '</div>' +
          '<div class="cart-item-price">' + fmt(x.price) + '</div>' +
          '<div class="cart-item-qty">' +
            '<button class="qty-btn" onclick="qty(' + x.id + ',-1)">\u2212</button>' +
            '<span class="qty-value">' + x.qty + '</span>' +
            '<button class="qty-btn" onclick="qty(' + x.id + ',1)">+</button>' +
          '</div>' +
          '<button class="cart-item-remove" onclick="remove(' + x.id + ')">' + esc(t('removeItem')) + '</button>' +
        '</div>' +
      '</div>'; }).join('');
    }
  }
  if (ct) ct.textContent = fmt(total());
  if (cb) cb.disabled = !cart.length;
}

function openCart() {
  var c = document.getElementById('cart');
  var o = document.getElementById('overlay');
  if (c) c.classList.add('active');
  if (o) o.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  var c = document.getElementById('cart');
  var o = document.getElementById('overlay');
  if (c) c.classList.remove('active');
  if (o) o.classList.remove('active');
  document.body.style.overflow = '';
}

function renderSummary() {
  var container = document.getElementById('summaryItems');
  var subEl = document.getElementById('summarySubtotal');
  var totalEl = document.getElementById('summaryTotal');
  if (!container) return;
  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty">' + esc(t('cartEmpty')) + '</div>';
    if (subEl) subEl.textContent = fmt(0);
    if (totalEl) totalEl.textContent = fmt(0);
    return;
  }
  container.innerHTML = cart.map(function(x) {
    var cname = pn(x.id) || x.name;
    return '<div class="summary-item">' +
    '<img src="' + cartItemImg(x.id) + '" alt="' + esc(cname) + '" class="summary-item-img" onerror="this.style.display=\'none\'">' +
    '<div class="summary-item-info">' +
      '<div class="summary-item-name">' + esc(cname) + '</div>' +
      '<div class="summary-item-meta">' + t('cartQty') + ': ' + x.qty + '</div>' +
    '</div>' +
    '<div class="summary-item-price">' + fmt(x.price * x.qty) + '</div>' +
  '</div>'; }).join('');
  var totalPrice = total();
  if (subEl) subEl.textContent = fmt(totalPrice);
  if (totalEl) totalEl.textContent = fmt(totalPrice);
}

function showTab(name) {
  document.querySelectorAll('.admin-tab').forEach(function(t) { t.style.display = 'none'; });
  var tab = document.getElementById('tab-' + name);
  if (tab) tab.style.display = 'block';
  document.querySelectorAll('.admin-side nav a').forEach(function(a) { a.classList.remove('active'); });
  var activeLink = document.querySelector('.admin-side nav a[data-tab="' + name + '"]');
  if (activeLink) activeLink.classList.add('active');
  if (name === 'dashboard') renderDashboard();
  if (name === 'orders') renderOrders();
  if (name === 'products') renderProductsTable();
}

function renderDashboard() {
  loadOrders(function() {
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('pendingOrders').textContent = orders.filter(function(o) { return o.status === 'En attente'; }).length;
    document.getElementById('totalProducts').textContent = products.length;

    var tbody = document.getElementById('recentOrdersBody');
    if (!tbody) return;
    var recent = orders.slice(-5).reverse();
    if (!recent.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#999;">' + esc(t('adminNoOrders')) + '</td></tr>';
    } else {
      tbody.innerHTML = recent.map(function(o) { return '<tr>' +
        '<td>' + esc(o.id) + '</td>' +
        '<td>' + esc(o.customer.firstName) + ' ' + esc(o.customer.lastName) + '</td>' +
        '<td>' + fmt(o.total) + '</td>' +
        '<td>' + new Date(o.date).toLocaleDateString('fr-FR') + '</td>' +
        '<td><span class="status ' + statusClass(o.status) + '">' + esc(t(statusLangKey(o.status))) + '</span></td>' +
      '</tr>'; }).join('');
    }
  });
}

function statusClass(s) {
  var m = { 'En attente': 'pending', 'Confirm\u00e9e': 'confirmed', 'Exp\u00e9di\u00e9e': 'shipped', 'Livr\u00e9e': 'delivered', 'Annul\u00e9e': 'cancelled' };
  return m[s] || 'pending';
}

function statusLangKey(s) {
  return 'status' + s.split(' ').map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }).join('').replace(/[\u00e9\u00e8]/g, 'e');
}

function loadOrders(cb) {
  fetch(API_BASE + '/api/orders', { headers: { 'Authorization': 'Basic ' + btoa(ADMIN_CREDENTIALS.username + ':' + ADMIN_CREDENTIALS.password) } })
    .then(function(r) { if (!r.ok) throw new Error('Auth'); return r.json(); })
    .then(function(data) { orders = data; if (cb) cb(); })
    .catch(function() { orders = []; if (cb) cb(); });
}

function renderOrders() {
  loadOrders(function() {
    var tbody = document.getElementById('ordersBody');
    if (!tbody) return;
    if (!orders.length) {
      tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;color:#999;">' + esc(t('adminNoOrders')) + '</td></tr>';
      return;
    }
    tbody.innerHTML = orders.map(function(o) { return '<tr>' +
      '<td>' + esc(o.id) + '</td>' +
      '<td>' + esc(o.customer.firstName) + ' ' + esc(o.customer.lastName) + '</td>' +
      '<td>' + esc(o.customer.phone) + '</td>' +
      '<td>' + esc(o.customer.address) + '</td>' +
      '<td>' + o.items.map(function(i) { return esc(i.name) + ' x' + i.qty; }).join(', ') + '</td>' +
      '<td>' + fmt(o.total) + '</td>' +
      '<td>' + new Date(o.date).toLocaleDateString('fr-FR') + '</td>' +
      '<td><span class="status ' + statusClass(o.status) + '">' + esc(t(statusLangKey(o.status))) + '</span></td>' +
      '<td>' +
        '<select class="status-select" onchange="updateOrderStatus(\'' + o.id + '\', this.value)">' +
          '<option value="En attente"' + (o.status === 'En attente' ? ' selected' : '') + '>' + esc(t('statusEnAttente')) + '</option>' +
          '<option value="Confirm\u00e9e"' + (o.status === 'Confirm\u00e9e' ? ' selected' : '') + '>' + esc(t('statusConfirmee')) + '</option>' +
          '<option value="Exp\u00e9di\u00e9e"' + (o.status === 'Exp\u00e9di\u00e9e' ? ' selected' : '') + '>' + esc(t('statusExpediee')) + '</option>' +
          '<option value="Livr\u00e9e"' + (o.status === 'Livr\u00e9e' ? ' selected' : '') + '>' + esc(t('statusLivree')) + '</option>' +
          '<option value="Annul\u00e9e"' + (o.status === 'Annul\u00e9e' ? ' selected' : '') + '>' + esc(t('statusAnnulee')) + '</option>' +
        '</select>' +
      '</td>' +
    '</tr>'; }).join('');
  });
}

function updateOrderStatus(id, status) {
  apiOrder('PUT', id, { status: status }, function() {
    renderOrders();
    renderDashboard();
  });
}

function apiOrder(method, id, data, cb) {
  fetch(API_BASE + '/api/orders/' + id, {
    method: method,
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(ADMIN_CREDENTIALS.username + ':' + ADMIN_CREDENTIALS.password) },
    body: JSON.stringify(data)
  }).then(function(r) { return r.json(); }).then(function(d) { if (d.success && cb) cb(); }).catch(function() {});
}

function renderProductsTable() {
  loadProducts();
  var tbody = document.getElementById('productsBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  products.forEach(function(p) { (function(pid) {
    var tr = document.createElement('tr');
    var tdImg = document.createElement('td');
    var img = document.createElement('img');
    var imgSrc = getProductImage(p);
    img.src = imgSrc;
    img.alt = p.name;
    img.style.cssText = 'width:40px;height:40px;object-fit:cover;background:#f5f5f5;';
    img.onerror = function() { img.outerHTML = '<span style="font-size:10px;color:#999">N/A</span>'; };
    tdImg.appendChild(img);
    tr.appendChild(tdImg);

    var tdName = document.createElement('td');
    tdName.textContent = p.name;
    tr.appendChild(tdName);

    var tdPrice = document.createElement('td');
    tdPrice.textContent = fmt(p.price);
    tr.appendChild(tdPrice);

    var tdQty = document.createElement('td');
    tdQty.textContent = (p.qty !== undefined ? p.qty : '-');
    tdQty.style.textAlign = 'center';
    tr.appendChild(tdQty);

    var tdAction = document.createElement('td');
    var editBtn = document.createElement('button');
    editBtn.className = 'btn-small outline';
    editBtn.textContent = t('adminEdit');
    editBtn.onclick = function() { editProduct(pid); };
    tdAction.appendChild(editBtn);

    var delBtn = document.createElement('button');
    delBtn.className = 'btn-small danger';
    delBtn.textContent = t('adminDelete');
    delBtn.style.marginLeft = '6px';
    delBtn.onclick = function() { if (confirm(t('adminConfirmDelete'))) deleteProduct(pid); };
    tdAction.appendChild(delBtn);

    tr.appendChild(tdAction);
    tbody.appendChild(tr);
  })(p.id); });
}

function editProduct(id) {
  var p = products.find(function(x) { return x.id === id; });
  if (!p) return;
  var formTitle = document.getElementById('formTitle');
  if (formTitle) formTitle.textContent = t('adminEdit') + ' \u2014 ' + p.name;
  document.getElementById('editId').value = id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodQty').value = p.qty || 0;
  document.getElementById('prodDesc').value = p.desc || '';
  document.getElementById('prodCategory').value = p.cat || 'huiles';
  var preview = document.getElementById('imagePreview');
  var previewImg = document.getElementById('previewImg');
  var src = getProductImage(p);
  if (src && preview && previewImg) {
    previewImg.src = src;
    preview.style.display = 'block';
  }
  var submitBtn = document.getElementById('formSubmitBtn');
  if (submitBtn) submitBtn.textContent = t('adminSave');
  var cancelBtn = document.getElementById('formCancelBtn');
  if (cancelBtn) cancelBtn.style.display = 'inline-block';
  showTab('add-product');
}

function cancelEdit() {
  document.getElementById('editId').value = '';
  document.getElementById('productForm').reset();
  document.getElementById('imagePreview').style.display = 'none';
  var formTitle = document.getElementById('formTitle');
  if (formTitle) formTitle.textContent = t('adminAddProduct');
  var submitBtn = document.getElementById('formSubmitBtn');
  if (submitBtn) submitBtn.textContent = t('adminAddBtn');
  var cancelBtn = document.getElementById('formCancelBtn');
  if (cancelBtn) cancelBtn.style.display = 'none';
}

function addProduct() {
  var editId = document.getElementById('editId').value;
  var name = document.getElementById('prodName').value.trim();
  var price = parseFloat(document.getElementById('prodPrice').value);
  var qty = parseInt(document.getElementById('prodQty').value) || 0;
  var desc = document.getElementById('prodDesc').value.trim();
  var cat = document.getElementById('prodCategory').value;
  var fileInput = document.getElementById('prodImageInput');

  if (!name || !price) { alert(t('adminFillFields')); return; }

  if (editId) {
    var p = products.find(function(x) { return x.id === parseInt(editId); });
    if (!p) { alert(t('adminNotFound')); return; }
    p.name = name; p.price = price; p.qty = qty; p.desc = desc; p.cat = cat;
    if (fileInput.files.length > 0) {
      var file = fileInput.files[0];
      if (file.size > 10 * 1024 * 1024) { alert(t('adminImageTooBig')); return; }
      compressFile(file, 800, 0.7, function(data) {
        if (data) { saveProductImage(editId, data); }
        saveProducts(); alert(t('adminSaved')); renderProductsTable(); cancelEdit();
      });
    } else {
      saveProducts(); alert(t('adminSaved')); renderProductsTable(); cancelEdit();
    }
  } else {
    if (fileInput.files.length === 0) { alert(t('adminSelectImage')); return; }
    var file = fileInput.files[0];
    if (file.size > 10 * 1024 * 1024) { alert(t('adminImageTooBig')); return; }
    var maxId = 0;
    products.forEach(function(p) { if (p.id > maxId) maxId = p.id; });
    var newId = maxId + 1;
    compressFile(file, 800, 0.7, function(data) {
      if (!data) { alert(t('adminSelectImage')); return; }
      saveProductImage(newId, data);
      products.push({ id: newId, name: name, price: price, qty: qty, desc: desc, cat: cat, image: '' });
      saveProducts(); alert(t('adminSaved')); renderProductsTable(); cancelEdit();
    });
  }
}

function deleteProduct(id) {
  products = products.filter(function(p) { return p.id !== id; });
  saveProducts(); renderProductsTable();
}

function sendOrderEmail(order) {
  if (typeof emailjs === 'undefined') return;
  var itemsHtml = order.items.map(function(i) {
    return i.name + ' x' + i.qty + ' \u2014 ' + (i.price * i.qty).toLocaleString('fr-FR') + ' DH';
  }).join('\n');
  var baseParams = {
    from_name: 'LARACH BLOOM',
    order_id: order.id,
    order_date: new Date(order.date).toLocaleString('fr-FR'),
    customer_name: order.customer.firstName + ' ' + order.customer.lastName,
    customer_phone: order.customer.phone,
    customer_address: order.customer.address,
    customer_notes: order.customer.notes || 'Aucune',
    items: itemsHtml,
    total: order.total.toLocaleString('fr-FR') + ' DH',
    payment: 'Paiement \u00e0 la livraison (COD)'
  };
  var storeParams = Object.assign({}, baseParams, { to_email: EMAIL_CONFIG.toEmail, subject: 'Nouvelle commande #' + order.id });
  emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, storeParams, EMAIL_CONFIG.publicKey)
    .then(function() {}, function() {});
  if (order.customer.email) {
    var customerParams = Object.assign({}, baseParams, { to_email: order.customer.email, subject: 'Confirmation de commande #' + order.id + ' — LARACH BLOOM' });
    emailjs.send(EMAIL_CONFIG.serviceID, EMAIL_CONFIG.templateID, customerParams, EMAIL_CONFIG.publicKey)
      .then(function() {}, function() {});
  }
}

function handleLogin() {
  var u = document.getElementById('loginUser').value.trim();
  var p = document.getElementById('loginPass').value.trim();
  var err = document.getElementById('loginError');
  if (u === ADMIN_CREDENTIALS.username && p === ADMIN_CREDENTIALS.password) {
    try { localStorage.setItem('lb_admin_session', JSON.stringify({ user: u, at: Date.now() })); } catch(e) {}
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('adminMain').style.display = 'block';
    document.querySelector('.top-bar').innerHTML = t('adminLogin');
    document.getElementById('loginUser').value = '';
    document.getElementById('loginPass').value = '';
    err.textContent = '';
    loadProducts();
    showTab('dashboard');
  } else {
    err.textContent = t('adminLoginError');
  }
}

function logout() {
  localStorage.removeItem('lb_admin_session');
  location.reload();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    var loginOverlay = document.getElementById('loginOverlay');
    if (loginOverlay && !loginOverlay.classList.contains('hidden')) {
      handleLogin();
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  loadProducts();
  loadCart();
  applyLang();

  var page = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav a').forEach(function(a) {
    var href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
    else a.classList.remove('active');
  });

  if (page.includes('checkout')) {
    if (typeof emailjs !== 'undefined') emailjs.init(EMAIL_CONFIG.publicKey);
    renderSummary();
    updateCart();
    var form = document.getElementById('checkoutForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var order = {
          customer: {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            address: document.getElementById('address').value.trim(),
            notes: document.getElementById('notes').value.trim()
          },
          items: cart.map(function(i) { return { id: i.id, name: i.name, price: i.price, qty: i.qty }; }),
          total: total(),
          payment: 'COD'
        };
        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = t('sending');
        fetch(API_BASE + '/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        }).then(function(r) { return r.json(); }).then(function(data) {
          if (data.success) {
            order.id = data.id;
            order.date = new Date().toISOString();
            order.status = 'En attente';
            sendOrderEmail(order);
            localStorage.removeItem('lb_cart');
            document.getElementById('successOverlay').classList.add('active');
            document.getElementById('orderRef').textContent = data.id;
          } else {
            alert('Erreur: ' + (data.error || 'Impossible de passer la commande.'));
            btn.disabled = false;
            btn.textContent = t('checkoutBtn');
          }
        }).catch(function() {
          alert('Erreur r\u00e9seau. Veuillez r\u00e9essayer.');
          btn.disabled = false;
          btn.textContent = t('checkoutBtn');
        });
      });
    }
  }

  if (page.includes('admin')) {
    var loginOverlay = document.getElementById('loginOverlay');
    var adminMain = document.getElementById('adminMain');
    if (!loginOverlay || !adminMain) return;
    try {
      var sess = JSON.parse(localStorage.getItem('lb_admin_session'));
      if (sess && sess.user === ADMIN_CREDENTIALS.username && Date.now() - sess.at < 86400000) {
        loginOverlay.classList.add('hidden');
        adminMain.style.display = 'block';
        document.querySelector('.top-bar').innerHTML = t('adminLogin');
        loadProducts();
        showTab('dashboard');
      } else {
        localStorage.removeItem('lb_admin_session');
        adminMain.style.display = 'none';
      }
    } catch(e) { adminMain.style.display = 'none'; }
    document.getElementById('loginBtn').onclick = handleLogin;
  }

  var cartBtn = document.getElementById('cartBtn');
  var cartClose = document.getElementById('cartClose');
  var overlay = document.getElementById('overlay');
  var checkoutBtn = document.getElementById('checkoutBtn');
  if (cartBtn) cartBtn.onclick = openCart;
  if (cartClose) cartClose.onclick = closeCart;
  if (overlay) overlay.onclick = closeCart;
  if (checkoutBtn) checkoutBtn.onclick = function(e) {
    if (!cart.length) return;
    saveCart();
    closeCart();
    window.location.href = 'checkout.html';
  };

  if (page.includes('admin')) {
    document.querySelectorAll('.admin-side nav a').forEach(function(a) {
      if (a.dataset.tab) {
        a.onclick = function(e) { e.preventDefault(); showTab(this.dataset.tab); };
      }
    });
    if (adminMain && adminMain.style.display !== 'none') showTab('dashboard');
  }
});
