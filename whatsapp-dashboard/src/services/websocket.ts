import { io, Socket } from "socket.io-client";
import type { Client } from "../types";

/**
 * Service WebSocket/Socket.IO pour les mises à jour en temps réel
 */
class WebSocketService {
  private socket: Socket | null = null;
  private url: string;

  constructor(url?: string) {
    this.url = url || import.meta.env.VITE_WS_URL || "http://localhost:4000";
  }

  /**
   * Connecte au serveur Socket.IO
   */
  connect(): void {
    if (this.socket?.connected) {
      console.log("Socket.IO déjà connecté");
      return;
    }

    try {
      this.socket = io(this.url, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      });

      this.socket.on("connect", () => {
        console.log("Socket.IO connecté:", this.socket?.id);
      });

      this.socket.on("disconnect", () => {
        console.log("Socket.IO déconnecté");
      });

      this.socket.on("connect_error", (error) => {
        console.error("Erreur de connexion Socket.IO:", error);
      });
    } catch (error) {
      console.error("Erreur lors de la connexion Socket.IO:", error);
    }
  }

  /**
   * Déconnecte du serveur
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Écoute les mises à jour de clients
   */
  onClientUpdated(callback: (client: Client) => void): void {
    if (!this.socket) {
      console.warn("Socket.IO non connecté");
      return;
    }

    this.socket.on("client:updated", (data: Client) => {
      callback(data);
    });
  }

  /**
   * Écoute les nouveaux clients
   */
  onClientCreated(callback: (client: Client) => void): void {
    if (!this.socket) {
      console.warn("Socket.IO non connecté");
      return;
    }

    this.socket.on("client:created", (data: Client) => {
      callback(data);
    });
  }

  /**
   * Vérifie si le socket est connecté
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Instance singleton
export const websocketService = new WebSocketService();
