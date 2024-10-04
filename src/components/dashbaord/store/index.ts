import {create} from 'zustand'
import { DasbboardAgreedProductsDataType } from '../model';

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
