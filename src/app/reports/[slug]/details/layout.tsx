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
import { Suspense, useEffect, useMemo, useState } from "react";
import { currencyFormatter, getReportPathDetails } from "@/lib/utils";
import Loader from "@/components/animation/loader";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errors/fallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
import { useReportTotalStore } from "@/store/report.store";
import clsx from "clsx";
import { useGetData } from "@/store/table-data.store";
import ReportTableTotals from "@/components/reports/details/report-table-totals";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReportTotalLoader } from '@/components/reports/details/report-loader';
import { filterFormValue } from "@/components/reports/details/report-table-filters-form";


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

  const data = useGetData(state => state.data);
	const loading = useGetData(state => state.loading)
	const isVisible = useReportTotalStore(state => state.isVisible)

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pathDetails = getReportPathDetails(pathname);

  const currentPageName = searchParams.get("name");
  // const year = searchParams.get("year");
	const { year } = filterFormValue.value;

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

	const totalsData = useMemo(() => {
		if (loading || data === null) return null;
		return data !== null ? data.totals : null;
	}, [year, data]);

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
      {/* <ReportTableTotals /> */}
      <div className="flex justify-between items-center max-md:flex-col max-md:items-end">
        <Breadcrumb {...breadcrumb} />

        <Popover>
          <PopoverTrigger
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
          </PopoverTrigger>
          <PopoverContent className={`${totalsData && totalsData.length > 2 ? 'w-[700px]' : 'w-[650px]'}`} align='end'>
            <div className="p-4">
              <div className=" mb-6">
                <p className="text-[1.3rem]">Annee</p>
                <span className="text-fdfp-second text-[1.9em] font-space-grotesk">
                  {year}
                </span>
              </div>
           {/* {isVisible &&   */}
              <div className={clsx("grid grid-flow-row auto-rows-max items-end gap-[4rem] gap-y-[2rem]", {
'grid-cols-3': totalsData && totalsData.length > 2,	
'grid-cols-2': totalsData && totalsData.length <= 2})}>
                {totalsData &&
                  totalsData!.map((total) => (
                    <div
                      key={total.label}
                      className=""
                    >
                      <p className='text-[1.4rem] font-clash-display'>{total?.label!}</p>
                      <span className="font-space-grotesk text-fdfp-second font-medium text-[1.95rem]">
                        {currencyFormatter(total.value, " ")}
                      </span>
                    </div>
                  ))}
              </div>
            {/* } */}
            </div>
          </PopoverContent>
        </Popover>

        {/* <div
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
        </div> */}
      </div>

      <ReportTableDetails />
      {/* </Suspense>
        </ErrorBoundary> */}
    </div>
    // </QueryClientProvider>
  );
};

export default ReportDetailsLayout;
