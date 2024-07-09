import { TLink } from "@/types/navigation.type";

export type TReportListLink = {
  links: TLink[];
};

export interface IReportRefundsAndSettlements {
  companyStatus: string;
  numberSharesRequestedForReimbursement: string;
  numberSharesRequestedForReimbursementAndLiquidated: string;
  totalAmountRequestedForReimbursementOn06: string;
  percentageOfAmountOn06: string;
  totalAmountRequestedForReimbursementOnFC: string;
  percentageOfAmountOnFC: string;
  totalAmountRequestedForReimbursement: string;
  totalAmountForReimbursementOnShares: string;
  percentageOfAmountOnProposed: string;
  totalAmountOfLiquidationOnShare: string;
  percentageOfAmountOnLiquidation: string;
  shareOfAmountLiquidated: string;
}

export interface IReportRefundsAndSettlementsTotal {
  year: string;
  numberOfSharesRequestedForReimbursement: string;
  numberSharesRequestedForReimbursementAndLiquidated: string;
  totalAmountRequestedForReimbursement: string;
  totalAmountProposedForReimbursementOnShares: string;
  totalAmountOfLiquidationOnShare: string;
  shareOfAmountLiquidated: string;
}

export type TReportDetails = {
  title: string;
  tables: IReportRefundsAndSettlements[];
  summary: IReportRefundsAndSettlementsTotal;
};

export enum TableNumber {
  GlobalAnalyze = 1,
  ApprovedTrainingAndStudyProjects,
  LiquidationOfTrainingPlans,
  TrainingPlansAndActions,
}

export interface IDataRefundsAndSettlements {
  "Statut d'Entreprise": string;
  "Nombre d'Actions Agréées": string;
  "Nombre d'Actions Demandées en Remboursement": string;
  "Part Action Demandée en Remboursement": string;
  "Montant Total Agréé sur Action (en FCFA)": string;
  "% Agreer": string;
  "Montant Total Demandé en Remboursement (en FCFA)": string;
  "% Demander": string;
  "Montant Total Proposé en Remboursement sur Action (en FCFA)": string;
  "% Proposer": string;
}

export type TTReportTableData = {
  items?: IDataRefundsAndSettlements[] | null;
  columns: string[];
};
