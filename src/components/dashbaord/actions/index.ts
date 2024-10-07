"use server";

import { createServerAction } from "zsa";
import z from "zod";
import { DasbboardAgreedProductsDataSchema, DashboardDataSchema } from '../model';
import { API_DASHBOARD_AGREED_PRODUCT_PATH, API_DASHBOARD_TRAINING_PLAN_PATH, API_URL } from '@/lib/config';
import { stringify } from 'querystring';

const agreedProductsURL = `${API_URL}/${API_DASHBOARD_AGREED_PRODUCT_PATH}/`;
const trainingPlanURL = `${API_URL}/${API_DASHBOARD_TRAINING_PLAN_PATH}/`;

export const DashBoardAgreedProductsAction = createServerAction()
  .input(
    z.object({
      year: z.string(),
    })
  )
  .output(z.array(DasbboardAgreedProductsDataSchema))
  .handler(async ({ input }) => {
    const res = 
      await fetch(
        `${agreedProductsURL}?${stringify({
          year: input.year,
        })}`
      )
  return res.json()
  });

export const DashboardTrainingPlanAction = createServerAction()
.input(
  z.object({
    year: z.string(),
  })
)
.output(z.array(DashboardDataSchema))
.handler(async ({input}) => {
  const res = await fetch(`${trainingPlanURL}?${stringify({year: input.year})}`);
  return res.json()
})

export const DashboardDataAction = createServerAction()
  .input(z.object({ year: z.string() }))
  // .output(
  //   z.array(
  //     z.array(DasbboardAgreedProductsDataSchema),
  //     z.array(DashboardDataSchema)
  //   )
  // )
  .handler(async ({ input }) => {
    const fetchAgreedProducts = fetch(
      `${agreedProductsURL}?${stringify({ year: input.year })}`
    );
    const fetchTrainingPlan = fetch(
      `${trainingPlanURL}?${stringify({ year: input.year })}`
    );
    const results = await Promise.all([
      fetchAgreedProducts,
      fetchTrainingPlan,
    ]).then((values) => Promise.all(values.map((r) => r.json())));

    return results
  });