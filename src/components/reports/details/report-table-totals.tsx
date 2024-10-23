"use client";

import { currencyFormatter } from "@/lib/utils";
import { useReportTotalStore } from "@/store/report.store";
import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { filterFormValue } from "./report-table-filters-form";
import { useDebouncedCallback } from "use-debounce";
import {ReportTotalLoader} from './report-loader'

export default function ReportTableTotals() {
  const data = useGetData(state => state.data);
  const loading = useGetData(state => state.loading);
  
  const isVisible =  useReportTotalStore(state => state.isVisible)
  const setVisibility = useReportTotalStore((state) => state.setVisibility);
  const { year } = filterFormValue.value;

  const totalsData = useMemo(() => {
    if (loading || data === null) return null;
    return data !== null ? data.totals : null;
  }, [year, data]);

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  return (
    <div
      className={clsx("report-details-totals", {
        "visible opacity-100 block": isVisible,
      })}
    >
      <div className="absolute top-1/2 -translate-y-1/2 left-8 text-left">
        <p className="text-[1.3rem]">Annee</p>
        <span className="text-fdfp-second text-[1.9em] font-space-grotesk">{year}</span>
      </div>
      {isVisible && (
        <div className="report-details-totals-items">
                {totalsData === null && loading ? <ReportTotalLoader /> :
                  totalsData!.map((total) => (
                    <div key={total.label} className="report-details-totals-item">
                      <p>{total?.label!}</p>
                      <span className='font-space-grotesk'>{currencyFormatter(total.value, " ")}</span>
                    </div>
                  ))}

            {/* <ReportTotalLoader /> */}
        </div>
      )}

      <div
        onClick={() => setVisibility(false)}
        className="absolute top-[1.5rem] right-[1.5rem] cursor-pointer"
      >
        <Icon icon="clarity:times-line" width="42" />
      </div>
    </div>
  );
}
