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

export default function ReportTableDetails() {
  const { showedTable, setTable } = useTable();
  const { cookie } = typeof window === "object" ? document : { cookie: "" };

  useEffect(() => {
    setTable(parseCookie(cookie)[TABLETOSHOW]);
  }, [cookie, showedTable]);

  return (
    <div className="">
      {showedTable === TableNumber.ApprovedTrainingAndStudyProjects && (
        <ApprovedTrainingAndStudyProjectsTable />
      )}
      {showedTable === TableNumber.LiquidationOfTrainingPlans && (
        <LiquidationOfTrainingPlansTable />
      )}
      {showedTable === TableNumber.TrainingPlansAndActions && (
        <TrainingPlansAndActionsTable />
      )}
    </div>
  );
}
