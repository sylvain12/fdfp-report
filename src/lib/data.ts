import {
  IReportRefundsAndSettlements,
  IReportRefundsAndSettlementsTotal,
} from "@/app/reports/report.model";

function generateReportRefundsAndSettlementsData(): IReportRefundsAndSettlements[] {
  return [
    {
      companyStatus: "Active",
      numberSharesRequestedForReimbursement: "1000",
      numberSharesRequestedForReimbursementAndLiquidated: "800",
      totalAmountRequestedForReimbursementOn06: "50000",
      percentageOfAmountOn06: "50%",
      totalAmountRequestedForReimbursementOnFC: "60000",
      percentageOfAmountOnFC: "60%",
      totalAmountRequestedForReimbursement: "100000",
      totalAmountForReimbursementOnShares: "70000",
      percentageOfAmountOnProposed: "70%",
      totalAmountOfLiquidationOnShare: "30000",
      percentageOfAmountOnLiquidation: "30%",
      shareOfAmountLiquidated: "40%",
    },
  ];
}

function generateReportRefundsAndSettlementsTotalData(): IReportRefundsAndSettlementsTotal {
  return {
    year: "2023",
    numberOfSharesRequestedForReimbursement: "5000",
    numberSharesRequestedForReimbursementAndLiquidated: "4000",
    totalAmountRequestedForReimbursement: "200000",
    totalAmountProposedForReimbursementOnShares: "150000",
    totalAmountOfLiquidationOnShare: "50000",
    shareOfAmountLiquidated: "25%",
  };
}

export {
  generateReportRefundsAndSettlementsData,
  generateReportRefundsAndSettlementsTotalData,
};
