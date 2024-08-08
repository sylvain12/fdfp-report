"use client";

import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import { filterFormValue } from "../reports/details/report-table-filters-form";
import { useRef } from "react";

export default function ActionLink() {
  const { data } = useGetData();
  const searchParam = useSearchParams();
  const reportName = searchParam.get("name");
  const today = new Date();
  const formattedDay =
    today.getDay() < 10 ? `0${today.getDay()}` : today.getDay();
  const formattedMonths =
    today.getMonth() < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const formattedDate = `${formattedDay}-${formattedMonths}-${today.getFullYear()}`;
  const excelFilename = `${
    filterFormValue.value.table?.replaceAll(" ", "_") || "fdfp-export"
  }_${formattedDate}.xlsx`;
  const csvFilename = `${
    filterFormValue.value.table?.replaceAll(" ", "_") || "fdfp-export"
  }_${formattedDate}.csv`;

  const pdfFilename = `${
    filterFormValue.value.table?.replaceAll(" ", "_") || "fdfp-export"
  }_${filterFormValue.value.year}_${formattedDate}`;

  const handleExportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data.details);
    const fileSheetName = filterFormValue.value.year || "sheet1";

    XLSX.utils.book_append_sheet(wb, ws, fileSheetName);
    XLSX.writeFile(wb, excelFilename);
  };

  const handleExportToCSV = () => {
    const header = Object.keys(data.details[0]);
    const headerString = header.join(",");
    const replacer = (key: string, value: any) => value ?? "";
    const rowItems = data.details.map((row: any) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    const csv = [headerString, ...rowItems].join("\r\n");
    const csvContent = `data:text/csv;charset=utf-8,${csv}`;
    const encodedURI = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedURI);
    link.setAttribute("download", csvFilename);
    document.body.appendChild(link);
    link.click();
  };

  const exportRef = useRef<HTMLDivElement>(null);

  const handleDisplayExport = () => {
    exportRef.current?.classList.toggle("hidden");
    exportRef.current?.classList.add("block");
  };

  const handleHideDropdownMenu = () => {
    if (!exportRef.current?.classList.contains("hidden")) {
      exportRef.current?.classList.add("hidden");
    }
  };

  if (typeof window !== "undefined") {
    window.onclick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.matches("#export-menu-button") &&
        !target.matches(".export-menu-button-icon-left") &&
        !target.matches(".export-menu-button-icon-right") &&
        !exportRef.current?.classList.contains("hidden")
      ) {
        exportRef.current?.classList.add("hidden");
      }
    };
  }

  return (
    <>
      {reportName !== null && (
        <div className="flex items-center justify-end h-full gap-5">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={handleDisplayExport}
                className={clsx(
                  "btn btn-icon btn-main-transparent uppercase h-full",
                  {
                    "pointer-events-none opacity-35": data === null,
                  }
                )}
                id="export-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <Icon
                  className="export-menu-button-icon-left"
                  icon="iconoir:database-export"
                  width="22px"
                />
                <span className="max-md:hidden inline-block">Export en</span>
                <Icon
                  className="export-menu-button-icon-right"
                  icon="line-md:chevron-small-down"
                  width="18px"
                />
              </button>
            </div>

            <div
              ref={exportRef}
              className="absolute right-0 z-10 mt-2 origin-top-right bg-fdfp-bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-full hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="" role="none">
                <button
                  onClick={handleExportToExcel}
                  className={clsx(
                    "px-4 py-2 text-[1.8rem] w-full font-normal flex items-center gap-4 border-b border-fdfp-light text-green-700 hover:bg-fdfp-bg-thead max-[1251px]:justify-center",
                    { "pointer-events-none opacity-35": data === null }
                  )}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-1"
                >
                  <Icon
                    icon="vscode-icons:file-type-excel2"
                    width={"22px"}
                    className="w-12"
                  />
                  <span className="max-md:hidden inline-block">EXCEL</span>
                </button>
                <button
                  onClick={handleExportToCSV}
                  className={clsx(
                    "px-4 py-2 text-[1.8rem] w-full font-normal flex items-center gap-4 text-red-600 hover:bg-fdfp-bg-thead max-[1251px]:justify-center",
                    { "pointer-events-none opacity-35": data === null }
                  )}
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-2"
                >
                  <Icon
                    icon="iwwa:file-csv"
                    width={"32px"}
                    className="w-12 text-red-600"
                  />
                  <span className="max-md:hidden inline-block">CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
