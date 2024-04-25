import { create } from "zustand";

type PaginationStore = {
  currentPage: number;
  updatePage: (page: number) => void;
};

export const usePaginationStore = create<PaginationStore>((set) => ({
  // pages: [],
  currentPage: 1,
  updatePage: (page: number) => {
    set({ currentPage: page });
  },
}));
