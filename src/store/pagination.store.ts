import { create } from "zustand";

type PaginationStore = {
  //   pages: number[];
  currentPage: number;
  updatePage: (page: number) => void;
  //   resetPage: () => void;
  //   setPages: (totalPages: number) => void;
};

export const usePaginationStore = create<PaginationStore>((set) => ({
  pages: [],
  currentPage: 1,
  updatePage: (page: number) => {
    set({ currentPage: page });
  },
  //   setPages: (totalPages: number) => {
  //     set({ pages:  });
  //   },
}));
