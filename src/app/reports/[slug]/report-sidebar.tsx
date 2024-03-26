"use client";

import { TLink } from "@/types/navigation.type";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type TReportSidebar = {
  navs: TLink[];
  details: any;
};

export default function ReportSidebar({ navs, details }: TReportSidebar) {
  const searchParams = useSearchParams();
  const name = searchParams.getAll("name")[0];

  useEffect(() => {});

  return (
    <div className="report-content-sidebar">
      {navs.map((nav) => {
        return (
          <Link
            className={clsx("report-content-sidebar-link", {
              active: nav.query!.includes(name),
            })}
            key={nav.name}
            href={nav.href}
          >
            {/* <span> {details}</span> */}
            <p>{nav.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
