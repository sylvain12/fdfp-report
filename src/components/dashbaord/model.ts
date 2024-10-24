import {z} from 'zod'

export type DasbboardAgreedProductsDataType = {
  label: string;
  total: number;
  amount: number;
}

export const DasbboardAgreedProductsDataSchema = z.object({
  label: z.string(),
  total: z.number(),
  amount: z.number()
})


export type DashbordDataType = {
label: string;
value: number;
extention: string;
}

export const DashboardDataSchema = z.object({
  label: z.string(),
  value: z.number(),
  extention: z.string(),
});

export type BusinessPartnerType = {
  region: string;
  total_count: number;
}

export const DashboardBusinessPartnerDataSchema = z.object({
  region: z.string(),
  total_count: z.number()
})