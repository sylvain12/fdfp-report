"use client";

import { TLink } from "@/types/navigation.type";
import React from "react";
import {
  PresentationChartLineIcon,
  DocumentMagnifyingGlassIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import Link from "next/link";

const reportNavs: TLink[] = [
  {
    name: "Analyse globale",
    href: "",
    active: true,
    icon: PresentationChartLineIcon,
  },
  {
    name: "Demandes et Agréments",
    href: "",
    active: false,
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    name: "Remboursements et liquidations",
    href: "",
    active: false,
    icon: BanknotesIcon,
  },
];

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
                active: pathname === nav.href,
              })}
            >
              <ReportIcon className="w-10" />
              {nav.name}
            </Link>
          );
        })}
      </div>
      <div className="report-nav-actions"></div>
    </div>
  );
}
