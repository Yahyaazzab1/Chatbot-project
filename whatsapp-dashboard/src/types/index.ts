export type ClientStatus = "pending" | "confirmed" | "all";

export interface Client {
  id: string;
  phoneNumber: string;
  name?: string;
  status: "pending" | "confirmed";
  createdAt: string;
  updatedAt: string;
}

