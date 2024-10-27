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

export type BusinessRegionType = {
  region: string;
  total_count: number;
};

export type BusinessPartnerType = {
  district: string;
  total_district: number;
  regions: BusinessRegionType[];
}

export const BusinessPartnerSchema = z.object({
  district: z.string(),
  total_district: z.number(),
  regions: z.object({
    region: z.string(),
    total_count: z.number(),
  }),
})