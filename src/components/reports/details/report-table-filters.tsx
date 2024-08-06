// "use client";
import ReportSearch from "../ui/report-search";
import ReportTableFiltersForm from "./report-table-filters-form";

export default function ReportTablesFilters() {
  return (
    <div className="report-filter-container flex items-end justify-between gap-[10rem] bg-transparent mt-[3rem] px-0 pb-10 border-b-none max-xl:flex-col max-xl:items-start max-xl:gap-[3rem]">
      <div className="flex flex-1 w-full max-xl:order-1 ">
        <ReportTableFiltersForm />
      </div>
      <div className="flex flex-1 w-full justify-end">
        <ReportSearch />
      </div>
    </div>
  );
}
