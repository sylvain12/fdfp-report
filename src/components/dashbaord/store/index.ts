import {create} from 'zustand'
import { DasbboardAgreedProductsDataType, DashbordDataType } from '../model';

type State = {
  year: string;
}

type Action = {
  setDashboardYear: (year: string) => void;
}

export const useDashboardSelectedYear = create<State & Action>((set) => ({
  year: "2021",
  setDashboardYear: (year: string) => set(() => ({year: year}))
}))


type AgreedProductState = {
  approvedProducts: DasbboardAgreedProductsDataType[];
  isDataLoading: boolean,
}

type AgreedProductAction = {
  setAgreedProducts: (products: DasbboardAgreedProductsDataType[]) => void;
  setLoading: (loading: boolean) => void
}

export const useDashboardAgreedProductsStore = create<
  AgreedProductState & AgreedProductAction
>((set) => ({
  approvedProducts: [],
  isDataLoading: false,
  setAgreedProducts: (products: DasbboardAgreedProductsDataType[]) =>
    set(() => ({ approvedProducts: products })),
  setLoading: (loading: boolean) => set(() => ({ isDataLoading: loading })),
}));


type DashboardDataState = {
  dashboardData: DashbordDataType[];
  isLoading: boolean;
};

type TrainingPlanAction = {
  setTrainingPlan: (products: DashbordDataType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDashboardTrainngPlanStore = create<DashboardDataState & TrainingPlanAction>(
  (set) => ({
    dashboardData: [],
    isLoading: false,
    setTrainingPlan: (products: DashbordDataType[]) =>
      set(() => ({ dashboardData: products })),
    setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
  })
);
