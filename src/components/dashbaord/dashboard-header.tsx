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

import { useDashboardAgreedProductsStore, useDashboardSelectedYear, useDashboardTrainngPlanStore, useDashboardTrainngProjectStore, useDashboardTrainingActiontStore, useDashbaordBusinessPartnerStore } from './store';
import { useEffect } from 'react';
import { SelectLabel } from '@radix-ui/react-select';
import {useServerActionQuery, useServerActionMutation} from '@/lib/hooks/server-action-hooks'
import {
  DashBoardAgreedProductsAction,
  DashboardTrainingPlanAction,
  DashboardTrainingProjectAction,
  DashboardTrainingLiquidedAction,
loadTrainingAction,
loaddBusinessPartnerAction
} from "./actions";
import { useDebounce } from 'use-debounce';
import { useMutation, useQuery } from '@tanstack/react-query';
import { clearMap } from '@/lib/utils';


export default function DashboardHeader() {
  const setDashboardYear = useDashboardSelectedYear(
    (state) => state.setDashboardYear
  );
  const year = useDashboardSelectedYear((state) => state.year);
  const debouncedYear = useDebounce(year, 0);

  // -------------------- Store Variables ----------------------------

  // Agreed Products
  const setAgreedProducts = useDashboardAgreedProductsStore(
    (state) => state.setAgreedProducts
  );
  const setAgreedProductsLoading = useDashboardAgreedProductsStore(
    (state) => state.setLoading
  );

  // Training Plan
  const setTrainingPlan = useDashboardTrainngPlanStore(
    (state) => state.setTrainingPlan
  );
  const setTrainingPlanLoading = useDashboardTrainngPlanStore(
    (state) => state.setLoading
  );

  // Training Project
  const setTrainingProject = useDashboardTrainngProjectStore(
    (state) => state.setTrainingProject
  );
  const setTrainingProjectLoading = useDashboardTrainngProjectStore(
    (state) => state.setLoading
  );

  // Training Action
  const setTrainingAction = useDashboardTrainingActiontStore(
    (state) => state.setTrainingAction
  );
  const setTrainingActionLoading = useDashboardTrainingActiontStore(
    (state) => state.setLoading
  );

  // Business Partner
  const setBusinessPartner = useDashbaordBusinessPartnerStore(
    (state) => state.setBusinessPartner
  );
  const setBusinessPartnerLoading = useDashbaordBusinessPartnerStore(
    (state) => state.setLoading
  );

  // --------------------- API Query -----------------------------

  // Agreed Products Query
  const { isLoading: isAgreedProductsLoading, data: agreedProductsData } =
    useServerActionQuery(DashBoardAgreedProductsAction, {
      input: { year: year },
      queryKey: ["agreedProducts", debouncedYear],
      // enabled: !!debouncedYear,
    });

  const mutation = useServerActionMutation(DashBoardAgreedProductsAction, {
    onSuccess: (data) => {
      setAgreedProducts(data);
    },
  });

  // Training Plan Quey
  const { isLoading: isTrainingPlanLoading, data: trainingPlanData } =
    useServerActionQuery(DashboardTrainingPlanAction, {
      input: { year: year },
      queryKey: ["trainingPlan", debouncedYear],
      enabled: !!debouncedYear,
    });

  const trainingPlanMutation = useServerActionMutation(
    DashboardTrainingPlanAction,
    {
      onSuccess: (data) => {
        setTrainingPlan(data);
      },
    }
  );

  // Training Project Query
  const { isLoading: isTrainingProjectLoading, data: trainingProjectData } =
    useServerActionQuery(DashboardTrainingProjectAction, {
      input: { year: year },
      queryKey: ["trainingProject", debouncedYear],
      enabled: !!debouncedYear,
    });

  const trainingProjectMutation = useServerActionMutation(
    DashboardTrainingPlanAction,
    {
      onSuccess: (data) => {
        setTrainingPlan(data);
      },
    }
  );

  // Training Action Liquided Query
  const {
    isLoading: isTrainingActionLiquidedLoading,
    data: trainingActionLiquidedData,
  } = useQuery({
    queryKey: ["trainingActionLiquided", year],
    queryFn: async () => await loadTrainingAction(year).then((r) => r.promise),
  });

  const trainingActionLiquidedMutation = useMutation({
    mutationFn: async (year: string) =>
      await loadTrainingAction(year).then((r) => r.promise),
    onSuccess: (data) => {
      setTrainingAction(data);
    },
  });

  // Business Partner Query
  const { isLoading: isBusinessPartnerDataLoading, data: businessPartnerData } =
    useQuery({
      queryKey: ["busnessPartner", year],
      queryFn: async () =>
        await loaddBusinessPartnerAction(year).then((r) => r.promise),
    });

  const businessPartnerMutation = useMutation({
    mutationFn: async (year: string) =>
      await loaddBusinessPartnerAction(year).then((r) => r.promise),
    onSuccess: (data) => {
      setBusinessPartner(data);
    },
  });

  // Year change handler
  const handleSubmit = (value: string): void => {
    // clearMap();
    setDashboardYear(value);
    mutation.mutate({ year: value });
    trainingPlanMutation.mutate({ year: value });
    trainingProjectMutation.mutate({ year: value });
    trainingActionLiquidedMutation.mutate(value);
    businessPartnerMutation.mutate(value);
  };

  useEffect(() => {
    setAgreedProductsLoading(isAgreedProductsLoading);
    setTrainingPlanLoading(isTrainingPlanLoading);
    setTrainingProjectLoading(isTrainingProjectLoading);
    setTrainingActionLoading(isTrainingActionLiquidedLoading);
    setBusinessPartnerLoading(isBusinessPartnerDataLoading);

    if (agreedProductsData) setAgreedProducts(agreedProductsData);
    if (trainingPlanData) setTrainingPlan(trainingPlanData);
    if (trainingProjectData) setTrainingProject(trainingProjectData);
    if (trainingActionLiquidedData)
      setTrainingAction(trainingActionLiquidedData);
    if (businessPartnerData) setBusinessPartner(businessPartnerData);
  });

// [
//     agreedProductsData,
//     trainingPlanData,
//     trainingProjectData,
//     trainingActionLiquidedData,
//     setBusinessPartner,
//     businessPartnerData,
//     isAgreedProductsLoading,
//     isTrainingPlanLoading,
//     isTrainingProjectLoading,
//     isTrainingActionLiquidedLoading,
//     isBusinessPartnerDataLoading,
//   ]

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
