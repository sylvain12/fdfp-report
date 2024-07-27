"use client";

import { useTable } from "@/store/table.store";
import { useEffect } from "react";
import {
  TTableFilterStoreStore,
  useTableFilterStore,
} from "@/store/report.store";
import { useSearchParams } from "next/navigation";
import ReportTablesFilters from "./report-table-filters";
import ReportTableData from "./report-table-data";
import { API_SUBGROUP_PATH, API_URL } from "@/lib/config";
import { stringify } from "querystring";
import { useQuery } from "@tanstack/react-query";

export default function ReportTableDetails() {
  const { showedTable } = useTable();
  const searchPath = useSearchParams();
  const { tables, setTables } = useTableFilterStore();
  const reportTableKey = searchPath.get("table");
  const url = `${API_URL}/${API_SUBGROUP_PATH}/?${stringify({
    subgroup: reportTableKey,
  })}`;

  const { data } = useQuery<TTableFilterStoreStore[]>({
    queryKey: [reportTableKey],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setTables(data);
    }
  }, [reportTableKey, data, setTables, showedTable]);

  return (
    <>
      <ReportTablesFilters tables={tables} />
      <ReportTableData />
    </>
  );
}
