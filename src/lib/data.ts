import axios, { AxiosResponse } from "axios";
import z, { unknown } from "zod";

export const baseURL = "http://147.182.139.206:8016";

const instance = axios.create({
  baseURL: baseURL,
  // timeout: 1000,
  headers: { Accept: "application/json" },
});

export type TAction = {
  annee?: string;
  mn_dmd_act_agr: string;
  mnt_agr_act: string;
  mnt_dmd_act: string;
  nbr_act_agr: string;
  nbr_act_dmd: string;
  part_mnt_agr_mnt_total_dmd: string;
  part_mnt_agr_mnt_total_dmd_act_agr: string;
  tx_agrnt_act: string;
  vol_hor_moyen_act_agr: string;
};

export type TPlan = {
  annee: string;
  mt_06: string;
  mt_agree: string;
  mt_demande: string;
  nb_plan: string;
  nb_plan_agree: string;
  part_mt: string;
  proportion_plan_agree: string;
};

export const getDashboardData = async (
  currentYear: number | string,
  previousYear: number[] | string[]
) => {
  const actionsPreviousYearEndpoints = previousYear?.map(
    (year) => `global.analysis.table2/?year=${year}`
  );
  const endpoints = [
    `global.analysis.table1/`,
    `global.analysis.table2/?year=${currentYear}`,
    ...actionsPreviousYearEndpoints,
  ];

  const response = await axios.all(
    endpoints.map((endpoint) => instance.get(endpoint))
  );
  // const [plans, ...rest] = response.map((result) => result.data);
  // const actions = flattenArray(rest);

  return response.map((result) => result.data);

  // return buildResponse(plans, actions);
};

// export function wrapPromise(
//   promise: Promise<{
//     current: { plan: TPlan; action: TAction };
//     previous: { plans: TPlan[]; actions: TAction[] };
//   }>
// ) {
//   let status = "pending";
//   let response: {
//     current: { plan: TPlan; action: TAction };
//     previous: { plans: TPlan[]; actions: TAction[] };
//   };

//   const suspender = promise.then((res) => {
//     response = res;
//   });

//   const handler = {
//     default: () => response,
//     pending: () => {
//       throw suspender;
//     },
//     error: () => {
//       throw response;
//     },
//   };

//   const read = () => {
//     return handler[status] ? handler[status]() : handler.default();
//   };

//   return { read };
// }

const buildResponse = (
  plans: any[],
  actions: any[]
): {
  current: { plan: TPlan; action: TAction };
  previous: { plans: TPlan[]; actions: TAction[] };
} => {
  return {
    current: { plan: plans[0], action: actions[0] },
    previous: { plans: plans[1], actions: actions[1] },
  };
};
