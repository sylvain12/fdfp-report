"use client";

import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import { filterFormValue } from "../reports/details/report-table-filters-form";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


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
        <div className="relative flex items-center justify-end h-full gap-5">
  <DropdownMenu>
    <DropdownMenuTrigger  className={clsx(
                  "btn btn-icon btn-main-transparent uppercase h-full w-[140px] max-md:w-[70px]",
                  {
                    "pointer-events-none opacity-35": data === null,
                  }
                )}>
 <Icon
                  className="export-menu-button-icon-left size-10"
                  icon="iconoir:database-export"
                />
                <span className="max-md:hidden inline-block">Exporter</span>
    <Icon
                  className="export-menu-button-icon-right"
                  icon="line-md:chevron-small-down"
                  width="18px"
                /></DropdownMenuTrigger>
    <DropdownMenuContent className='w-[140px] max-md:w-[50px]'>
        <DropdownMenuItem className='text-green-700 cursor-pointer flex items-center gap-4' onClick={handleExportToCSV}>
<Icon
                    icon="vscode-icons:file-type-excel2"
                    width={"32px"}
                    className="w-[50px]"
                  />
                  <span className="max-md:hidden inline-block">EXCEL</span></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-red-600 cursor-pointer flex items-center gap-4' onClick={handleExportToCSV}><Icon
                    icon="iwwa:file-csv"
                    width={"32px"}
                    className="text-red-600"
                  />
                  <span className="max-md:hidden inline-block">CSV</span></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

        </div>
      )}
    </>
  );
}
