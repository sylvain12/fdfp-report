"use client";

import Pagination from "@/components/pagination";
import { buildPagination, resetPageURL, injectCurrentPage } from "@/lib/utils";
import { usePaginationStore } from "@/store/pagination.store";
import {
  useFilterData,
  useGetData,
  useTableColumnStore,
} from "@/store/table-data.store";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { signal } from "@preact/signals";
import { itemToShowList, yearFilterList } from "@/lib/constant";
import Actions from "@/components/actions/actions";
import { TTableFilterStoreStore } from "@/store/report.store";
import Image from "next/image";

type TReportTableFilter = {
  tables: TTableFilterStoreStore[];
};

type Inputs = {
  year: string;
  key: string;
};

const schema = z
  .object({
    year: z.string(),
    key: z.string(),
  })
  .required();

export const filterFormValue = signal<{ year: string; table: string }>({
  year: "",
  table: "",
});

export const itemToShowCount = signal<number>(10);

export default function ReportTablesFilters({ tables }: TReportTableFilter) {
  const { data, loadTable, loading } = useGetData();
  const { currentPage, updatePage } = usePaginationStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { totalPagination, setFilterData } = useFilterData();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const formRef = useRef<HTMLFormElement>(null);
  const tableSelectInput =
    formRef.current !== null ? (formRef.current![1] as HTMLSelectElement) : "";
  const yearSelectedInput =
    formRef.current !== null ? (formRef.current![0] as HTMLSelectElement) : "";
  filterFormValue.value = {
    year: yearSelectedInput !== "" ? yearSelectedInput.value : "",
    table:
      tableSelectInput !== ""
        ? tableSelectInput.options[tableSelectInput.selectedIndex].text
        : "fdfp-export",
  };

  const onSubmit: SubmitHandler<Inputs> = (formValue) => {
    resetPageURL(searchParams, pathname, replace);
    updatePage(1);
    if (formValue.key !== "" && formValue.year !== "") {
      const [key, procname] = formValue.key.split("-");
      const params = { ...formValue, key, procname };
      loadTable({ ...params });
      filterFormValue.value = {
        ...formValue,
        table:
          tableSelectInput !== ""
            ? tableSelectInput.options[tableSelectInput.selectedIndex].text
            : "fdfp-export",
      };
    }
  };

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

  const isDisabled = () => watch("key") === "" || watch("year") === "";

  return (
    <div className="flex items-end justify-end gap-[1rem] bg-transparent mt-[3rem] px-0 pb-10 border-b-none">
      <form
        ref={formRef}
        className="flex items-end text-[1.3rem] gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="year" className="block font-medium">
            Années
          </label>
          <select
            {...register("year")}
            name="year"
            id="year"
            className={clsx("input-select")}
          >
            <option defaultValue=""></option>
            {yearFilterList
              .sort((a, b) => b - a)
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="key" className="block font-medium">
            Tables
          </label>
          <select
            {...register("key")}
            name="key"
            id="key"
            className="w-[450px] input-select"
            disabled={tables == undefined}
          >
            <option defaultValue=""></option>
            {tables
              .sort((a, b) =>
                a.entitylabel
                  .toLowerCase()
                  .localeCompare(b.entitylabel.toLowerCase())
              )
              .map((table) => (
                <option
                  key={table.entity}
                  value={table.entity + "-" + table.procname}
                >
                  {table.entitylabel}
                </option>
              ))}
          </select>
        </div>
        <button
          disabled={isDisabled() || loading}
          type="submit"
          className="btn btn-icon btn-main btn-main uppercase"
        >
          Envoyer
          <ArrowPathIcon className="w-8" />
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center ml-4">
          <Image
            src="/assets/data-loader.gif"
            width={32}
            height={32}
            alt="Aucune information chargee"
          />
        </div>
      )}

      <div className="flex-1 mr-0 flex items-end justify-end gap-[2rem]">
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
        <Actions />
      </div>
    </div>
  );
}
