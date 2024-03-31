"use client";

import { useGetData } from "@/store/table-data.store";
import { TTReportTableData } from "../../report.model";
import { useEffect } from "react";

export default function ReportTableData({ columns }: TTReportTableData) {
  const { data, loading } = useGetData();

  return (
    <div className="relative overflow-x-auto ">
      <table className="w-full text-right rtl:text-right">
        <thead className="text-[1.2rem] bg-white border-b border-fdfp-light">
          <tr>
            <th key={columns[0]} scope="col" className="px-6 py-6 text-left">
              {columns[0]}
            </th>
            {columns.slice(1).map((column) => (
              <th key={column} scope="col" className="px-6 py-6 text-center">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data !== null ? (
            data.map((item: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b text-[1.5rem] font-thin text-center"
              >
                <td
                  key={item[Object.keys(item)[0].trim()]}
                  className="px-6 py-8 font-bold whitespace-nowrap text-left text-[1.1rem]"
                >
                  {item[Object.keys(item)[0]]}
                </td>
                {columns.slice(1).map((column: string) => (
                  <td key={column} className="px-6 py-8">
                    {" "}
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <td></td>
          )}
        </tbody>
      </table>
      {data === null && loading ? (
        <div className="bg-white border-b text-[1.5rem] font-medium py-[5rem] text-center w-full">
          Chargement...
        </div>
      ) : (
        ""
      )}
      {data === null && !loading ? (
        <div className="bg-white border-b text-[1.5rem] font-medium py-[5rem] text-center w-full">
          Aucune information chargée
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
