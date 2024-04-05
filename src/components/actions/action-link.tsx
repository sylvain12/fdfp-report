"use client";

import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import { filterFormValue } from "../reports/details/report-table-filters";

export default function ActionLink() {
  const { data } = useGetData();
  const searchParam = useSearchParams();

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    const today = new Date();
    const formattedDay =
      today.getDay() < 10 ? `0${today.getDay()}` : today.getDay();
    const formattedMonths =
      today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const formattedDate = `${formattedDay}-${formattedMonths}-${today.getFullYear()}`;
    const fileSheetName = filterFormValue.value.year || "sheet1";
    const filename = `${
      filterFormValue.value.table?.replaceAll(" ", "_") || "fdfp-export"
    }_${formattedDate}.xlsx`;

    XLSX.utils.book_append_sheet(wb, ws, fileSheetName);
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="flex items-center justify-end h-full gap-10">
      <button
        onClick={handleExportToExcel}
        className={clsx("btn btn-icon btn-main-transparent uppercase", {
          "pointer-events-none opacity-35": data === null,
        })}
      >
        <Icon
          icon="vscode-icons:file-type-excel"
          width={"24px"}
          className="w-12"
        />
        Exporter excel
      </button>
    </div>
  );
}
