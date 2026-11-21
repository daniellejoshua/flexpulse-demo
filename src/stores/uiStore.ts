import { create } from "zustand";

interface UiState {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  demoOpen: boolean;
  setDemoOpen: (v: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  cartOpen: false,
  setCartOpen: (v) => set({ cartOpen: v }),
  demoOpen: false,
  setDemoOpen: (v) => set({ demoOpen: v }),
}));
