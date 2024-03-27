"use client";

import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";
import Actions from "@/components/actions/actions";
import { stringify } from "querystring";
import {
  globalAnalyzeNavs,
  applicationsAndApprovalsNavs,
  refundsAndSettlementsNavs,
  reportNavs,
} from "./[slug]/nav-data";
import { useEffect } from "react";

export default function ReportNav() {
  const pathname = usePathname();

  return (
    <div className="report-nav">
      <div className="report-nav-menu">
        {reportNavs.map((nav) => {
          const ReportIcon = nav.icon;
          return (
            <Link
              href={nav.href}
              key={nav.name}
              className={clsx("report-nav-menu-link", {
                active: pathname === nav.href || pathname.includes(nav.href),
              })}
            >
              <ReportIcon className="w-12" />
              {nav.name}
            </Link>
          );
        })}
      </div>
      <div className="report-nav-actions">
        <Actions />
      </div>
    </div>
  );
}
