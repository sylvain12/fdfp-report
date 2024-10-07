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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { useReportTotalStore } from "@/store/report.store";
import clsx from "clsx";
import { useGetData } from "@/store/table-data.store";
import ReportTableTotals from "@/components/reports/details/report-table-totals";

// const queryClient = new QueryClient();

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

  const { data } = useGetData();

  const { setVisibility, isVisible } = useReportTotalStore();

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
    // <QueryClientProvider client={queryClient}>
      <div className="report-details-container">
        {/* <ErrorBoundary fallback={<Fallback />}>
          <Suspense fallback={<Loader />}> */}
        <ReportTableTotals />
        <div className="flex justify-between items-center max-md:flex-col max-md:items-end">
          <Breadcrumb {...breadcrumb} />

          <div
            onClick={() => setVisibility(true)}
            className={clsx(
              "flex justify-center items-center uppercase gap-4 text-fdfp-second underline text-[1.25rem] font-medium cursor-pointer",
              {
                "opacity-55 pointer-events-none":
                  data === null || data.totals === undefined || isVisible,
              }
            )}
          >
            <Icon icon="typcn:arrow-back-outline" width="26" />
            Afficher les totaux
          </div>
        </div>

        <ReportTableDetails />
        {/* </Suspense>
        </ErrorBoundary> */}
      </div>
    // </QueryClientProvider>
  );
};

export default ReportDetailsLayout;
