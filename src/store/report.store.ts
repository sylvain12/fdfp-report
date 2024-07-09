import axios from 'axios';
import { stringify } from 'querystring';
import { create } from "zustand";

export interface TTableFilterStoreStore {
    entity: string,
    entitylabel: string,
    procname: string,
}

type TableFilterStore = {
  tables: TTableFilterStoreStore[];
  setTables: (content: TTableFilterStoreStore[]) => void;
};

export const useTableFilterStore = create<TableFilterStore>((set) => ({
  tables: [],
  setTables: async (content: TTableFilterStoreStore[]) => {
    set({tables: content})
  }
}));


export const useReportStore = () => {
  return {};
};