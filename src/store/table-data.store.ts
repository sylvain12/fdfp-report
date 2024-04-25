import { itemToShowCount } from "@/components/reports/details/report-table-filters";
import axios from "axios";
import { stringify } from "querystring";
import { create } from "zustand";

type TState = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: any;
  errorData: any;
};

const initialState: TState = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

type TableDataStore = {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: any;
  errorData: any;
  loadTable: (path: string, params: { year?: string; table: string }) => void;
  resetTable: () => void;
};

const BASE_URL = process.env.SERVER_URL || "http://147.182.139.206:8016";

export const useGetData = create<TableDataStore>((set, get) => ({
  ...initialState,
  loadTable: async (path: string, params: { year?: string; table: string }) => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get(
        `${BASE_URL}/${path}/?${stringify({ ...params })}`
      );
      set({ ...initialState, success: true, data: res.data });
    } catch (err: any) {
      console.error("Error in data fetch", err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  },
  resetTable: async () => set({ ...initialState }),
}));

type TFilterDataState = {
  totalPagination: number;
  filterData: any[];
};

type TFilterDataStore = {
  totalPagination: number;
  filterData: any[];
  setFilterData: (
    totalPagination: number,
    data: any[],
    currentPage: number
  ) => void;
};

const initialFilterData: TFilterDataState = {
  totalPagination: 0,
  filterData: [],
};

export const useFilterData = create<TFilterDataStore>((set) => ({
  ...initialFilterData,
  setFilterData: (
    totalPagination: number,
    data: any[],
    currentPage: number
  ) => {
    set({
      ...initialFilterData,
      totalPagination,
      filterData: data && data.length !== 0 ? data[currentPage - 1] : [],
    });
  },
}));
