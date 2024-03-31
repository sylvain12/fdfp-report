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

const tableData = generateReportRefundsAndSettlementsData();
const tableTotal = generateReportRefundsAndSettlementsTotalData();

export default function ReportTableDetails() {
  const { showedTable, show } = useTable();

  return (
    <div className="">
      {/* RefundsAndASettlements table part 3 */}
      {/* <div>{tables.length}</div> */}
      {/* <div className="font-manrope">{summary.year}</div> */}
      {showedTable == TableNumber.RefundsAndASettlements ? (
        <RefundsAndSettlementsTable
          tables={tableData}
          summary={tableTotal}
          title={"Plans liquidés"}
        />
      ) : (
        ""
      )}
    </div>
  );
}
