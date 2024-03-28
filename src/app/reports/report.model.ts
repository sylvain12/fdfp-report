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
  ApplicationsAndApprovals,
  RefundsAndASettlements,
}
