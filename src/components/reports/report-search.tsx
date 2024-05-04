"use client";

import { useFilterData, useGetData } from "@/store/table-data.store";
import clsx from "clsx";
import React, { FormEvent } from "react";
import {
  buildPagination,
  getReportEntityName,
  injectCurrentPage,
} from "../../lib/utils";
import { itemToShowCount } from "./details/report-table-filters";
import { usePaginationStore } from "@/store/pagination.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function ReportSearch() {
  const { data } = useGetData();
  const { filterData, setFilterData } = useFilterData();
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

  return (
    <div>
      <input
        onInput={(e) => handleSearchByEntity(e)}
        name="entity"
        className={clsx(
          "w-[375px] border border-fdfp-text text-[1.4rem] px-2 py-[0.725em] focus:outline-none hover:outline-none active:outline-none bg-transparent",
          {}
        )}
        type="text"
        placeholder="Recherche par l'entitie"
      />
    </div>
  );
}
