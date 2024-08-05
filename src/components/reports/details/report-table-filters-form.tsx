import { resetPageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { usePaginationStore } from "@/store/pagination.store";
import { useGetData } from "@/store/table-data.store";
import { signal } from "@preact/signals";
import { itemToShowList, yearFilterList } from "@/lib/constant";
import Image from "next/image";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  TTableFilterStoreStore,
  useTableFilterStore,
} from "@/store/report.store";

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

export default function ReportTableFiltersForm() {
  const { data, loadTable, loading } = useGetData();
  const searchParams = useSearchParams();
  const { currentPage, updatePage } = usePaginationStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { tables, setTables } = useTableFilterStore();

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

  const isDisabled = () => watch("key") === "" || watch("year") === "";

  return (
    <form
      ref={formRef}
      className="flex items-end text-[1.3rem] gap-4 flex-1 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="">
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
      <div className="flex-[2]">
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

      {loading && (
        <div className="flex justify-center items-center">
          <Image
            src="/assets/data-loader.gif"
            width={46}
            height={46}
            alt="Aucune information chargee"
          />
        </div>
      )}
    </form>
  );
}
