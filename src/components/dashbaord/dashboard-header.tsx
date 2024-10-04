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
 const setLoading = useDashboardAgreedProductsStore(state => state.setLoading)
 const debouncedYear = useDebounce(year, 0)


const { isLoading, data } = useServerActionQuery(
  DashBoardAgreedProductsAction,
  { input: { year: year }, queryKey: [debouncedYear] }
);


const mutation = useServerActionMutation(DashBoardAgreedProductsAction, {
  onSuccess: (data) => {
    setAgreedProducts(data)
  },
  onMutate(variables) {
  },
});

  const handleSubmit = (value: string) => {
    setDashboardYear(value)
    mutation.mutate({year: value})
  }

  useEffect(() => {
    setLoading(isLoading)
    if (data) {
      setAgreedProducts(data);
    }
console.log(isLoading)
  }, [data, isLoading]);

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
    </div>
  );
}
