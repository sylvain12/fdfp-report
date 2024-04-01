"use client";

import {
  amountFiltersActionClaimedForReimbursement,
  amountFiltersLiquidatedPlans,
  amountFiltersSharesLiquidated,
} from "../../data/filters.data";
import { TReportDetails } from "../../report.model";
import ReportTablesFilters from "./report-table-filters";
import ReportTableData from "./report-table-data";
import { useGetData } from "@/store/table-data.store";
import NoReport from "../no-report";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
const refundsAndSettlementsDataColumns = [
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

const liquidatedShares = [
  "Entités",
  "Nombre d'Actions Demandées en Remboursement",
  "Nombre d'Actions Demandées en Remboursement puis Liquidées",
  "Montant Total Demandé en Remboursement (en FCFA) sur 0,6",
  "% Part 0,6",
  "Montant Total Demandé en Remboursement (en FCFA) sur FC",
  "% Part FC",
  "Montant Total Demandé en Remboursement (en FCFA)",
  "Montant Total Proposé en Remboursement sur Action (en FCFA)",
  "% Proposer",
  "Montant Total de la Liquidation sur Action (en FCFA)",
  "% Liquider",
  "Part du Montant Liquidé sur Montant Proposé en Remboursement",
];

const liquidatedPlans = [
  "Entités",
  "Nombre de Plan Demandés",
  "Nombre de Plan Agréés",
  "Nombre de Plan Liquidés",
  "Part des Plans Liquidés sur Plans Agréés",
  "Montant du Plan 0,6 Annuel (en FCFA)",
  "% Part Annuel 0,6",
  "Montant Agréé du Plan 0,6 (en FCFA)",
  "% Part Agréé 0,6",
  "Montant Agréé FC du Plan (en FCFA)",
  "% Part Agréé FC",
  "Montant Total Agréé sur Plan (en FCFA)",
  "% Part Total Agréé",
  "Montant Total de la Tiquidation du Plan (en FCFA)",
  "% Part Total Liquidé",
];

export default function RefundsAndSettlementsTable({
  title,
  tables,
  summary,
}: TReportDetails) {
  const { data } = useGetData();
  const searchPath = useSearchParams();
  let amounts: { name: string; table: string }[] = [];
  let columns: string[] = [];

  const reportTableName = searchPath.get("name")!.toLowerCase();
  if (reportTableName.includes("plans liquidés")) {
    amounts = amountFiltersLiquidatedPlans;
    columns = liquidatedPlans;
  } else if (reportTableName.includes("actions liquidées")) {
    amounts = amountFiltersSharesLiquidated;
    columns = liquidatedShares;
  } else if (reportTableName.includes("actions demandés en remboursement")) {
    amounts = amountFiltersActionClaimedForReimbursement;
    columns = refundsAndSettlementsDataColumns;
  } else {
    console.log("TODO: implement this section");
  }

  return (
    <div>
      <ReportTablesFilters amounts={amounts} />
      <ReportTableData columns={columns} />
    </div>
  );
}
