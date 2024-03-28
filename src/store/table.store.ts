import { TableNumber } from "@/app/reports/report.model";
import { create } from "zustand";

type ReportTableStore = {
  showedTable: TableNumber;
  show: (tableNumber: number) => void;
};

export const useTable = create<ReportTableStore>((set) => ({
  showedTable: 3,
  show: (index: number) => {
    set({ showedTable: index });
  },
}));
