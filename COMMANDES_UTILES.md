# 💻 Commandes Utiles

## 🚀 Démarrage

### Backend
```bash
cd backend
npm install
npm run dev          # Développement
npm run build        # Build production
npm start            # Production
```

### Frontend
```bash
cd whatsapp-dashboard
npm install
npm run dev          # Développement
npm run build        # Build production
npm run preview       # Prévisualiser le build
```

## 🗄️ MongoDB

### Démarrer MongoDB (local)
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
# ou
brew services start mongodb-community
```

### Connexion MongoDB
```bash
mongosh
# ou
mongo
```

### Créer la base de données
```javascript
use whatsapp-chatbot
```

## 🧪 Tests API

### Créer un client
```bash
curl -X POST http://localhost:4000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+33612345678",
    "name": "Jean Dupont",
    "status": "pending"
  }'
```

### Récupérer tous les clients
```bash
curl http://localhost:4000/api/clients
```

### Filtrer par statut
```bash
curl http://localhost:4000/api/clients?status=pending
```

### Rechercher
```bash
curl http://localhost:4000/api/clients?search=jean
```

### Mettre à jour un client
```bash
curl -X PUT http://localhost:4000/api/clients/CLIENT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

### Statistiques
```bash
curl http://localhost:4000/api/clients/stats/summary
```

### Créer une commande
```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "CLIENT_ID",
    "products": [
      {
        "id": "prod1",
        "name": "Produit A",
        "price": 29.99,
        "quantity": 2
      }
    ]
  }'
```

## 🔧 Maintenance

### Nettoyer node_modules
```bash
# Backend
cd backend
rm -rf node_modules
npm install

# Frontend
cd whatsapp-dashboard
rm -rf node_modules
npm install
```

### Vérifier les ports
```bash
# Windows
netstat -ano | findstr :4000
netstat -ano | findstr :5173

# Linux/Mac
lsof -i :4000
lsof -i :5173
```

### Tuer un processus
```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

## 📦 Build Production

### Backend
```bash
cd backend
npm run build
# Les fichiers seront dans dist/
```

### Frontend
```bash
cd whatsapp-dashboard
npm run build
# Les fichiers seront dans dist/
```

## 🐛 Debug

### Vérifier les logs
```bash
# Backend - les logs apparaissent dans la console
# Frontend - ouvrir DevTools (F12)
```

### Vérifier la connexion MongoDB
```bash
# Dans le terminal backend, vous devriez voir :
# ✅ Connected to MongoDB
```

### Vérifier les variables d'environnement
```bash
# Backend
cat backend/.env

# Frontend
cat whatsapp-dashboard/.env
```

## 🔄 Git (si vous utilisez)

```bash
# Initialiser
git init

# Ajouter tous les fichiers
git add .

# Commit
git commit -m "Initial commit"

# Ignorer node_modules (déjà dans .gitignore)
```

## 📊 Monitoring

### Vérifier la santé de l'API
```bash
curl http://localhost:4000/health
```

### Vérifier les erreurs
- Backend : Console du terminal
- Frontend : DevTools Console (F12)
- Network : DevTools Network tab

---

**💡 Astuce** : Gardez ce fichier à portée de main pour référence rapide !

