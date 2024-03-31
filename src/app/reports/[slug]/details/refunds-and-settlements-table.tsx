import { amountFiltersActionClaimedForReimbursement } from "../../data/filters.data";
import { TReportDetails } from "../../report.model";
import ReportTablesFilters from "./report-table-filters";
import ReportTableData from "./report-table-data";
import { useGetData } from "@/store/table-data.store";
import NoReport from "../no-report";

const amounts = amountFiltersActionClaimedForReimbursement;
const data = [
  {
    "Entités ": "AGRICULTURE",
    "Nombre d'Actions Agréées": "467",
    "Nombre d'Actions Demandées en Remboursement": "66",
    "Part Action Demandée en Remboursement": "14.13%",
    "Montant Total Agréé sur Action (en FCFA)": "1 276 743 506",
    "% Agreer": "6.40%",
    "Montant Total Demandé en Remboursement (en FCFA)": "126 585 940",
    "% Demander": "3.00%",
    "Montant Total Proposé en Remboursement sur Action (en FCFA)": "36 250 000",
    "% Proposer": "2.38%",
  },
];
const defaultRefundsAndSettlementsDataColumns = [
  "Entités",
  "Nombre d'Actions Agréées",
  "Nombre d'Actions Demandées en Remboursement",
  "Part Action Demandée en Remboursement",
  "Montant Total Agréé sur Action (en FCFA)",
  "% Agreer",
  "Montant Total Demandé en Remboursement (en FCFA)",
  "% Demander",
  "Montant Total Proposé en Remboursement sur Action (en FCFA)",
  "% Proposer",
];

export default function RefundsAndSettlementsTable({
  title,
  tables,
  summary,
}: TReportDetails) {
  const { data } = useGetData();

  return (
    <div>
      <ReportTablesFilters amounts={amounts} />
      <ReportTableData columns={defaultRefundsAndSettlementsDataColumns} />
    </div>
  );
}
