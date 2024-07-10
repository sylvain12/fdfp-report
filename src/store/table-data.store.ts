import { itemToShowCount } from "@/components/reports/details/report-table-filters";
import { API_STATISTICS_PATH, API_URL } from '@/lib/config';
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
  data: {details: any[], totals: any, headers: any};
  errorData: any;
  loadTable: (params: { year: string; key: string, procname: string }) => void;
  resetTable: () => void;
};

export const useGetData = create<TableDataStore>((set, get) => ({
  ...initialState,
  loadTable: async (params: { year: string; key: string, procname: string }) => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.get(
        `${API_URL}/${API_STATISTICS_PATH}/?${stringify({ ...params })}`
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


// table column store
type TableColumnSTore = {
  columns: object;
  setColumns: (items: string[]) => void
}

export const useTableColumnStore = create<TableColumnSTore>((set) => ({
  columns: [],
  setColumns: (items: object) => set({columns: items})
}))