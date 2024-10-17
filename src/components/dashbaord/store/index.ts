import {create} from 'zustand'
import { DasbboardAgreedProductsDataType, DashbordDataType, BusinessPartnerType } from '../model';

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

// Training plan store
type TrainingPlanAction = {
  setTrainingPlan: (data: DashbordDataType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDashboardTrainngPlanStore = create<DashboardDataState & TrainingPlanAction>(
  (set) => ({
    dashboardData: [],
    isLoading: false,
    setTrainingPlan: (data: DashbordDataType[]) =>
      set(() => ({ dashboardData: data })),
    setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
  })
);

// Training project
type TrainingProjectAction = {
  setTrainingProject: (data: DashbordDataType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDashboardTrainngProjectStore = create<
  DashboardDataState & TrainingProjectAction
>((set) => ({
  dashboardData: [],
  isLoading: false,
  setTrainingProject: (data: DashbordDataType[]) =>
    set(() => ({ dashboardData: data })),
  setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
}));

// Training Action Liquided
type TrainingActionLiquidedAction = {
  setTrainingAction: (data: DashbordDataType[]) => void;
  setLoading: (loading: boolean) => void;
};

export const useDashboardTrainingActiontStore = create<
  DashboardDataState & TrainingActionLiquidedAction
>((set) => ({
  dashboardData: [],
  isLoading: false,
  setTrainingAction: (data: DashbordDataType[]) =>
    set(() => ({ dashboardData: data })),
  setLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
}));


// Busniess Partner
type BusinessPartnerState = {
  businessPartner: BusinessPartnerType[];
  isLoading: boolean;
};

type BusinessPartnerAction = {
  setBusinessPartner: (data: BusinessPartnerType[]) => void,
  setLoading: (loading: boolean) => void;
}

export const useDashbaordBusinessPartnerStore = create<BusinessPartnerState & BusinessPartnerAction>((set) => ({
  isLoading: false,
  businessPartner: [],
  setLoading: (loading:  boolean) => set(() => ({isLoading: loading})),
  setBusinessPartner: (data: BusinessPartnerType[]) => set(() => ({businessPartner: data}))
}))