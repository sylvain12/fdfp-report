"use client";

import { useFilterData, useGetData, useTableColumnStore } from "@/store/table-data.store";
import { TTReportTableData } from "../../navbar/report.model";
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { buildPagination, resetPageURL, injectCurrentPage } from "@/lib/utils";
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { itemToShowCount } from "./report-table-filters";
import Image from 'next/image';
import { json } from 'stream/consumers';

export default function ReportTableData() {
  const { data, loading } = useGetData();
  const {columns, setColumns} = useTableColumnStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { totalPagination, filterData, setFilterData } = useFilterData();

  // paginationData.value = {
  //   ...paginationData.value,
  //   pageData:
  //     paginationData.value.pageData &&
  //     typeof data !== "string" &&
  //     paginationData.value.pageData.length > 0
  //       ? paginationData.value.pageData[currentPage - 1]
  //       : [],
  // };

  useEffect(() => {
    if (data === null) {
      resetPageURL(searchParams, pathname, replace);
      setFilterData(0, [], currentPage);
    } else {
      let { totalPages, pageData } = buildPagination(
        data.details,
        itemToShowCount.value
      );
      setColumns(Object.values(data.headers))
      console.log("slice => ", Object.values(columns).slice(1))
      setFilterData(totalPages, pageData, currentPage);
      if (totalPages > 1) {
        injectCurrentPage(searchParams, pathname, replace);
      }
    }
  }, [data, itemToShowCount, setColumns]);

  
  return (
    <div
      className={clsx("overflow-x-auto scrollable-table", {
        "": filterData.length !== 0,
      })}
    >
      {(data === null && loading) || data &&  <table className="w-full text-right rtl:text-right">
        <thead className="text-[1.2rem] bg-gray-100 border-b border-fdfp-light">
          <tr>
            <th
              key={Object.values(columns)[0]}
              scope="col"
              className="px-6 py-6 text-left bg-gray-100"
            >
              {Object.values(columns)[0]}
            </th>
            {Object.values(columns).slice(1).map((column: string) => (
              <th
                key={column.trim()}
                scope="col"
                className="px-6 py-6 text-center bg-gray-100"
              >
                {column.trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterData !== null && filterData.length !== 0 && (
            filterData.map((item: any, index: number) => (
              <tr
                key={index}
                className="bg-white border-b text-[1.5rem] font-normal text-center"
              >
                <td
                  key={item[Object.keys(item)[0].trim()]}
                  className="px-6 py-8 font-bold text-left text-[1.1rem] w-[130px]"
                >
                  <p style={{ maxWidth: "90%" }}>
                    {item[Object.keys(item)[0]]}
                  </p>
                </td>
                {Object.keys(item).slice(1).map((column: string) => (
                  <td key={column} className="px-6 py-8">
                    {/* {" "} */}
                    {item[column]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>}
      
      {/* {filteredData !== null ? <Pagination totalPages={totalPages} /> : ""} */}

      {data === null && (
        <div
          className={clsx(
            "bg-white border-fdfp-main-light text-[1.5rem] font-medium py-[5rem] text-center w-full relative"
          )}
        >
        {/* {typeof data === "string" || columns.length === 0 && !loading && ( */}
            <div className="text-center flex justify-center items-center flex-col max-w-[650px] mx-auto">
              <Image 
                src="/assets/no-data.svg"
                width={450}
                height={450}
                alt='Aucune information chargee'
                className='mb-[2rem]'
              />
              <p className='text-[1.65rem] mb-6 font-semibold'>Aucune information</p>
              <span className='font-thin'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure dolores quod facere quis eos nobis labore hic distinctio esse voluptas odio harum, doloremque pariatur eligendi reiciendis.</span>
            </div>
          {/* )} */}

          {/* {loading && (
            <div role="status" className="w-full after:animate-pulse">
                <table className='w-full'>
                  <thead className='w-full'>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <th className='h-[80px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></th>
                      <th className='h-[80px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></th>
                      <th className='h-[80px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></th>
                      <th className='h-[80px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1 mb-4'></th>
                      <th className='h-[80px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1 mb-4'></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                    <tr className='flex gap-5 w-full px-6 mb-[2rem]'>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                      <td className='h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 flex-1'></td>
                    </tr>
                </tbody>
                </table>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
