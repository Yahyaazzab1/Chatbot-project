import type { Client } from "../types";
import StatusBadge from "./StatusBadge";
import { Phone, Calendar } from "lucide-react";

interface Props {
  clients: Client[];
  onStatusChange: (id: string, status: "pending" | "confirmed") => void;
}

export default function ClientTable({ clients, onStatusChange }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (clients.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
          <Phone className="w-12 h-12 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg font-medium">Aucun client trouvé</p>
        <p className="text-gray-400 text-sm mt-2">Essayez de modifier vos filtres de recherche</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Client
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Statut
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Dernière mise à jour
            </th>
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {clients.map((client, index) => (
            <tr
              key={client.id}
              className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-200 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                    {client.name ? client.name.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{client.name || "Sans nom"}</p>
                    <p className="text-xs text-gray-500 font-mono">ID: {client.id.slice(-6)}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  <span className="font-mono font-semibold">{client.phoneNumber}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={client.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">{formatDate(client.updatedAt)}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <select
                  value={client.status}
                  onChange={(e) =>
                    onStatusChange(client.id, e.target.value as "pending" | "confirmed")
                  }
                  className="px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer hover:border-indigo-300 bg-white shadow-sm hover:shadow-md"
                >
                  <option value="pending">⏳ En attente</option>
                  <option value="confirmed">✅ Confirmé</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
