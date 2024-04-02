"use client";

import Loader from "@/components/animation/loader";
import { Suspense } from "react";
import DashboardHeaderCard from "./dashboard-header-card";
import DashboardTableData from "./dashboard-table-data";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./fallback";

export default function Home() {
  return (
    <div className="px-[10rem] py-[6.5rem]">
      <ErrorBoundary fallback={<Fallback />}>
        <Suspense fallback={<Loader />}>
          <DashboardHeaderCard />
          <DashboardTableData />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
