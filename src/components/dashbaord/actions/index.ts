"use server";

import { createServerAction } from "zsa";
import z from "zod";
import {
  DasbboardAgreedProductsDataSchema,
  DashboardDataSchema,
  BusinessPartnerType,
  DashbordDataType,
   
} from "../model";
import {
  API_DASHBOARD_AGREED_PRODUCT_PATH,
  API_DASHBOARD_TRAINING_PLAN_PATH,
  API_DASHBOARD_TRAINING_PROJECT_PATH,
  API_DASHBOARD_TRAINING_ACTION_PATH,
  API_DASHBOARD_BUSINESS_PARTNER_PATH,
  API_URL,
} from "@/lib/config";
import { stringify } from 'querystring';
import { revalidatePath } from 'next/cache';

const agreedProductsURL = `${API_URL}/${API_DASHBOARD_AGREED_PRODUCT_PATH}/`;
const trainingPlanURL = `${API_URL}/${API_DASHBOARD_TRAINING_PLAN_PATH}/`;
const trainingProjectURL = `${API_URL}/${API_DASHBOARD_TRAINING_PROJECT_PATH}/`;
const trainingActionURL = `${API_URL}/${API_DASHBOARD_TRAINING_ACTION_PATH}/`;
const businessPartnerURL = `${API_URL}/${API_DASHBOARD_BUSINESS_PARTNER_PATH}/`;


// Agreed products Server Action
export const DashBoardAgreedProductsAction = createServerAction()
  .input(
    z.object({
      year: z.string(),
    })
  )
  .output(z.array(DasbboardAgreedProductsDataSchema))
  .handler(async ({ input }) => {
    const res = await fetch(
      `${agreedProductsURL}?${stringify({
        year: input.year,
      })}`
    );
  return res.json()
  });

// Training Plan Server Action
export const DashboardTrainingPlanAction = createServerAction()
.input(
  z.object({
    year: z.string(),
  })
)
.output(z.array(DashboardDataSchema))
.handler(async ({input}) => {
  try {
    const res = await fetch(
      `${trainingPlanURL}?${stringify({ year: input.year })}`
    );

    // Check if the response is OK
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch training plan data.");
  }

})

// Training Project Server Action
export const DashboardTrainingProjectAction = createServerAction()
  .input(
    z.object({
      year: z.string(),
    })
  )
  .output(z.array(DashboardDataSchema))
  .handler(async ({ input }) => {
    const res = await fetch(
      `${trainingProjectURL}?${stringify({ year: input.year })}`
    );
    return res.json();
  });

// Training Action Liquided Server Action
export const DashboardTrainingLiquidedAction = createServerAction()
  .input(
    z.object({
      year: z.string(),
    })
  )
  .output(z.array(DashboardDataSchema))
  .handler(async ({ input }) => {
    try {
      const res = await fetch(
        `${trainingActionURL}?${stringify({ year: input.year })}`
      );

      // Check if the response is OK
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("TAL Server => ", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch training plan data.");
    }
    
  });

// Business Partner Server Action
// export const DashbaordBusinessPartnerAction = createServerAction()
//   .input(
//     z.object({
//       year: z.string(),
//     })
//   )
//   .output(z.object({details: z.array(DashboardBusinessPartnerDataSchema)}))
//   .handler(async ({ input }) => {
//     const res = await fetch(
//       `${businessPartnerURL}?${stringify({ year: input.year })}`
//     );
//     return res.json()
//   });

export const loaddBusinessPartnerAction = async (year: string
) => {
  async function doFetch(): Promise<BusinessPartnerType[]> {
    try {
      const res = await fetch(
        `${businessPartnerURL}?${stringify({ year: year })}`
      );
      return await res.json();
    } catch (error: any) {
      throw new Error("Error fetching data:", error);
    }
  }
  revalidatePath(businessPartnerURL);
  return { promise: doFetch() };
};


// Training Action Server Action
export async function loadTrainingAction(year: string) {
  async function doFetch(): Promise<DashbordDataType[]> {
    try {
      const res = await fetch(
        `${trainingActionURL}?${stringify({ year: year })}`
      );
      return await res.json();
    } catch (error: any) {
      throw new Error("Error fetching data:", error);
    }
  }

  revalidatePath(trainingPlanURL)
  return { promise: doFetch() }
}
