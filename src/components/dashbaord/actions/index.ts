"use server";

import { createServerAction } from "zsa";
import z from "zod";
import { DasbboardAgreedProductsDataSchema } from '../model';
import { API_DASHBOARD_AGREED_PRODUCT_PATH, API_URL } from '@/lib/config';
import { stringify } from 'querystring';

  const url = `${API_URL}/${API_DASHBOARD_AGREED_PRODUCT_PATH}/`;

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
        `${url}?${stringify({
          year: input.year,
        })}`
      )
    console.log("res ", res)
  return res.json()
  });
