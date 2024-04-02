"use client";

import Loader from "@/components/animation/loader";
import { Suspense } from "react";
import DashboardHeaderCard from "./dashboard-header-card";
import DashboardTableData from "./dashboard-table-data";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <div className="px-[10rem] py-[6.5rem]">
      {/* <div className="flex items-center">
        <Loader />
      </div> */}

      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<Loader />}>
          <DashboardHeaderCard />
          <DashboardTableData />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export const Error = () => {
  return <div>Error</div>;
};
