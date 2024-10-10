"use client"

import { yearFilterList } from '@/lib/constant';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";

import { useDashboardAgreedProductsStore, useDashboardSelectedYear, useDashboardTrainngPlanStore } from './store';
import { useEffect } from 'react';
import { SelectLabel } from '@radix-ui/react-select';
import {useServerActionQuery, useServerActionMutation} from '@/lib/hooks/server-action-hooks'
import {
  DashBoardAgreedProductsAction,
  DashboardTrainingPlanAction,
  DashboardDataAction,
} from "./actions";
import { useDebounce } from 'use-debounce';


export default function DashboardHeader() {

  const setDashboardYear = useDashboardSelectedYear(
    (state) => state.setDashboardYear
  );
  const year = useDashboardSelectedYear(state => state.year)
 const setAgreedProducts = useDashboardAgreedProductsStore(
   (state) => state.setAgreedProducts
 );
 const setAgreedProductsLoading = useDashboardAgreedProductsStore(state => state.setLoading)
 const debouncedYear = useDebounce(year, 300)

// const setTrainingPlan = useDashboardTrainngPlanStore((state) => state.setTrainingPlan);
// const setTrainingPlanLoading = useDashboardTrainngPlanStore((state) => state.setLoading);

// Agreed Products Query
const {isLoading: isAgreedProductsLoading, data: agreedProductsData} = useServerActionQuery(
  DashBoardAgreedProductsAction,
  { input: { year: year }, queryKey: [debouncedYear]}
);

const mutation = useServerActionMutation(DashBoardAgreedProductsAction, {
  onSuccess: (data) => {
    setAgreedProducts(data);
    setAgreedProductsLoading(false);
  },
  onMutate: (variables) => {
  }
});

// Training Plan Qurey
// const {isLoading: isTrainingPlanDataLoading, data: trainingPlanData } = useServerActionQuery(DashboardTrainingPlanAction,
// {input: {year: year}, queryKey: [debouncedYear]}
// )

// const trainingPlanMutain = useServerActionMutation(DashboardTrainingPlanAction, {
//   onSuccess: (data) => {
//     setTrainingPlan(data);
//   }
// })

// Year change handler
const handleSubmit = (value: string): void => {
  setDashboardYear(value)
  mutation.mutate({year: value})  
  // trainingPlanMutain.mutate({year: value})
}

useEffect(() => {
  setAgreedProductsLoading(isAgreedProductsLoading);
  // setTrainingPlanLoading(isTrainingPlanDataLoading);

  if (agreedProductsData) setAgreedProducts(agreedProductsData);
  // if (trainingPlanData) setTrainingPlan(trainingPlanData);
}, [isAgreedProductsLoading, agreedProductsData]);

  return (
    <div className="flex justify-between items-center max-md:flex-col max-md:items-start">
      <div className="mb-6 tablet:mb-0">
        <h1 className="font-normal text-[3.5rem] text-fdfp-main font-clash-display">
          Tableau de bord
        </h1>
      </div>
      <Select onValueChange={(e) => handleSubmit(e)} defaultValue={year}>
        <SelectTrigger className="w-[180px] max-md:w-full">
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
