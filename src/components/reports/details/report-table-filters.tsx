"use client"

import Actions from '@/components/actions/actions';
import ReportSearch from "../ui/report-search";
import ReportTableFiltersForm from "./report-table-filters-form";
import Pagination from '@/components/pagination';
import { useFilterData, useGetData } from '@/store/table-data.store';
import ReportTableFiltersActions from './report-table-filters-actions';

export default function ReportTablesFilters() {
  const data = useGetData(state => state.data);
  const totalPagination = useFilterData((state) => state.totalPagination);

  return (
    <div className="report-filter-container flex items-end justify-between gap-[10rem] bg-transparent mt-[3rem] px-0 pb-[3rem] border-b-none max-xl:flex-col max-xl:items-start max-xl:gap-[3rem]">
      <div className="flex flex-1 w-full max-xl:order-1 ">
        <ReportTableFiltersForm />
      </div>
      <div className="flex flex-1 w-full justify-end">
       <ReportTableFiltersActions />
      </div>
    </div>
  );
}
