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
}

type AgreedProductAction = {
  setAgreedProducts: (products: DasbboardAgreedProductsDataType[]) => void;
}

export const useDashboardAgreedProductsStore = create<AgreedProductState & AgreedProductAction>((set) => ({
  approvedProducts: [],
  setAgreedProducts: (products: DasbboardAgreedProductsDataType[]) => set(() => ({approvedProducts: products}))
}))
