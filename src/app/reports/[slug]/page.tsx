"use client";

import { TLink } from "@/types/navigation.type";
import {
  approvedTrainingAndStudyProjectsNavs,
  liquidationOfTrainingPlansNavs,
  trainingPlansAndActionsNavs,
} from "../../../components/reports/data/report-nav-data";

import { useSearchParams, usePathname } from "next/navigation";
import ReportList from "../../../components/reports/ui/report-list";

type TReport = {
  slug: string;
  subMenu?: string[];
  navLinks: TLink[];
};

const ReportDetails = () => {
  const params = useSearchParams();
  const reportName = params.get("name");

  let navs: TLink[] = [];
  const pathname = usePathname();

  if (pathname.includes("training-plans-and-actions")) {
    navs = [...trainingPlansAndActionsNavs];
  }

  if (pathname.includes("liquidation-of-training-plans")) {
    navs = [...liquidationOfTrainingPlansNavs];
  }
  if (pathname.includes("approved-training-and-study-projects")) {
    navs = [...approvedTrainingAndStudyProjectsNavs];
  }

  return (
    <div className="report-content">
      {reportName !== null ? <ReportDetails /> : <ReportList links={navs} />}
    </div>
  );
};
export default ReportDetails;
