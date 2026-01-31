# 🔌 Guide d'Intégration WhatsApp API

Ce guide explique comment connecter votre chatbot WhatsApp avec le backend.

## 📋 Prérequis

- Clé API WhatsApp (déjà achetée par vos collègues)
- Backend démarré et accessible
- Endpoint webhook configuré dans votre service WhatsApp

## 🔗 Architecture

```
WhatsApp API → Webhook → Backend API → MongoDB
                      ↓
                 Frontend Dashboard
```

## 🚀 Étapes d'intégration

### 1. Configuration du Webhook WhatsApp

Dans votre service WhatsApp API, configurez le webhook pour pointer vers votre backend :

```
URL: http://votre-serveur:4000/api/webhook/whatsapp
Method: POST
```

### 2. Création de l'endpoint Webhook (Optionnel)

Si vous voulez un endpoint dédié, ajoutez dans `backend/src/routes/webhook.ts` :

```typescript
import { Router, Request, Response } from "express";
import { ClientModel } from "../models/Client.js";

const router = Router();

router.post("/whatsapp", async (req: Request, res: Response) => {
  try {
    const { from, body, type } = req.body;
    
    // Extraire le numéro de téléphone
    const phoneNumber = from.replace("@s.whatsapp.net", "");
    
    // Vérifier si le client existe
    let client = await ClientModel.findOne({ phoneNumber });
    
    if (!client) {
      // Créer un nouveau client
      client = new ClientModel({
        phoneNumber,
        status: "pending",
        orders: [],
        lastContact: new Date(),
      });
      await client.save();
    } else {
      // Mettre à jour le dernier contact
      client.lastContact = new Date();
      await client.save();
    }
    
    // Traiter le message selon votre logique métier
    // Exemple : détecter une confirmation de commande
    if (body.toLowerCase().includes("confirmer") || body.toLowerCase().includes("oui")) {
      client.status = "confirmed";
      await client.save();
    }
    
    res.json({ success: true, clientId: client._id });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

Puis ajoutez dans `backend/src/index.ts` :
```typescript
import webhookRouter from "./routes/webhook.js";
app.use("/api/webhook", webhookRouter);
```

### 3. Exemples d'utilisation

#### Créer un client depuis WhatsApp
Quand un nouveau client envoie un message :

```javascript
// Dans votre code WhatsApp
const response = await fetch('http://localhost:4000/api/clients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+33612345678',
    name: 'Nom du client', // Si disponible
    status: 'pending'
  })
});
```

#### Mettre à jour le statut quand le client confirme
```javascript
// Détecter la confirmation dans le message
if (messageBody.includes('confirmer') || messageBody.includes('oui')) {
  await fetch(`http://localhost:4000/api/clients/${clientId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'confirmed' })
  });
}
```

#### Créer une commande
```javascript
await fetch('http://localhost:4000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: clientId,
    products: [
      { id: 'prod1', name: 'Produit A', price: 29.99, quantity: 2 },
      { id: 'prod2', name: 'Produit B', price: 49.99, quantity: 1 }
    ]
  })
});
```

## 🔐 Sécurité

### Authentification API (Recommandé)

Ajoutez un middleware d'authentification :

```typescript
// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";

export const authenticateAPI = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  
  if (apiKey !== process.env.WHATSAPP_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Utilisation
app.use("/api/webhook", authenticateAPI, webhookRouter);
```

## 📊 Flux de données typique

1. **Client envoie un message** → WhatsApp API
2. **Webhook reçu** → Backend crée/met à jour le client
3. **Client confirme commande** → Backend met à jour le statut à "confirmed"
4. **Dashboard affiche** → Les données en temps réel

## 🧪 Test

Testez avec curl :

```bash
# Simuler un nouveau client
curl -X POST http://localhost:4000/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+33612345678",
    "name": "Test Client",
    "status": "pending"
  }'

# Vérifier dans le dashboard
# Ouvrez http://localhost:5173
```

## 💡 Conseils

1. **Logs** : Ajoutez des logs pour tracer les webhooks
2. **Validation** : Validez toujours les données reçues
3. **Erreurs** : Gérez les erreurs gracieusement
4. **Rate Limiting** : Limitez les requêtes pour éviter les abus
5. **Webhooks sécurisés** : Utilisez HTTPS en production

## 🐛 Dépannage

### Webhook non reçu
- Vérifiez l'URL du webhook dans votre service WhatsApp
- Vérifiez que le backend est accessible depuis l'extérieur
- Vérifiez les logs du backend

### Données non sauvegardées
- Vérifiez la connexion MongoDB
- Vérifiez les logs d'erreur
- Vérifiez le format des données envoyées

---

**Besoin d'aide ?** Consultez la documentation de votre service WhatsApp API.

