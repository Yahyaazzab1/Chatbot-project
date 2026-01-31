import { useEffect, useState, useCallback, useMemo } from "react";
import type { Client, ClientStatus } from "../types";
import ClientTable from "../components/ClientTable";
import SearchBar from "../components/SearchBar";
import FilterButtons from "../components/FilterButtons";
import StatsCard from "../components/StatsCard";
import { mockDataService } from "../services/mockData";
import { websocketService } from "../services/websocket";
import { Users, Clock, CheckCircle, Activity } from "lucide-react";

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filter, setFilter] = useState<ClientStatus>("all");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Debug: vérifier que le composant se charge
  useEffect(() => {
    console.log("Dashboard component mounted");
  }, []);

  // Charger les clients
  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mockDataService.getClients(
        filter === "all" ? undefined : filter,
        search || undefined
      );
      setClients(data);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  // Charger les clients au montage et lors des changements
  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Gérer les mises à jour de statut
  const handleStatusChange = async (id: string, status: "pending" | "confirmed") => {
    try {
      await mockDataService.updateClient(id, { status });
      await loadClients();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  // Configuration WebSocket pour les mises à jour en temps réel
  useEffect(() => {
    try {
      // Connecter au WebSocket
      websocketService.connect();

      // Écouter les mises à jour de clients
      websocketService.onClientUpdated((updatedClient: Client) => {
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === updatedClient.id ? updatedClient : client
          )
        );
      });

      // Écouter les nouveaux clients
      websocketService.onClientCreated((newClient: Client) => {
        setClients((prevClients) => [...prevClients, newClient]);
      });
    } catch (error) {
      console.error("Erreur WebSocket:", error);
    }

    // Nettoyer à la déconnexion
    return () => {
      try {
        websocketService.disconnect();
      } catch (error) {
        console.error("Erreur lors de la déconnexion WebSocket:", error);
      }
    };
  }, []);

  // Calculer les statistiques
  const stats = useMemo(() => {
    const total = clients.length;
    const pending = clients.filter(c => c.status === "pending").length;
    const confirmed = clients.filter(c => c.status === "confirmed").length;
    const pendingPercentage = total > 0 ? Math.round((pending / total) * 100) : 0;
    const confirmedPercentage = total > 0 ? Math.round((confirmed / total) * 100) : 0;
    
    return {
      total,
      pending,
      confirmed,
      pendingPercentage,
      confirmedPercentage,
    };
  }, [clients]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header avec gradient moderne */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                📱 Dashboard WhatsApp Chatbot
              </h1>
              <p className="text-indigo-100 text-lg">
                Gestion intelligente des clients en temps réel
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className={`w-3 h-3 rounded-full ${websocketService.isConnected() ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-white font-semibold text-sm">
                {websocketService.isConnected() ? "Connecté" : "Déconnecté"}
              </span>
            </div>
          </div>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Clients"
              value={stats.total}
              icon={Users}
              color="text-white"
              bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
              trend="+12%"
            />
            <StatsCard
              title="En attente"
              value={stats.pending}
              icon={Clock}
              color="text-white"
              bgGradient="bg-gradient-to-br from-yellow-500 to-orange-500"
              trend={`${stats.pendingPercentage}%`}
            />
            <StatsCard
              title="Confirmés"
              value={stats.confirmed}
              icon={CheckCircle}
              color="text-white"
              bgGradient="bg-gradient-to-br from-green-500 to-emerald-600"
              trend={`${stats.confirmedPercentage}%`}
            />
            <StatsCard
              title="Activité"
              value="Temps réel"
              icon={Activity}
              color="text-white"
              bgGradient="bg-gradient-to-br from-purple-500 to-pink-600"
              trend="Live"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 -mt-6">
        {/* Barre de recherche et filtres avec design moderne */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="🔍 Rechercher par numéro de téléphone..."
              />
            </div>
            <div>
              <FilterButtons currentFilter={filter} onFilterChange={setFilter} />
            </div>
          </div>
        </div>

        {/* Tableau des clients avec design amélioré */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
              <p className="text-gray-500 text-lg font-medium">Chargement des données...</p>
            </div>
          ) : (
            <ClientTable clients={clients} onStatusChange={handleStatusChange} />
          )}
        </div>
      </div>
    </div>
  );
}
