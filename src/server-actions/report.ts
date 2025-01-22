import { API_SUBGROUP_PATH, API_URL } from '@/lib/config';
import { stringify } from 'querystring';
import { createServerAction } from "zsa";
import z from 'zod'

const url = `${API_URL}/${API_SUBGROUP_PATH}/`;

export const TableSchema = z.object({
  entity: z.string(),
  entitylabel: z.string(),
  procname: z.string()
})

export  const getReportTableData = async (tableKey: string) => {
  const endpoint = `${url}/?${stringify({
    subgroup: tableKey,
  })}`

  console.log(endpoint)
  try {
    const res = await fetch(endpoint, {headers: {
    Accept: 'application/json',
"Content-Type": "application/json",
mode: 'no-cors'
}})
    return res.json()
  } catch (error) {
    console.log("Error => ", error)
    throw error
  }

}

export const ReportTableAction = createServerAction()
.input(z.object({key: z.string()}))
.output(z.array(TableSchema))
.handler(async ({input}) => {
  const endpoint  = `${url}?${stringify({
    subgroup: input.key,
  })}`

  console.log(endpoint)
  try {
    const res = await fetch(endpoint)

    if (!res.ok) throw(`HTTP error! Status: ${res.status}`)

    const data = await res.json()
    console.log('Table data => ', data);
    return data;
  } catch (error) {
    console.log("Error fetching tables ", error)
    throw new Error('Impossible de charger les tables')
  }
})
