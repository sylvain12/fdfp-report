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
import React from 'react';


export default function ReportTableDetails() {
  const showedTable = useTable(state => state.showedTable);
  const searchPath = useSearchParams();
  const setTables = useTableFilterStore(state => state.setTables);
  const setLoading = useTableFilterStore(state => state.setLoading);
  const reportTableKey = searchPath.get("table");
  const url = `${API_URL}/${API_SUBGROUP_PATH}/?${stringify({
    subgroup: reportTableKey,
  })}`;

  const { isLoading: isTableDataLoading, data } = useQuery<TTableFilterStoreStore[]>({
    queryKey: [reportTableKey],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  useEffect(() => {
    setLoading(isTableDataLoading)

    if (data) {
      setTables(data);
    }
  }, [reportTableKey, data, setTables, showedTable]);

  return (
    <>
      <ReportTablesFilters />
      <ReportTableData />
    </>
  );
}
