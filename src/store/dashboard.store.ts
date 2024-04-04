import { signal } from "@preact/signals";
import { create } from "zustand";

export enum EDashboardView {
  TRAINING_PLAN = 1,
  TRAINING_ACTION,
}

// interface TDashboardViewStore {
//     number
// }

type DashboardViewStore = {
  view: EDashboardView;
  setView: (viewToShow: number) => void;
};

export const useDashboardStore = create<DashboardViewStore>((set) => ({
  view: EDashboardView.TRAINING_PLAN,
  setView: (viewToShow: number) => set({ view: viewToShow }),
}));
