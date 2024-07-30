"use client";

import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";
import { reportNavs } from "../data/report-nav-data";

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
              <ReportIcon className="w-16 sm:w-16" />
              <p className="sm:block hidden">{nav.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
