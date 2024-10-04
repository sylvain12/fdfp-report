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