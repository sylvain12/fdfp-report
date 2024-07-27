"use client";

import { HomeIcon } from "@heroicons/react/24/outline";
import ReportTableDetails from "@/components/reports/details/report-table-details";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import {
  TBreadcrumb,
  TBreadcrumbItem,
} from "@/components/breadcrumb/breadcrumb.model";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { stringify } from "querystring";
import { Suspense, useEffect, useState } from "react";
import { getReportPathDetails } from "@/lib/utils";
import Loader from "@/components/animation/loader";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errors/fallback";
import ReportSearch from "@/components/reports/ui/report-search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const defaultItem = [
  {
    title: "Acceuil",
    link: { active: false, href: "/", name: "Acceuil", icon: HomeIcon },
    isCurrent: false,
    showIcon: true,
  },
];

const ReportDetailsLayout = () => {
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
    setBreadcrumb((b) => ({
      ...breadcrumb,
      items: [...breadcrumb.items, parentItem, currentItem],
    }));
    return () => {};
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="report-details-container">
        {/* <ErrorBoundary fallback={<Fallback />}>
          <Suspense fallback={<Loader />}> */}
        <div className="flex justify-between items-center">
          <Breadcrumb {...breadcrumb} />
          <ReportSearch />
        </div>

        <ReportTableDetails />
        {/* </Suspense>
        </ErrorBoundary> */}
      </div>
    </QueryClientProvider>
  );
};

export default ReportDetailsLayout;
