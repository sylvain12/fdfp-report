"use client";

import Loader from "@/components/animation/loader";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errors/fallback";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "@/components/dashbaord/dashboard";

const queryClient = new QueryClient();

const SuspenseDashboardComponent = dynamic(
  () => import("@/components/dashbaord/dashboard"),
  {
    ssr: false,
    suspense: true,
    loading: Loader,
  }
);

export default function Home() {
  return (
    <div className="px-[20rem] py-[3rem]">
      {/* <Dashboard /> */}
      <ErrorBoundary fallback={<Fallback />}>
        <Suspense fallback={<Loader />}>
          <QueryClientProvider client={queryClient}>
            <SuspenseDashboardComponent />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
