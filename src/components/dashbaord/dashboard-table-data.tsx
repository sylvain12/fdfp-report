"use client";

import Loader from "@/components/animation/loader";
import { TAction, TPlan, baseURL } from "@/lib/data";
import { EDashboardView, useDashboardStore } from "@/store/dashboard.store";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import useSWR from "swr";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

export default function DashboardTableData() {
  const { view } = useDashboardStore();

  let dataView: TPlan[] | TAction[];
  if (view === EDashboardView.TRAINING_PLAN) {
    const { data } = useSWR(`${baseURL}/global.analysis.table1/`, fetcher, {
      suspense: true,
    });
    dataView = data;
  } else {
    const { data } = useSWR(
      `${baseURL}/global.analysis.table2/?year=2020`,
      fetcher,
      {
        suspense: true,
      }
    );
    dataView = data;
  }

  const currentYear = 2021;
  const plansData: TPlan[] = dataView
    ? (dataView as TPlan[])
        .filter((plan: TPlan) => Number(plan.annee) !== currentYear)
        .sort((plan: TPlan) => -Number(plan.annee))
    : [];

  const actionsData: TAction[] = dataView
    ? (dataView as TAction[]).sort((action: TAction) => -Number(action.annee))
    : [];

  return (
    <>
      <div className="mt-[6rem] mb-[2rem]">
        <h1 className="font-normal text-[2.2rem] text-fdfp-main">
          Historique des analyses
          <div className="h-1 w-[35px] bg-fdfp-second"></div>
        </h1>
      </div>

      {view === EDashboardView.TRAINING_PLAN ? (
        <div className="relative overflow-x-auto ">
          <table className="w-full text-right rtl:text-right">
            <thead className="text-[1.2rem] bg-gray-100 border-b border-fdfp-light font-thin">
              <tr>
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
                  className="bg-white border-b text-[1.5rem] font-normal text-center"
                >
                  <td className="px-6 py-8 text-left text-[1.4rem] w-[130px]">
                    {plan.annee}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.nb_plan}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.nb_plan_agree}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.proportion_plan_agree}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.mt_06}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.mt_demande}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.mt_agree}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {plan.part_mt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}

      {view === EDashboardView.TRAINING_ACTION && actionsData ? (
        <div className="relative overflow-x-auto ">
          <table className="w-full text-right rtl:text-right">
            <thead className="text-[1.2rem] bg-gray-100 border-b border-fdfp-light font-thin">
              <tr>
                <th scope="col" className="px-6 py-6 text-left">
                  Année
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Nombre d'actions demandées
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Nombre dactions agréées
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Taux d'agrément des actions
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Volume horaire moyen sur action agréé (en heure)
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Montant total demandé sur action (en FCFA)
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Montant demandé sur action agréée (en FCFA)
                </th>
                <th scope="col" className="px-6 py-6 text-center">
                  Montant total agréé sur action (en FCFA)
                </th>
              </tr>
            </thead>
            <tbody>
              {actionsData.map((action) => (
                <tr
                  key={action.mn_dmd_act_agr}
                  className="bg-white border-b text-[1.5rem] font-normal text-center"
                >
                  <td className="px-6 py-8 text-left text-[1.4rem] w-[130px]">
                    {action.annee || "2020"}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.nbr_act_dmd}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.nbr_act_agr}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.tx_agrnt_act}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.vol_hor_moyen_act_agr}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.mnt_dmd_act}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.mn_dmd_act_agr}
                  </td>
                  <td className="px-6 py-8 text-center text-[1.4rem] w-[130px]">
                    {action.mnt_agr_act}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
