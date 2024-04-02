"use client";

import ReportTablesFilters from "./report-table-filters";
import ReportTableData from "./report-table-data";
import { useGetData } from "@/store/table-data.store";
import { useSearchParams } from "next/navigation";

import {
  filterInitiatedProject,
  filterNumberOfIntern,
  filterTrainingAction,
  filterTrainingCabinet,
  filterTrainingDomain,
  filterTrainingPlan,
} from "../../data/filters2.data";

const trainingPlanColumns = [
  "entity",
  "nbr_entr",
  "t_mtt06",
  "tx_t_mtt06",
  "t_nonagree",
  "tx_t_nonagree",
  "t_agree",
  "tx_t_agree",
  "Total",
];

const trainingActionsColumns = [
  "DEPARTEMENT FDFP",
  "Nombre d'actions agréées ",
  "% Nombre d'actions agréées",
  "Montant total demandé sur action (en FCFA)",
  "% Montant total demandé sur action (en FCFA)",
  "Montant agréé/action sur FC (en FCFA)",
  "% Montant agréé/action sur FC (en FCFA)",
  "Montant agréé/action sur 0,6% (en FCFA)",
  "% Montant agréé/action sur 0,6% (en FCFA)",
];

const numberOfInternsColumns: string[] = [];
const trainingDomainColumns: string[] = [];
const trainingCabinetColumns: string[] = [];
const initiatedProjectColumns: string[] = [
  "Type de Projet",
  "Nombre de Stagiaires",
  "% Stagiaires",
  "Nombre de Femmes",
  "% Femmes",
  "Part des Femmes",
  "Nombre d'Heures Moyen par Projet",
];

export default function ApplicationAndApprovalsTable() {
  const { data } = useGetData();
  const searchPath = useSearchParams();
  let amounts: { name: string; table: string }[] = [];
  let columns: string[] = [];

  const reportTableName = searchPath.get("name")!.toLowerCase();
  if (reportTableName.includes("nombre de stagiaires par action")) {
    amounts = filterNumberOfIntern;
    columns = numberOfInternsColumns;
  } else if (reportTableName.includes("actions de formation")) {
    amounts = filterTrainingAction;
    columns = trainingActionsColumns;
  } else if (reportTableName.includes("plan de formations")) {
    amounts = filterTrainingPlan;
    columns = trainingPlanColumns;
  } else if (reportTableName.includes("domaine de formations")) {
    amounts = filterTrainingDomain;
    columns = trainingDomainColumns;
  } else if (reportTableName.includes("cabinets de formations")) {
    amounts = filterTrainingCabinet;
    columns = trainingCabinetColumns;
  } else if (reportTableName.includes("projets initiés")) {
    amounts = filterInitiatedProject;
    columns = initiatedProjectColumns;
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
