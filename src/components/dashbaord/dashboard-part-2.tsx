"use client"

import {PieChart, Pie, BarChart} from 'recharts'
import { operatorsByTrainingCategory, sectionData } from './data'

export default function DashboardPart2() {
  return (
    <div className="my-[4rem]">
      <h2 className="text-[2rem] font-thin mb-[1rem] font-clash-display">
        OPERATEURS DE FORMATION HABILITES
      </h2>

      <div className="flex">
        {/* col 1 */}
        <div className="flex flex-grow flex-col">
            {sectionData.map(item => <div key={item.label} className='boder-b'>
    <span className=''>{item.value}</span>
    <p className=''>{item.label}</p>
  </div>)}
        </div>

        {/* col 2 */}
        <div className="flex-grow">
          <p className="font-clash-display text-[1.6rem] mb-4">
            Selon la catégorie de formation
          </p>
          <PieChart width={730} height={250}>
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
        <div className="flex-grow">
          <p className="font-clash-display text-[1.6rem] mb-4">
            Selon le domaine de formation
          </p>
          <PieChart width={730} height={250}>
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
  );
}
