"use client";

import Loader from "@/components/animation/loader";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "@/components/errors/fallback";
import dynamic from "next/dynamic";

{
  /* <style jsx global>
  {`
    :root {
      --font-mono: ${mono.style.fontFamily};
    }
  `}
</style>; */
}

// export const metadata = {
//   title: "Acceuil",
// };

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
    <div className="px-[10rem] py-[6.5rem]">
      <ErrorBoundary fallback={<Fallback />}>
        <Suspense fallback={<Loader />}>
          <SuspenseDashboardComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
