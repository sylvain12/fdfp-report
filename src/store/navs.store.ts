import { create } from "zustand";
import { TLink } from "@/types/navigation.type";

export enum IDarkMode {
  LIGHT = 1,
  DARK,
}

type NavStore = {
  navs: TLink[];
  update: (links: TLink[]) => void;
};

type DarkModeStore = {
  isDark: boolean;
  toggleMode: () => void;
};

export const useNavStore = create<NavStore>((set) => ({
  navs: [],
  update: (links: TLink[]) => {
    set({ navs: [...links] });
  },
}));

export const useDarkModeStore = create<DarkModeStore>((set) => ({
  isDark: false,
  toggleMode: () => {
    set((state) => ({ isDark: !state.isDark }));
  },
}));

type NavMobileStore = {
  isVisible: boolean;
  toogleVisibility: () => void;
  resetVisibility: () => void;
};

export const useNavMobileStore = create<NavMobileStore>((set) => ({
  isVisible: false,
  toogleVisibility: () => {
    set((state) => ({ isVisible: !state.isVisible }));
  },
  resetVisibility: () => {
    set((state) => ({ isVisible: false }));
  },
}));
