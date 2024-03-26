"use client";

import { TLink } from "@/types/navigation.type";
import ReportSidebar from "./report-sidebar";
import {
  refundsAndSettlementsNavs,
  applicationsAndApprovalsNavs,
  globalAnalyzeNavs,
} from "./nav-data";

import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NoReport from "./no-report";
import ReportList from "./report-list";

type TReport = {
  slug: string;
  subMenu?: string[];
  navLinks: TLink[];
};

const ReportDetails = () => {
  let navs: TLink[] = [];
  const pathname = usePathname();

  if (pathname.includes("global-analyze")) {
    navs = [...globalAnalyzeNavs];
  }

  if (pathname.includes("applications-and-approvals")) {
    navs = [...applicationsAndApprovalsNavs];
  }
  if (pathname.includes("refunds-and-settlements")) {
    navs = [...refundsAndSettlementsNavs];
  }

  return (
    <div className="report-content">
      {/* <ReportSidebar navs={navs} details={34} /> */}

      {navs.length ? (
        <ReportList links={navs} />
      ) : (
        <div className="report-content-text">
          <NoReport />
        </div>
      )}
    </div>
  );
};
export default ReportDetails;
