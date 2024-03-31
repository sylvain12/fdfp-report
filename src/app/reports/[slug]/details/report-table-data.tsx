"use client";

import { useGetData } from "@/store/table-data.store";
import { TTReportTableData } from "../../report.model";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { buildPagination } from "@/lib/utils";

export default function ReportTableData({ columns }: TTReportTableData) {
  const { data, loading } = useGetData();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const resetPageURL = () => {
    const params = new URLSearchParams(searchParams);
    if (params.get("page")) {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (data === null) {
      resetPageURL();
    }
  }, []);

  const pagination = buildPagination(data);
  const filteredData = pagination.pageData
    ? pagination.pageData[currentPage - 1]
    : null;

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
          <Suspense fallback={<h2>Loading...</h2>}>
            {filteredData !== null ? (
              filteredData.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b text-[1.5rem] font-thin text-center"
                >
                  <td
                    key={item[Object.keys(item)[0].trim()]}
                    className="px-6 py-8 font-bold text-left text-[1.1rem] w-[130px]"
                  >
                    <p style={{ maxWidth: "90%" }}>
                      {item[Object.keys(item)[0]]}
                    </p>
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
          </Suspense>
        </tbody>
      </table>
      {/* {filteredData !== null ? <Pagination totalPages={totalPages} /> : ""} */}

      {filteredData === null && loading ? (
        <div className="bg-white border-b text-[1.5rem] font-medium py-[5rem] text-center w-full">
          Chargement...
        </div>
      ) : (
        ""
      )}
      {filteredData === null && !loading ? (
        <div className="bg-white border-b text-[1.5rem] font-medium py-[5rem] text-center w-full">
          Aucune information chargée
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
