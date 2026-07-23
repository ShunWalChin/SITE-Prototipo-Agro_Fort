"use client";

import { create } from "zustand";

type CatalogState = {
  activeProduct: number;
  lowMotion: boolean;
  setActiveProduct: (index: number) => void;
  setLowMotion: (enabled: boolean) => void;
};

export const useCatalogStore = create<CatalogState>((set) => ({
  activeProduct: 0,
  lowMotion: false,
  setActiveProduct: (activeProduct) => set({ activeProduct }),
  setLowMotion: (lowMotion) => set({ lowMotion }),
}));
