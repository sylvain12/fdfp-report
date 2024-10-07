"use client";

import {
  useFilterData,
  useGetData,
  useTableColumnStore,
} from "@/store/table-data.store";
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  buildPagination,
  resetPageURL,
  injectCurrentPage,
  currencyFormatter,
} from "@/lib/utils";
import clsx from "clsx";
import { itemToShowCount } from "./report-table-filters-actions";
import Image from "next/image";
import ReportTableFiltersActions from "./report-table-filters-actions";

export default function ReportTableData() {
  const { data, loading } = useGetData();
  const { columns, setColumns } = useTableColumnStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { filterData, setFilterData } = useFilterData();

  useEffect(() => {
    if (data === null) {
      resetPageURL(searchParams, pathname, replace);
      setFilterData(0, [], currentPage);
    } else {
      let { totalPages, pageData } = buildPagination(
        data.details,
        itemToShowCount.value
      );
      setColumns(Object.values(data.headers));
      setFilterData(totalPages, pageData, currentPage);
      if (totalPages > 1) {
        injectCurrentPage(searchParams, pathname, replace);
      }
    }
  }, [data, setColumns]);

  return (
    <>
      <div
        className={clsx("overflow-x-auto scrollable-table", {
          "": filterData.length !== 0,
        })}
      >
        {(data === null && loading) ||
          (data && (
            <table className="w-full text-right rtl:text-right">
              <thead className="text-[1.2rem] border-b border-t border-fdfp-light bg-fdfp-bg-thead">
                <tr>
                  <th
                    key={Object.values(columns)[0]}
                    scope="col"
                    className="px-6 py-6 text-left bg-fdfp-bg-thead"
                  >
                    {Object.values(columns)[0]}
                  </th>
                  {Object.values(columns)
                    .slice(1)
                    .map((column: string) => (
                      <th
                        key={column.trim()}
                        scope="col"
                        className="px-6 py-6 text-center bg-fdfp-bg-thead"
                      >
                        {column.trim()}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {filterData !== null &&
                  filterData.length !== 0 &&
                  filterData.map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="bg-fdfp-bg-white border-b border-fdfp-light text-[1.4rem] font-normal text-center"
                    >
                      <td
                        key={item[Object.keys(item)[0].trim()]}
                        className="px-6 py-5 font-bold text-left text-[1.1rem] w-[130px]"
                      >
                        <p style={{ maxWidth: "90%" }}>
                          {item[Object.keys(item)[0]]}
                        </p>
                      </td>
                      {Object.keys(item)
                        .slice(1)
                        .map((column: string) => (
                          <td key={column} className="px-6 py-5">
                            {/* {" "} */}
                            {currencyFormatter(item[column], " ")}
                          </td>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          ))}

        {data === null && !loading && (
          <div
            className={clsx(
              "bg-fdfp-bg-card border-y border-fdfp-light text-[1.5rem] font-medium py-[5rem] text-center w-full relative"
            )}
          >
            <div className="text-center flex justify-center items-center flex-col max-w-[650px] mx-auto">
              <Image
                src="/assets/no-data.svg"
                width={450}
                height={450}
                alt="Aucune information chargee"
                className="mb-[2rem]"
              />
              <p className="text-[1.65rem] mb-6 font-semibold">
                Aucune information
              </p>
              <span className="font-thin">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
                dolores quod facere quis eos nobis labore hic distinctio esse
                voluptas odio harum, doloremque pariatur eligendi reiciendis.
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="mt-[3rem]">
        <ReportTableFiltersActions />
      </div>{" "}
    </>
  );
}
