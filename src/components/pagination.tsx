"use client";

import { usePaginationStore } from "@/store/pagination.store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useFilterData, useGetData } from "@/store/table-data.store";
import { buildPagination } from "@/lib/utils";
import { itemToShowCount } from "@/components/reports/details/report-table-filters-actions";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { currentPage, updatePage } = usePaginationStore();
  const { setFilterData, totalPagination } = useFilterData();
  const { data } = useGetData();

  // const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // const handlePaginate = useDebouncedCallback((event: MouseEvent) => {
  //   const page = (event.target as HTMLAnchorElement).dataset.page || 1;
  //   replace(createPageURL(page));
  //   updatePage(Number(page));
  // }, 300);

  const handleNextPage = useDebouncedCallback((event: MouseEvent) => {
    const nextPage = currentPage + 1;
    replace(createPageURL(nextPage));
    updatePage(nextPage);
    let { pageData } = buildPagination(data.details, itemToShowCount.value);
    setFilterData(totalPages, pageData, nextPage);
  }, 300);

  const handlePrevPage = useDebouncedCallback((event: MouseEvent) => {
    const prevPage = currentPage - 1;
    replace(createPageURL(prevPage));
    updatePage(prevPage);
    let { pageData } = buildPagination(data.details, itemToShowCount.value);
    setFilterData(totalPages, pageData, prevPage);
  }, 300);

  const handleFirstPage = useDebouncedCallback((event: MouseEvent) => {
    replace(createPageURL(1));
    updatePage(1);
    let { pageData } = buildPagination(data.details, itemToShowCount.value);
    setFilterData(totalPages, pageData, 1);
  }, 300);

  const handleLastPage = useDebouncedCallback((event: MouseEvent) => {
    replace(createPageURL(totalPages));
    updatePage(totalPages);
    let { pageData } = buildPagination(data.details, itemToShowCount.value);
    setFilterData(totalPages, pageData, totalPages);
  }, 300);

  let nextPage = currentPage + 1 > totalPages ? currentPage : currentPage + 1;
  let prevPage = currentPage - 1 < 1 ? currentPage : currentPage - 1;

  return (
    <div className={clsx("flex justify-center items-center gap-4", {})}>
      <div className="font-bold text-[1.4rem] uppercase text-fdfp-second">
        page {data ? currentPage : "-"} / {data ? totalPages : "-"}
      </div>
      <nav>
        <ul className="inline-flex -space-x-px text-base h-[35px]">
          <li>
            <a
              onClick={(event) => handleFirstPage(event)}
              data-page={prevPage}
              aria-disabled={currentPage <= totalPages}
              href="#"
              className={clsx(
                "flex items-center justify-center px-4 py-[0.725em] bg-transparent border border-fdfp-second hover:bg-fdfp-bg-pagination hover:text-gray-700",
                {
                  "pointer-events-none cursor-default opacity-45":
                    currentPage <= 1 || totalPages < 3,
                }
              )}
            >
              <ChevronDoubleLeftIcon className="w-12 text-fdfp-second" />
            </a>
          </li>
          <li>
            <a
              onClick={(event) => handlePrevPage(event)}
              data-page={prevPage}
              aria-disabled={currentPage <= totalPages}
              href="#"
              className={clsx(
                "flex items-center justify-center px-4 py-[0.725em] bg-transparent border border-fdfp-second hover:bg-fdfp-bg-pagination hover:text-gray-700",
                {
                  "pointer-events-none cursor-default opacity-45":
                    currentPage <= 1,
                }
              )}
            >
              <ChevronLeftIcon className="w-12 text-fdfp-second" />
            </a>
          </li>
          {/* {pages.map((page) => (
            <li key={page}>
              <a
                aria-current={page === currentPage}
                onClick={(event) => handlePaginate(event)}
                data-page={page}
                href="#"
                className="flex items-center justify-center px-4 h-full bg-white border border-fdfp-main hover:bg-gray-100 hover:text-gray-700 "
              >
                {page}
              </a>
            </li>
          ))} */}

          <li>
            <a
              onClick={(event) => handleNextPage(event)}
              data-page={nextPage}
              aria-disabled={currentPage >= totalPages}
              href="#"
              className={clsx(
                "flex items-center justify-center px-4 py-[0.725em] bg-transparent border border-fdfp-second hover:bg-fdfp-bg-pagination hover:text-gray-700",
                {
                  "pointer-events-none cursor-default opacity-45":
                    currentPage >= totalPages,
                }
              )}
            >
              <ChevronRightIcon className="w-12 text-fdfp-second" />
            </a>
          </li>
          <li>
            <a
              onClick={(event) => handleLastPage(event)}
              data-page={nextPage}
              aria-disabled={currentPage >= totalPages}
              href="#"
              className={clsx(
                "flex items-center justify-center px-4 py-[0.725em] bg-transparent border border-fdfp-second hover:bg-fdfp-bg-pagination hover:text-gray-700",
                {
                  "pointer-events-none cursor-default opacity-45":
                    currentPage >= totalPages || totalPages < 3,
                }
              )}
            >
              <ChevronDoubleRightIcon className="w-12 text-fdfp-second" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
