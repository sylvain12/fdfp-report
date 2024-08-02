"use client";

import { currencyFormatter } from "@/lib/utils";
import { useReportTotalStore } from "@/store/report.store";
import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useEffect } from "react";

export default function ReportTableTotals() {
  const { data } = useGetData();
  const { isVisible, setVisibility } = useReportTotalStore();

  useEffect(() => {
    return () => setVisibility(false);
  }, []);

  return (
    <div
      className={clsx("report-details-totals", {
        "visible opacity-100 block": isVisible,
      })}
    >
      {isVisible && (
        <div className="report-details-totals-items">
          {data !== null &&
            data.totals.map((total) => (
              <div key={total.label} className="report-details-totals-item">
                <p>{total?.label!}</p>
                <span>{currencyFormatter(total.value, " ")}</span>
              </div>
            ))}
        </div>
      )}

      <div
        onClick={() => setVisibility(false)}
        className="absolute top-[1.5rem] right-[3rem] cursor-pointer"
      >
        <Icon icon="clarity:times-line" width="42" />
      </div>
    </div>
  );
}
