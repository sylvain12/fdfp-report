"use client";

import ActionLink from "@/components/actions/action-link";
import { useGetData } from "@/store/table-data.store";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

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

export default function ReportTablesFilters({ amounts }: TReportTableFilter) {
  const { data, loadTable } = useGetData();

  const {
    register,
    handleSubmit,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit: SubmitHandler<Inputs> = (formValue) => {
    if (formValue.table !== "" && formValue.year !== "") {
      loadTable("refunds.settlements", { ...formValue });
    }
  };

  const isDisabled = () => watch("table") === "" || watch("year") === "";
  return (
    <div className="flex items-end justify-end gap-[1rem] bg-white mt-[4rem] px-5 py-10 border-b">
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
            className="w-[100px] min-w-full border border-fdfp-text text-[1.4rem] px-2 py-3 focus:outline-none hover:outline-none active:outline-none bg-white"
          >
            <option defaultValue="test"></option>
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
            className="w-[450px] min-w-full border border-fdfp-text text-[1.4rem] px-2 py-3 focus:outline-none hover:outline-none active:outline-none bg-white"
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
          disabled={isDisabled()}
          type="submit"
          className="btn btn-icon btn-main-transparent btn-main uppercase"
        >
          Charger
          <ArrowPathIcon className="w-8" />
        </button>
      </form>

      <div className="flex-1 mr-0">
        <ActionLink />
      </div>
    </div>
  );
}
