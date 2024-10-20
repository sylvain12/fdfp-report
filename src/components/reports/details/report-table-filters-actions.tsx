"use client";

import { buildPagination, resetPageURL, injectCurrentPage } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { itemToShowList } from "@/lib/constant";
import Pagination from "@/components/pagination";
import Actions from "@/components/actions/actions";
import { useFilterData, useGetData } from "@/store/table-data.store";
import { usePaginationStore } from "@/store/pagination.store";
import clsx from "clsx";
import { ChangeEvent } from "react";
import { signal } from "@preact/signals";

export const itemToShowCount = signal<number>(10);

export default function ReportTableFiltersActions() {
  const data = useGetData(state => state.data);
  const { setFilterData, totalPagination } = useFilterData();
  const { currentPage, updatePage } = usePaginationStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleItemCountChange = (size: number) => {
    const { totalPages, pageData } = buildPagination(data.details, size);

    itemToShowCount.value = size;
    resetPageURL(searchParams, pathname, replace);
    updatePage(1);

    if (currentPage > 1) {
      setFilterData(totalPages, pageData, 1);
      injectCurrentPage(searchParams, pathname, replace);
    } else {
      setFilterData(totalPages, pageData, currentPage);
    }
  };

  return (
    <div className="flex-1 mr-0 flex items-end justify-between gap-[2rem] w-full lg:justify-end">
      <form>
        <div className="flex items-center gap-4 text-fdfp-second mr-[1rem]">
          <label htmlFor="itemsCount" className="block font-medium">
            Affiché
          </label>
          <select
            defaultValue={itemToShowCount.value}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              handleItemCountChange(Number(event.target.value))
            }
            name="itemsCount"
            id="itemsCount"
            className={clsx(
              "border border-fdfp-second text-[1.4rem] px-2 py-[0.725em] focus:outline-none hover:outline-none active:outline-none bg-transparent"
            )}
          >
            {itemToShowList.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>
      {data !== null && totalPagination > 1 && (
        <Pagination totalPages={totalPagination} />
      )}
      <div className="text-right">
        <Actions />
      </div>
    </div>
  );
}
