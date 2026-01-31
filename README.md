# 🤖 WhatsApp Chatbot Dashboard - Projet Professionnel

Un système complet de gestion de clients et commandes pour un chatbot WhatsApp d'entreprise.

## 📋 Vue d'ensemble

Ce projet comprend :
- **Backend API** : Node.js + Express + TypeScript + MongoDB
- **Frontend Dashboard** : React + TypeScript + Tailwind CSS
- **Base de données** : MongoDB pour stocker les clients et commandes
- **Interface moderne** : Design professionnel avec statistiques en temps réel

## 🛠️ Technologies utilisées

### Backend
- **Node.js** + **Express** : Serveur API REST
- **TypeScript** : Typage statique
- **MongoDB** + **Mongoose** : Base de données NoSQL
- **CORS** : Gestion des requêtes cross-origin

### Frontend
- **React 19** : Framework UI moderne
- **TypeScript** : Typage statique
- **Tailwind CSS** : Framework CSS utilitaire
- **Axios** : Client HTTP
- **Lucide React** : Icônes modernes

## 📁 Structure du projet

```
chatbot project/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── models/         # Modèles MongoDB
│   │   ├── routes/         # Routes API
│   │   ├── types/          # Types TypeScript
│   │   └── index.ts        # Point d'entrée
│   ├── package.json
│   └── tsconfig.json
│
└── whatsapp-dashboard/     # Frontend Dashboard
    ├── src/
    │   ├── components/     # Composants React
    │   ├── pages/         # Pages
    │   ├── services/      # Services API
    │   └── types/         # Types TypeScript
    ├── package.json
    └── vite.config.ts
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ et npm
- MongoDB (local ou MongoDB Atlas)

### 1. Installation du Backend

```bash
cd backend
npm install
```

Créer un fichier `.env` dans le dossier `backend/` :
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/whatsapp-chatbot
WHATSAPP_API_KEY=votre_cle_api_ici
```

Démarrer le backend :
```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:4000`

### 2. Installation du Frontend

```bash
cd whatsapp-dashboard
npm install
```

Créer un fichier `.env` dans le dossier `whatsapp-dashboard/` :
```env
VITE_API_URL=http://localhost:4000/api
```

Démarrer le frontend :
```bash
npm run dev
```

Le dashboard sera accessible sur `http://localhost:5173`

## 📊 Fonctionnalités

### Dashboard
- ✅ **Statistiques en temps réel** : Total clients, en attente, confirmés, annulés, chiffre d'affaires
- ✅ **Filtrage avancé** : Par statut (all, pending, confirmed, cancelled)
- ✅ **Recherche** : Par nom, téléphone ou email
- ✅ **Tableau interactif** : Affichage de tous les clients avec leurs informations
- ✅ **Détails client** : Modal avec historique complet des commandes
- ✅ **Gestion des statuts** : Changement de statut directement depuis le tableau
- ✅ **Notes** : Ajout de notes personnalisées pour chaque client
- ✅ **Design moderne** : Interface professionnelle avec animations

### API Backend

#### Endpoints Clients
- `GET /api/clients` - Liste tous les clients (filtres: `?status=pending&search=nom`)
- `GET /api/clients/:id` - Détails d'un client
- `POST /api/clients` - Créer un nouveau client
- `PUT /api/clients/:id` - Mettre à jour un client
- `DELETE /api/clients/:id` - Supprimer un client
- `GET /api/clients/stats/summary` - Statistiques globales

#### Endpoints Commandes
- `POST /api/orders` - Créer une nouvelle commande pour un client

## 🔌 Intégration avec WhatsApp API

Pour connecter le chatbot WhatsApp, vous devrez :

1. **Créer un webhook** dans votre service WhatsApp API qui envoie les données au backend
2. **Endpoint recommandé** : `POST /api/clients` pour créer automatiquement les clients
3. **Mise à jour des statuts** : Utiliser `PUT /api/clients/:id` quand un client confirme sa commande

Exemple d'intégration dans votre chatbot :
```javascript
// Quand un nouveau client WhatsApp envoie un message
const response = await fetch('http://localhost:4000/api/clients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+33612345678',
    name: 'Nom du client',
    status: 'pending'
  })
});

// Quand le client confirme sa commande
await fetch(`http://localhost:4000/api/clients/${clientId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'confirmed' })
});
```

## 📝 Types de données

### Client
```typescript
{
  _id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  status: "pending" | "confirmed" | "cancelled";
  orders: Order[];
  notes?: string;
  lastContact?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Order
```typescript
{
  id: string;
  products: Product[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Product
```typescript
{
  id: string;
  name: string;
  price: number;
  quantity: number;
}
```

## 🎨 Personnalisation

### Couleurs
Modifiez `whatsapp-dashboard/tailwind.config.js` pour changer les couleurs du thème.

### Ports
Modifiez les variables d'environnement `.env` pour changer les ports.

## 🔒 Sécurité

- Ajoutez l'authentification JWT pour protéger les endpoints
- Utilisez HTTPS en production
- Validez toutes les entrées utilisateur
- Limitez les taux de requêtes (rate limiting)

## 📦 Déploiement

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd whatsapp-dashboard
npm run build
# Déployer le dossier dist/ sur votre serveur web
```

## 🤝 Collaboration

### Workflow recommandé
1. **Backend** : Développement de l'API et intégration WhatsApp
2. **Frontend** : Interface utilisateur et visualisation
3. **Intégration** : Connexion entre le chatbot WhatsApp et l'API

### Points d'intégration
- Le chatbot WhatsApp doit envoyer les données au backend via `POST /api/clients`
- Le backend stocke automatiquement dans MongoDB
- Le frontend affiche les données en temps réel

## 📚 Ressources

- [Documentation Express](https://expressjs.com/)
- [Documentation React](https://react.dev/)
- [Documentation MongoDB](https://www.mongodb.com/docs/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)

## 🐛 Dépannage

### MongoDB ne se connecte pas
- Vérifiez que MongoDB est démarré : `mongod`
- Vérifiez l'URI dans `.env`

### CORS errors
- Vérifiez que le backend autorise les requêtes depuis le frontend
- Vérifiez l'URL de l'API dans `.env` du frontend

### Port déjà utilisé
- Changez le PORT dans `.env` du backend

## 📄 Licence

Ce projet est destiné à un usage commercial pour l'entreprise.

---

**Développé avec ❤️ pour une gestion professionnelle des clients WhatsApp**

