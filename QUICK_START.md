# ⚡ Démarrage Rapide

Guide rapide pour démarrer le projet en 5 minutes.

## 🎯 Étapes rapides

### 1. Backend (Terminal 1)

```bash
cd backend
npm install
# Créer .env avec MONGODB_URI=mongodb://localhost:27017/whatsapp-chatbot
npm run dev
```

✅ Backend démarré sur http://localhost:4000

### 2. Frontend (Terminal 2)

```bash
cd whatsapp-dashboard
npm install
# Créer .env avec VITE_API_URL=http://localhost:4000/api
npm run dev
```

✅ Dashboard accessible sur http://localhost:5173

### 3. MongoDB

Assurez-vous que MongoDB est démarré :
```bash
# Windows (si installé localement)
mongod

# Ou utilisez MongoDB Atlas (cloud)
# Mettez l'URI dans .env
```

## 🧪 Test rapide

### Créer un client de test

```bash
curl -X POST http://localhost:4000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+33612345678",
    "name": "Client Test",
    "status": "pending"
  }'
```

### Vérifier dans le dashboard

Ouvrez http://localhost:5173 et vous devriez voir le client !

## 📝 Structure des fichiers .env

### backend/.env
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/whatsapp-chatbot
WHATSAPP_API_KEY=votre_cle
```

### whatsapp-dashboard/.env
```env
VITE_API_URL=http://localhost:4000/api
```

## ✅ Checklist

- [ ] MongoDB démarré
- [ ] Backend démarré (port 4000)
- [ ] Frontend démarré (port 5173)
- [ ] Fichiers .env créés
- [ ] Test de création client réussi

## 🚀 Prêt !

Votre projet est maintenant opérationnel. Consultez `README.md` pour plus de détails.

