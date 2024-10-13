import { signal } from "@preact/signals";
import { stringify } from "querystring";

import { TableNumber } from "@/components/navbar/report.model";
import { TLink } from "@/types/navigation.type";

interface TState {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: any;
  errorData: any;
}

const BASE_URL = process.env.SERVER_URLs;

export const useApplicationStore = () => {
  const initialState: TState = {
    loading: false,
    success: false,
    error: false,
    data: null,
    errorData: null,
  };
  // Navigation
  const navs = signal<TLink[]>([]);
  const updateNavs = (links: TLink[]) => (navs.value = [...links]);

  //   Dark mode
  const isDark = signal<boolean>(false);
  const toggleDarkMode = () => (isDark.value = !isDark.value);

  // table to show
  const showTable = signal<TableNumber>(3);
  const setTable = (index: TableNumber) => (showTable.value = index);

  // pagination
  const currentPage = signal<number>(1);
  const updatePage = (page: number) => (currentPage.value = page);

  // table data
  const initialTableData = signal<TState>(initialState);
  const loadTableData = async (
    path: string,
    params: { year?: string; table: string }
  ) => {
    initialTableData.value = { ...initialTableData.value, loading: true };
    try {
      const res = await fetch(
        `${BASE_URL}/${path}/?${stringify({ ...params })}`,
        {
          headers: { Content: "application/json" },
          method: "GET",
        }
      );
      initialTableData.value = {
        ...initialTableData.value,
        data: res.json(),
        success: true,
      };
    } catch (err: any) {
      initialTableData.value = {
        ...initialTableData.value,
        error: true,
        errorData: err.message,
      };
    }
  };
  const resetTable = async () => (initialTableData.value = initialState);

  return {
    navs,
    updateNavs,
    isDark,
    toggleDarkMode,
    showTable,
    setTable,
    currentPage,
    updatePage,
    initialTableData,
    loadTableData,
    resetTable,
  };
};
