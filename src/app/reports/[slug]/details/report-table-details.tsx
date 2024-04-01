"use client";
import { useTable } from "@/store/table.store";
import {
  IReportRefundsAndSettlements,
  IReportRefundsAndSettlementsTotal,
  TableNumber,
} from "../../report.model";
import RefundsAndSettlementsTable from "./refunds-and-settlements-table";
import {
  generateReportRefundsAndSettlementsData,
  generateReportRefundsAndSettlementsTotalData,
} from "@/lib/data";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";
import { parseCookie } from "@/lib/utils";
import { TABLETOSHOW } from "@/middleware";
import ApplicationAndApprovalsTable from "./applications-and-approvals-table";

const tableData = generateReportRefundsAndSettlementsData();
const tableTotal = generateReportRefundsAndSettlementsTotalData();

export default function ReportTableDetails() {
  const { showedTable, setTable } = useTable();
  const { cookie } = document;

  useEffect(() => {
    setTable(parseCookie(cookie)[TABLETOSHOW]);
  }, [cookie, showedTable]);

  return (
    <div className="">
      {/* RefundsAndASettlements table part 3 */}
      {/* <div>{tables.length}</div> */}
      {/* <div className="font-manrope">{summary.year}</div> */}
      {showedTable === TableNumber.ApplicationsAndApprovals ? (
        <ApplicationAndApprovalsTable />
      ) : (
        ""
      )}
      {showedTable === TableNumber.RefundsAndASettlements ? (
        <RefundsAndSettlementsTable />
      ) : (
        ""
      )}
    </div>
  );
}
