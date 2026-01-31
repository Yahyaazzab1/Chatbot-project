# Dashboard WhatsApp Chatbot

Dashboard React + TypeScript pour la gestion des clients WhatsApp avec mises à jour en temps réel via WebSocket/Socket.IO.

## 🚀 Fonctionnalités

- ✅ **Composants React modulaires** avec TypeScript
- ✅ **Filtres** : Tous, En attente, Confirmés
- ✅ **Recherche par numéro de téléphone**
- ✅ **WebSocket/Socket.IO** pour les mises à jour en temps réel
- ✅ **Données mockées** pour la démonstration

## 📦 Installation

```bash
npm install
```

## 🏃 Démarrage

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Structure

```
src/
├── components/          # Composants React
│   ├── ClientTable.tsx  # Tableau des clients
│   ├── SearchBar.tsx     # Barre de recherche
│   └── FilterButtons.tsx # Boutons de filtres
├── pages/               # Pages
│   └── Dashboard.tsx    # Page principale
├── services/            # Services
│   ├── mockData.ts      # Données mockées
│   └── websocket.ts     # Service WebSocket/Socket.IO
└── types/               # Types TypeScript
    └── index.ts
```

## 🔌 WebSocket/Socket.IO

Le service WebSocket est configuré dans `src/services/websocket.ts` et se connecte automatiquement au démarrage.

### Événements Socket.IO

- `client:updated` - Mise à jour d'un client
- `client:created` - Nouveau client créé

### Configuration

Définissez l'URL du serveur WebSocket dans `.env` :

```env
VITE_WS_URL=http://localhost:4000
```

## 📝 Types

```typescript
type ClientStatus = "pending" | "confirmed" | "all";

interface Client {
  id: string;
  phoneNumber: string;
  name?: string;
  status: "pending" | "confirmed";
  createdAt: string;
  updatedAt: string;
}
```

## 🛠️ Technologies

- React 19
- TypeScript
- Socket.IO Client
- Vite
- Tailwind CSS
