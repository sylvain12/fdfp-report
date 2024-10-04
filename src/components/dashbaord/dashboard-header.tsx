"use client"

import { yearFilterList } from '@/lib/constant';
import DashboardViewMenu from "./dashboard-view-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDashboardAgreedProductsStore, useDashboardSelectedYear } from './store';
import { API_DASHBOARD_AGREED_PRODUCT_PATH, API_URL } from '@/lib/config';
import { stringify } from 'querystring';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DasbboardAgreedProductsDataType } from './model';
import { FormEvent, useEffect } from 'react';
import { SelectLabel } from '@radix-ui/react-select';
import {useServerActionQuery, useServerActionMutation} from '@/lib/hooks/server-action-hooks'
import { DashBoardAgreedProductsAction } from "./actions";
import { useDebounce } from 'use-debounce';


export default function DashboardHeader() {

  const setDashboardYear = useDashboardSelectedYear(
    (state) => state.setDashboardYear
  );
  const year = useDashboardSelectedYear(state => state.year)
 const setAgreedProducts = useDashboardAgreedProductsStore(
   (state) => state.setAgreedProducts
 );
 const debouncedYear = useDebounce(year, 0)


const { isLoading, data } = useServerActionQuery(
  DashBoardAgreedProductsAction,
  { input: { year: year }, queryKey: [debouncedYear] }
);

console.log(isLoading);

const mutation = useServerActionMutation(DashBoardAgreedProductsAction, {
  onSuccess: (data) => {
    setAgreedProducts(data)
  },
});

  const handleSubmit = (value: string) => {
    setDashboardYear(value)
    mutation.mutate({year: value})
  }

  useEffect(() => {
    if (data) {
      setAgreedProducts(data);
    }
  }, [data]);

  return (
    <div className="flex gap-10 items-center font-clash-display">
      <div className="mb-6 tablet:mb-0">
        <h1 className="font-normal text-[3.5rem] text-fdfp-main font-clash-display">
          Tableau de bord
        </h1>
      </div>
      <Select onValueChange={(e) => handleSubmit(e)} defaultValue={year}>
        <SelectTrigger className="w-[180px]">
          <SelectValue defaultValue={year} placeholder="Selctioner la data" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Annee</SelectLabel>
            {yearFilterList.map((item) => (
              <SelectItem
                defaultValue={year}
                key={item}
                value={item.toString()}
              >
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* <Select>
        <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Selctioner la data" />
        </SelectTrigger>
        </FormControl>
        <SelectContent>
          {yearFilterList.map((year) => (
            <SelectItem
              defaultValue={"2021"}
              key={year}
              value={year.toString()}
              onChange={form.handleSubmit(onSubmit)}
            >
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> */}
      {/* <Form {...form}>
        <form
          className="space-y-6 w-[180px]"
        >
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annee</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selctioner la data" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {yearFilterList.map((year) => (
                      <SelectItem
                        defaultValue={"2021"}
                        key={year}
                        value={year.toString()}
                        onChange={form.handleSubmit(onSubmit)}
                      >
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </form>
      </Form> */}
    </div>
  );
}
