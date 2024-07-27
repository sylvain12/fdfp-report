"use client";

import { TLink } from "@/types/navigation.type";
import Link from "next/link";
import { clsx } from "clsx";
import { useSearchParams } from "next/navigation";

type TReportSidebar = {
  navs: TLink[];
};

export default function ReportSidebar({ navs }: TReportSidebar) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

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
            <p>{nav.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
