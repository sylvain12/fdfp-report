"use client";

import Loader from "@/components/animation/loader";
import { TPlan, baseURL } from "@/lib/data";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";
import Fallback from "./fallback";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

export default function DashboardHeaderCard() {
  const { data } = useSWR(`${baseURL}/global.analysis.current.year/`, fetcher, {
    suspense: true,
  });
  const currentPlan: TPlan = data;

  return (
    <Suspense fallback={<Loader />}>
      <div className="mb-[6rem]">
        <h1 className="font-normal text-[3.5rem] text-fdfp-main">
          Tableau de bord
        </h1>
        <p className="font-medium text-fdfp-second text-[1.4rem]">
          Des analyse globale
        </p>
      </div>
      <div className="flex items-center gap-[2rem]">
        <div className="flex-1 flex items-center h-full">
          <div className="flex flex-col border-r border-fdfp-main-light flex-1 py-10">
            <p className="uppercase text-fdfp-main font-normal text-[1.5rem] mb-2">
              Montant du 0.6 annuel
            </p>
            <div className="py-6 flex flex-col border-b-none border-fdfp-light">
              <p className="text-[3rem] font-bold">
                {currentPlan.mt_06 || "-"}
              </p>
              <span className="font-medium text-fdfp-second text-[1.3rem]">
                Plan de formations
              </span>
            </div>
            {/* <div className="py-6 flex flex-col">
              <p className="text-[3rem] font-bold">9 594 701 837</p>
              <span className="font-medium text-fdfp-second text-[1.3rem]">
                Action de formations
              </span>
            </div> */}
          </div>

          <div className="flex flex-col border-r border-fdfp-main-light flex-1 py-10 px-[5rem]">
            <p className="uppercase text-fdfp-main font-normal text-[1.5rem] mb-2 pl-[5rem]">
              Montant demandé sur plan
            </p>
            <div className="py-6 flex flex-col border-b-none border-fdfp-light pl-[5rem]">
              <p className="text-[3rem] font-bold">{currentPlan.mt_demande}</p>
              <span className="font-medium text-fdfp-second text-[1.3rem]">
                Plan de formations
              </span>
            </div>
            {/* <div className="py-6 flex flex-col pl-[5rem]">
              <p className="text-[3rem] font-bold">9 594 701 837</p>
              <span className="font-medium text-fdfp-second text-[1.3rem]">
                Action de formations
              </span>
            </div> */}
          </div>

          <div className="flex flex-col border-r-none border-fdfp-main-light flex-1 py-10 px-[5rem]">
            <p className="uppercase text-fdfp-main font-normal text-[1.5rem] mb-2 pl-[5rem]">
              Montant total agréé sur plan
            </p>
            <div className="py-6 flex flex-col border-b-none border-fdfp-light pl-[5rem] ">
              <p className="text-[3rem] font-bold">{currentPlan.mt_agree}</p>
              <span className="font-medium text-fdfp-second text-[1.3rem]">
                Plan de formations
              </span>
            </div>
            {/* <div className="py-6 flex flex-col pl-[5rem]">
              <p className="text-[3rem] font-bold">9 594 701 837</p>
              <span className="font-medium text-fdfp-second text-[1.3rem]">
                Action de formations
              </span>
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-[1rem] w-[400px]">
          <div className="col-start-1 col-span-1 row-start-1 row-span-1 bg-fdfp-main text-white font-medium p-4">
            <p className="text-[1.3rem] uppercase">Nombre de plan</p>
            <span className="text-[2.5rem] font-manrope">
              {currentPlan.nb_plan}
            </span>
          </div>
          <div className="col-start-1 col-span-1 row-start-2 row-span-1 bg-fdfp-second text-white font-medium p-4">
            <p className="text-[1.3rem] uppercase">Nombre de plan agréé</p>
            <span className="text-[2.5rem] font-manrope">
              {currentPlan.nb_plan_agree}
            </span>
          </div>
          <div className="col-start-2 col-span-1 row-start-1 row-span-2 bg-fdfp-light text-fdfp-main font-medium p-4 flex flex-col justify-center">
            <p className="text-[1.3rem] uppercase">Proportion plan agréé</p>
            <span className="text-[4rem] font-manrope">
              {currentPlan.proportion_plan_agree}
            </span>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
