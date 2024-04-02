import {
  IDataRefundsAndSettlements,
  TTReportTableData,
} from "@/components/navbar/report.model";
import axios, { ParamsSerializerOptions } from "axios";
import { config } from "process";
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
