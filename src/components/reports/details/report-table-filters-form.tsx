"use client"

import { resetPageURL } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { usePaginationStore } from "@/store/pagination.store";
import { useGetData } from "@/store/table-data.store";
import { signal } from "@preact/signals";
import { yearFilterList } from "@/lib/constant";
import Image from "next/image";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTableFilterStore } from "@/store/report.store";
import {Icon} from '@iconify/react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';


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
  const loading = useGetData(state => state.loading)
  const loadTable = useGetData((state) => state.loadTable);
  const searchParams = useSearchParams();
  const updatePage = usePaginationStore(state => state.updatePage);
  const pathname = usePathname();
  const { replace } = useRouter();
  const tables = useTableFilterStore(state => state.tables)
  const isTableDataLoaing = useTableFilterStore((state) => state.isLoading);

  const form = useForm<Inputs>({ resolver: zodResolver(schema),
defaultValues: {year: '', key: ''} });

  const formRef = useRef<HTMLFormElement>(null);
  const tableSelectInput = form.watch('key')
  const yearSelectedInput = form.watch('year')
  filterFormValue.value = {
    year: yearSelectedInput !== "" ? yearSelectedInput : "",
    table:
      tableSelectInput !== ""
        ? tableSelectInput
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
            ? tableSelectInput
            : "fdfp-export",
      };
    }
  };

  const isDisabled = () => form.watch("key") === "" || form.watch("year") === "";

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="flex items-end text-[1.3rem] gap-4 flex-1 w-full max-md:flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="max-md:w-full">
              <FormLabel>Années</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={clsx("h-[38px] w-[70px] font-space-grotesk")}
                >
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  {yearFilterList
                    .sort((a, b) => b - a)
                    .map((year) => (
                      <SelectItem
                        className={clsx("font-space-grotesk")}
                        key={year}
                        value={`${year}`}
                      >
                        {year}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormLabel>Tables</FormLabel>
              <Select
                disabled={isTableDataLoaing}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger
                  name="key"
                  className="h-[38px] w-full input-select"
                >
                  <SelectValue placeholder="---" />
                </SelectTrigger>
                <SelectContent>
                  {tables
                    .sort((a, b) =>
                      a.entitylabel
                        .toLowerCase()
                        .localeCompare(b.entitylabel.toLowerCase())
                    )
                    .map((table) => (
                      <SelectItem
                        key={`${table.entity}-${table.procname}`}
                        value={table.entity + "-" + table.procname}
                      >
                        {table.entitylabel}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <button
          disabled={isDisabled() || loading}
          type="submit"
          className="btn btn-icon btn-main btn-main uppercase max-md:w-full max-md:flex max-md:justify-center max-md:mt-4"
        >
          Envoyer
          {loading && <Icon icon="svg-spinners:bars-fade" className="w-8" />}
        </button>

        {/* {loading && (
        <div className="flex justify-center items-center max-md:order-1 max-md:hidden">
          <Image
            src="/assets/data-loader.gif"
            width={30}
            height={30}
            alt="Aucune information chargee"
          />
        </div>
      )} */}
      </form>
    </Form>
  );
}
