"use client";

import { useEffect } from "react";
import {
  useTableFilterStore,
} from "@/store/report.store";
import { useSearchParams } from "next/navigation";
import ReportTablesFilters from "./report-table-filters";
import ReportTableData from "./report-table-data";
import React from 'react';
import {ReportTableAction} from '@/server-actions/report'
import {useServerActionQuery} from '@/lib/hooks/server-action-hooks'


export default function ReportTableDetails() {
  const searchPath = useSearchParams();
  const setTables = useTableFilterStore(state => state.setTables);
  const setLoading = useTableFilterStore(state => state.setLoading);
  const reportTableKey = searchPath.get("table");
  

  const {isPending: isTableDataLoading, data: tablesData} = useServerActionQuery(ReportTableAction, {queryKey: ['reportTables'], input: {key: reportTableKey!}})

  useEffect(() => {
    if(tablesData) {
      console.log('Table => ', tablesData)
      setTables(tablesData)
    } 
    setLoading(isTableDataLoading)
  }, [tablesData]);

  return (
    <>
      <ReportTablesFilters />
      <ReportTableData />
    </>
  );
}
