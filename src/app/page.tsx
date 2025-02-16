"use client";

import Loader from "@/components/animation/loader";
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
    <div className="pt-8 px-[5rem] lg:px-[10rem]">
      <QueryClientProvider client={queryClient}>
        <SuspenseDashboardComponent />
      </QueryClientProvider>
    </div>
  );
}
