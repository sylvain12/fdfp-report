"use client";

import { useFilterData, useGetData } from "@/store/table-data.store";
import clsx from "clsx";
import React, { FormEvent, useRef } from "react";
import {
  buildPagination,
  getReportEntityName,
  injectCurrentPage,
} from "../../lib/utils";
import { itemToShowCount } from "./details/report-table-filters";
import { usePaginationStore } from "@/store/pagination.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Icon } from "@iconify/react";

export default function ReportSearch() {
  const { data } = useGetData();
  const { setFilterData } = useFilterData();
  const { currentPage, updatePage } = usePaginationStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const updateFilterData = useDebouncedCallback(
    (items: any[]) => {
      if (items.length !== 0) {
        const { totalPages, pageData } = buildPagination(items, 25);
        updatePage(1);
        setFilterData(totalPages, pageData, 1);
        injectCurrentPage(searchParams, pathname, replace);
      } else {
        const { totalPages, pageData } = buildPagination(
          data,
          itemToShowCount.value
        );
        setFilterData(totalPages, pageData, currentPage);
      }
    },
    300,
    { trailing: true }
  );

  const handleSearchByEntity = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    let filterData: any[] = [];

    if (target.value !== "") {
      filterData = data.filter((item: any) => {
        for (const property in item) {
          const entity = getReportEntityName(item[property]);
          if (entity.toLowerCase().includes(target.value.toLowerCase())) {
            return item;
          }
        }
      });
    }
    updateFilterData(filterData);
  };

  const handleClearSearchText = useDebouncedCallback(() => {
    if (searchRef.current?.value) {
      searchRef.current.value = "";
    }
  }, 100);

  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        ref={searchRef}
        onInput={(e) => handleSearchByEntity(e)}
        name="entity"
        className={clsx(
          "w-[425px] border border-fdfp-text text-[1.5rem] px-4 py-[0.725em] focus:outline-none hover:outline-none active:outline-none bg-transparent font-normal",
          {
            "opacity-25 pointer-events-none": data === null,
          }
        )}
        type="text"
        placeholder="Recherche par l'entitie"
      />
      {/* <Icon
        onClick={handleClearSearchText}
        className={clsx(
          "absolute right-6 top-[50%] -translate-y-1/2 cursor-pointer",
          {
            hidden: searchRef.current?.value === "",
          }
        )}
        icon="uil:times"
      /> */}
    </div>
  );
}
