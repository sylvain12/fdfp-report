import {
  IReportRefundsAndSettlements,
  IReportRefundsAndSettlementsTotal,
} from "../../report.model";

type TReportDetails = {
  title: string;
  tables: IReportRefundsAndSettlements[];
  summary: IReportRefundsAndSettlementsTotal;
};

export default function ReportTableDetails({
  title,
  tables,
  summary,
}: TReportDetails) {
  return (
    <div className="report-table">
      {/* <h1 className="text-[2.1rem] font-normal font-manrope">{title}</h1> */}
      <h2 className="text-[3rem] font-serif">Adobe Analytics</h2>
      <div>{tables.length}</div>
      <div className="font-manrope">{summary.year}</div>
    </div>
  );
}
