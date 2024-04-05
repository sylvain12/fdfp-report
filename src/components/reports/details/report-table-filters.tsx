"use client";

import Actions from "@/components/actions/actions";
import Action from "@/components/actions/actions";
import Pagination from "@/components/pagination";
import { buildPagination } from "@/lib/utils";
import { usePaginationStore } from "@/store/pagination.store";
import { useGetData } from "@/store/table-data.store";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { signal } from "@preact/signals";

type TReportTableFilter = {
  amounts: { name: string; table: string }[];
};

type Inputs = {
  year: string;
  table: string;
};

const schema = z
  .object({
    year: z.string(),
    table: z.string(),
  })
  .required();

export const filterFormValue = signal<{ year: string; table: string }>({
  year: "",
  table: "",
});

export default function ReportTablesFilters({ amounts }: TReportTableFilter) {
  const { data, loadTable, loading } = useGetData();
  const { currentPage, updatePage } = usePaginationStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  let totalPages = 0;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const resetPageURL = () => {
    const params = new URLSearchParams(searchParams);
    if (params.get("page")) {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const setPageURL = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

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
    resetPageURL();
    updatePage(1);
    if (formValue.table !== "" && formValue.year !== "") {
      loadTable("refunds.settlements", { ...formValue });
      filterFormValue.value = {
        ...formValue,
        table:
          tableSelectInput !== ""
            ? tableSelectInput.options[tableSelectInput.selectedIndex].text
            : "fdfp-export",
      };
    }
  };

  const pagination = buildPagination(data);
  totalPages = pagination.totalPages;

  const isDisabled = () => watch("table") === "" || watch("year") === "";
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
            className={clsx(
              "w-[100px] min-w-full border border-fdfp-text text-[1.4rem] px-2 py-[0.725em] focus:outline-none hover:outline-none active:outline-none bg-transparent",
              {
                // "pointer-events-none opacity-25":
              }
            )}
          >
            <option defaultValue=""></option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
        </div>
        <div>
          <label htmlFor="table" className="block font-medium">
            Tables
          </label>
          <select
            {...register("table")}
            name="table"
            id="table"
            className="w-[450px] min-w-full border border-fdfp-text text-[1.4rem] px-2 py-[0.725em] focus:outline-none hover:outline-none active:outline-none bg-transparent"
          >
            <option defaultValue=""></option>
            {amounts.sort().map((item) => (
              <option key={item.table} value={item.table}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={isDisabled() || loading}
          type="submit"
          className="btn btn-icon btn-main-transparent btn-main uppercase"
        >
          Envoyer
          <ArrowPathIcon className="w-8" />
        </button>
      </form>

      <div className="flex-1 mr-0 flex items-end justify-end gap-[2rem]">
        {data !== null && totalPages > 1 ? (
          <Pagination totalPages={totalPages} />
        ) : (
          ""
        )}
        {/* <Pagination totalPages={1} /> */}
        {/* <Actions /> */}
      </div>
    </div>
  );
}
