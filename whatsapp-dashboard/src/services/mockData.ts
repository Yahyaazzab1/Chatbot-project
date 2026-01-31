import type { Client } from "../types";

// Données mockées pour la démonstration
const generateMockClients = (): Client[] => {
  const clients: Client[] = [];
  const names = [
    "Jean Dupont", "Marie Martin", "Pierre Bernard", "Sophie Dubois",
    "Luc Moreau", "Emma Laurent", "Thomas Simon", "Julie Michel",
    "Antoine Roux", "Camille Fournier", "Nicolas Girard", "Léa Bonnet",
    "Alexandre Leroy", "Chloé Martinez", "Maxime Garcia", "Manon Rodriguez"
  ];

  for (let i = 0; i < 20; i++) {
    const status: "pending" | "confirmed" = Math.random() > 0.5 ? "confirmed" : "pending";
    
    clients.push({
      id: `client-${i + 1}`,
      phoneNumber: `+33${Math.floor(Math.random() * 900000000) + 100000000}`,
      name: names[i % names.length],
      status,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return clients;
};

// Stockage en mémoire
let mockClients = generateMockClients();

// Simule un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDataService = {
  getClients: async (filter?: "pending" | "confirmed" | "all", search?: string): Promise<Client[]> => {
    await delay(300);
    
    let filtered = [...mockClients];

    // Filtre par statut
    if (filter && filter !== "all") {
      filtered = filtered.filter(client => client.status === filter);
    }

    // Recherche par numéro de téléphone
    if (search) {
      filtered = filtered.filter(client => 
        client.phoneNumber.includes(search)
      );
    }

    return filtered;
  },

  updateClient: async (id: string, data: Partial<Client>): Promise<Client> => {
    await delay(200);
    const index = mockClients.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error("Client not found");
    }
    
    mockClients[index] = {
      ...mockClients[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return mockClients[index];
  },
};
