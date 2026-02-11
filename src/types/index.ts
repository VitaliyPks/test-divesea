export interface INFTItem {
  id: string;
  name: string;
  image: string;
  endTime: number;
  currentBid: string;
}

export interface INFTState {
  items: INFTItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface IRootState {
  nft: INFTState;
}
