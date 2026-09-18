export enum TicketStatus {
  Out = 1,
  Available = 2,
}

export type Zone = {
  _id?: string;
  id: string;
  name: string;
  floor: number;
  capacity: number;
  available: number;
  price: number;
  status: TicketStatus | number;
  dateCreated?: string;
  dateUpdated?: string;
};

export type ZoneTheme = {
  base: string;
  hover: string;
};

export const SETS = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];

export const THEME_COLORS: Record<string, ZoneTheme> = {
  A1: { base: "#e53935", hover: "#ef5350" },
  A2: { base: "#c62828", hover: "#e53935" },
  B1: { base: "#2e7d32", hover: "#66bb6a" },
  B2: { base: "#43a047", hover: "#81c784" },
  C1: { base: "#1e88e5", hover: "#64b5f6" },
  C2: { base: "#1565c0", hover: "#42a5f5" },
  D1: { base: "#8e24aa", hover: "#ba68c8" },
  D2: { base: "#6a1b9a", hover: "#ab47bc" },
};
