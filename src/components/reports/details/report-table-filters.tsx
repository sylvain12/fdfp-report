// "use client";
import ReportSearch from "../ui/report-search";
import ReportTableFiltersForm from "./report-table-filters-form";

export default function ReportTablesFilters() {
  return (
    <div className="report-filter-container flex items-end justify-end gap-[4rem] bg-transparent mt-[3rem] px-0 pb-10 border-b-none lg:flex-row lg:gap-[20rem] max-[1271px]:flex-col max-[1271px]:gap-[10rem]">
      <ReportTableFiltersForm />
      <ReportSearch />
    </div>
  );
}
