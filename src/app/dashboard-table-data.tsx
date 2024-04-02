"use client";

import Loader from "@/components/animation/loader";
import { TPlan, baseURL } from "@/lib/data";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

export default function DashboardTableData() {
  const { data, isValidating } = useSWR(
    `${baseURL}/global.analysis.table1/`,
    fetcher,
    {
      suspense: true,
    }
  );
  const currentYear = 2021;
  const plansData: TPlan[] = data
    ? data
        .filter((plan: TPlan) => Number(plan.annee) !== currentYear)
        .sort((plan: TPlan) => -Number(plan.annee))
    : [];
  return (
    <>
      <div className="mt-[6rem] mb-[3rem]">
        <h1 className="font-normal text-[3rem] text-fdfp-main">
          Historique des analyses
        </h1>
      </div>

      <div className="relative overflow-x-auto ">
        <table className="w-full text-right rtl:text-right">
          <thead className="text-[1.2rem] bg-white border-b border-fdfp-light">
            <tr className="bg-fdfp-light">
              <th scope="col" className="px-6 py-6 text-left">
                Année du plan
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Nombre de plans demandés
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Nombre de plans agréés
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Proportion de plans agréés
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Montant du 0,6 annuel (en FCFA)
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Montant demandé sur plan (en FCFA)
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Montant total agréé sur plan (en FCFA)
              </th>
              <th scope="col" className="px-6 py-6 text-center">
                Part du montant agréé dans le montant demandé sur plan
              </th>
            </tr>
          </thead>
          <tbody>
            {plansData.map((plan) => (
              <tr
                key={plan.annee}
                className="bg-white border-b text-[1.5rem] font-thin text-center"
              >
                <td className="px-6 py-8 font-bold text-left text-[1.4rem] w-[130px]">
                  {plan.annee}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.nb_plan}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.nb_plan_agree}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.proportion_plan_agree}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.mt_06}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.mt_demande}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.mt_agree}
                </td>
                <td className="px-6 py-8 font-bold text-center text-[1.4rem] w-[130px]">
                  {plan.part_mt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
