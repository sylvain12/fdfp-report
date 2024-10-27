import axios from "axios";
import { stringify } from "querystring";
import { create } from "zustand";

export interface TTableFilterStoreStore {
  entity: string;
  entitylabel: string;
  procname: string;
}

type TableFilterStore = {
  tables: TTableFilterStoreStore[];
  isLoading: boolean;
  setTables: (content: TTableFilterStoreStore[]) => void;
  setLoading: (state: boolean) => void;
};

export const useTableFilterStore = create<TableFilterStore>((set) => ({
  tables: [],
  isLoading: false,
  setTables: async (content: TTableFilterStoreStore[]) => {
    set({ tables: content });
  },
  setLoading: (state: boolean) => set(() => ({isLoading: state}))
}));

export const useReportStore = () => {
  return {};
};

type ReportTotalStore = {
  isVisible: boolean;
  setVisibility: (visibility: boolean) => void;
  resetVisibility: () => void;
};

export const useReportTotalStore = create<ReportTotalStore>((set) => ({
  isVisible: false,
  setVisibility: (visibility: boolean) => {
    set((state) => ({ isVisible: visibility }));
  },
  resetVisibility: () => {
    set((state) => ({ isVisible: false }));
  },
}));
