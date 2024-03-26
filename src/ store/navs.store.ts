import { create } from "zustand";
import { TLink } from "@/types/navigation.type";

type NavStore = {
  navs: TLink[];
  update: (links: TLink[]) => void;
};

export const useNavStore = create<NavStore>((set) => ({
  navs: [],
  update: (links: TLink[]) => {
    set({ navs: [...links] });
  },
}));
