"use client";

import Loader from "@/components/animation/loader";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errors/fallback";
import dynamic from "next/dynamic";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

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
    <div className="tablet:px-[10rem] tablet:py-[6.5rem] px-[2rem] py-[3rem]">
          {/* <ErrorBoundary fallback={<Fallback />}>
            <Suspense fallback={<Loader />}> */}
                 {/* <QueryClientProvider client={queryClient}> */}
              {/* <SuspenseDashboardComponent /> */}
                  {/* </QueryClientProvider> */}
            {/* </Suspense>
          </ErrorBoundary> */}
    </div>
  );
}
