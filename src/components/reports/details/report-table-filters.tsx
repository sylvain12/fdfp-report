// "use client";

import ReportTableFiltersForm from "./report-table-filters-form";
import ReportTableFiltersActions from "./report-table-filters-actions";

export default function ReportTablesFilters() {
  return (
    <div className="report-filter-container flex items-end justify-end gap-[4rem] bg-transparent mt-[3rem] px-0 pb-10 border-b-none lg:flex-row lg:gap-[1rem] max-[1271px]:flex-col">
      <ReportTableFiltersForm />
      <ReportTableFiltersActions />
    </div>
  );
}
