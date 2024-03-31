"use client";

import { HomeIcon } from "@heroicons/react/24/outline";
import ReportTableDetails from "./report-table-details";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import {
  TBreadcrumb,
  TBreadcrumbItem,
} from "@/components/breadcrumb/breadcrumb.model";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import { getReportPathDetails } from "@/lib/utils";

const reportBreadCrumb: TBreadcrumb = {
  separator: ">",
  items: [
    {
      title: "Acceuil",
      link: { active: false, href: "/", name: "Acceuil", icon: HomeIcon },
      isCurrent: false,
      showIcon: true,
    },
  ],
};

const defaultItem = [
  {
    title: "Acceuil",
    link: { active: false, href: "/", name: "Acceuil", icon: HomeIcon },
    isCurrent: false,
    showIcon: true,
  },
];

export const ReportDetailsLayout = () => {
  const [breadcrumb, setBreadcrumb] = useState<TBreadcrumb>({
    separator: ">",
    items: defaultItem,
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pathDetails = getReportPathDetails(pathname);

  const currentPageName = searchParams.get("name");
  const year = searchParams.get("year");

  const parentItem: TBreadcrumbItem = {
    title: pathDetails.name,
    link: {
      active: false,
      href: pathDetails.href,
      name: pathDetails.name,
    },
    isCurrent: false,
  };

  const currentItem: TBreadcrumbItem = {
    title: currentPageName || "",
    link: {
      href: `${pathname}?${stringify({ name: currentPageName, year })}`,
      name: "",
    },
    isCurrent: true,
  };

  useEffect(() => {
    setBreadcrumb({
      ...breadcrumb,
      items: [...breadcrumb.items, parentItem, currentItem],
    });
    return () => {};
  }, []);

  return (
    <div className="report-details-container">
      <Breadcrumb {...breadcrumb} />
      <ReportTableDetails />
    </div>
  );
};

export default ReportDetailsLayout;
