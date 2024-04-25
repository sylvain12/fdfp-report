"use client";

import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";
import * as XLSX from "xlsx";
import { filterFormValue } from "../reports/details/report-table-filters";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import ReportDataDocument from "../reports/documents/report-data-document";

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
    const ws = XLSX.utils.json_to_sheet(data);
    const fileSheetName = filterFormValue.value.year || "sheet1";

    XLSX.utils.book_append_sheet(wb, ws, fileSheetName);
    XLSX.writeFile(wb, excelFilename);
  };

  const handleExportToCSV = () => {
    const header = Object.keys(data[0]);
    console.log(header);
    const headerString = header.join(",");
    const replacer = (key: string, value: any) => value ?? "";
    const rowItems = data.map((row: any) =>
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

  return (
    <>
      {reportName !== null && (
        <div className="flex items-center justify-end h-full gap-5">
          {/* <PDFDownloadLink
            className={clsx("btn btn-icon btn-danger-transparent uppercase", {
              "pointer-events-none opacity-35": data === null,
            })}
            document={<ReportDataDocument />}
            fileName={pdfFilename}
          >
            <Icon
              icon="vscode-icons:file-type-pdf2"
              width={"24px"}
              className="w-12"
            />
            Exporter PDF
          </PDFDownloadLink> */}
          <button
            onClick={handleExportToCSV}
            className={clsx("btn btn-icon btn-danger-transparent uppercase", {
              "pointer-events-none opacity-35": data === null,
            })}
          >
            <Icon icon="iwwa:file-csv" width={"24px"} className="w-12" />
            Exporter en CSV
          </button>

          <button
            onClick={handleExportToExcel}
            className={clsx("btn btn-icon btn-success-transparent uppercase", {
              "pointer-events-none opacity-35": data === null,
            })}
          >
            <Icon
              icon="vscode-icons:file-type-excel2"
              width={"24px"}
              className="w-12"
            />
            Exporter en excel
          </button>
        </div>
      )}
    </>
  );
}
