"use client";

import { useTable } from "@/store/table.store";
import {
  IReportRefundsAndSettlements,
  IReportRefundsAndSettlementsTotal,
  TableNumber,
} from "../../navbar/report.model";
import { useEffect } from "react";
import { parseCookie } from "@/lib/utils";
import { TABLETOSHOW } from "@/middleware";
import ApprovedTrainingAndStudyProjectsTable from './approved-training-and-study-projects';
import LiquidationOfTrainingPlansTable from './liquidation-of-training-plans';
import TrainingPlansAndActionsTable from './training-plans-and-actions';
import { TTableFilterStoreStore, useTableFilterStore } from '@/store/report.store';
import { useSearchParams } from 'next/navigation';
import ReportTablesFilters from './report-table-filters';
import ReportTableData from './report-table-data';
import { API_SUBGROUP_PATH, API_URL } from '@/lib/config';
import { stringify } from 'querystring';
import { useQuery } from '@tanstack/react-query';
import { useTableColumnStore } from '@/store/table-data.store';

export default function ReportTableDetails() {
  const { showedTable } = useTable();
  const {columns} = useTableColumnStore();
  const searchPath = useSearchParams();
  const {tables, setTables} = useTableFilterStore()
  const reportTableKey = searchPath.get('table');
  const { cookie } = typeof window === "object" ? document : { cookie: "" };
  // let columns: string[] = [];
  const url = `${API_URL}/${API_SUBGROUP_PATH}/?${stringify({subgroup: reportTableKey})}`


  const {data} = useQuery<TTableFilterStoreStore[]>({
    queryKey: [reportTableKey],
    queryFn: () => fetch(url).then(res => res.json())
  })

// While this story is inspired by actual people and events, certain characters,
// characterisations, incidents, locations and dialogue were fictionalized for
//  purposes of dramatization.

  useEffect(() => {
    // setTable(parseCookie(cookie)[TABLETOSHOW]);
    if (data) {setTables(data)}
  }, [reportTableKey, data, setTables, showedTable]);

  return (
    <>
      <ReportTablesFilters tables={tables} />
      <ReportTableData />
      {/* {showedTable === TableNumber.TrainingPlansAndActions && (
        <TrainingPlansAndActionsTable />
      )}
      {showedTable === TableNumber.LiquidationOfTrainingPlans && (
        <LiquidationOfTrainingPlansTable />
      )}
      {showedTable === TableNumber.ApprovedTrainingAndStudyProjects && (
        <ApprovedTrainingAndStudyProjectsTable />
      )} */}
    </>
  );
}
