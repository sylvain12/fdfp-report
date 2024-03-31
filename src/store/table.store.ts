import { TableNumber } from "@/app/reports/report.model";
import { create } from "zustand";

type ReportTableStore = {
  showedTable: TableNumber;
  setTable: (tableNumber: number) => void;
};

export const useTable = create<ReportTableStore>((set) => ({
  showedTable: 3,
  setTable: (index: number) => {
    set({ showedTable: index });
  },
}));
