"use client"

import {PieChart, Pie} from 'recharts'
import { operatorsByTrainingCategory } from './data'
import DashboardMap from './ui/dashboard-map'

export default function DashboardPart2() {
  return (
    <div className="flex-grow flex flex-col gap-[2rem]">
      <div className="mb-10 max-md:order-2 text-center">
        <h2 className="text-[2rem] mb-[1rem] font-clash-display order-1 font-semibold text-center">
          ENTREPRISES PARTENAIRES
        </h2>
          <DashboardMap />
      </div>

      <div className="max-md:order-1">
        <h2 className="text-[2rem] w-full font-semibold mb-[1.3rem] font-clash-display text-center leading-[20px]">
          OPERATEURS DE FORMATION HABILITES
        </h2>
        {/* col 1 */}
        {/* <div className="flex flex-grow mb-4 gap-4">
          {sectionData.map((item) => (
            <Card key={item.label} className="boder-b">
              <CardContent className='p-4'>
                <span className="font-clash-display text-fdfp-second font-medium">{item.value}</span>
                <p className="">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="flex max-md:flex-col max-md:items-center">
          {/* col 2 */}
          <div className="flex-grow flex flex-col items-center">
            <p className="text-[1.6rem] mb-4 font-clash-display font-medium">
              Selon la catégorie de formation
            </p>
            <PieChart width={250} height={250}>
              <Pie
                data={operatorsByTrainingCategory}
                dataKey="value"
                nameKey="label"
                label
                fill="#8884d8"
              />
            </PieChart>
          </div>

          {/* col 3 */}
          <div className="flex-grow flex flex-col items-center">
            <p className="ext-[1.6rem] mb-4 font-clash-display font-medium">
              Selon le domaine de formation
            </p>
            <PieChart width={250} height={250}>
              <Pie
                data={operatorsByTrainingCategory}
                dataKey="value"
                nameKey="label"
                fill="#82ca9d"
                label
              />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
