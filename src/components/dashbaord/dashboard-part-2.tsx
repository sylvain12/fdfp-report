"use client"

import {PieChart, Pie, PieProps, Cell, Tooltip, Legend} from 'recharts'
import { operatorsByTrainingCategory } from './data'
import DashboardMap from './ui/dashboard-map'

export default function DashboardPart2() {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const COLORS2 = ["#845ec2", "#00c9a7", "#0081cf", "#926d00"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props;    


  if (active && payload && payload.length) {
    console.log(payload[0].payload.fill)
    return (
      <div
        style={{ borderTopColor: payload[0].payload.fill, borderWidth: '2px', border: '2px 0 0 0' }}
        className={`bg-white p-4`}
      >
        <p className="flex flex-col border-b pb-2">
          <span>Libelle:</span>
          <span className="font-clash-display font-medium">{`${payload[0].name}`}</span>
        </p>
        <p className="flex justify-between items-center">
          <span>Valeur:</span>
          <span className="font-clash-display text-[3rem] text-fdfp-second font-semibold">{`${payload[0].value}`}</span>
        </p>
      </div>
    );
  }

  return null;
};

const renderLegend = (props: any) => {
const { payload } = props;
 return (
   <ul className='flex items-center justify-center gap-6'>
     {payload.map((entry: any, index: number) => (
       <li key={`item-${index} flex gap-1`} className='flex items-center gap-1'>
         <div style={{backgroundColor: entry.color}} className={`bg-[${entry.color}] w-8 h-8`}></div>
         <p>D{index + 1}</p>
       </li>
     ))}
   </ul>
 );
}

  return (
    <div className="flex-grow flex flex-col gap-[2rem]">
      <div className="mb-10 max-md:order-2 text-center">
        <h2 className="text-[2rem] mb-[1rem] font-clash-display order-1 font-semibold text-center">
          ENTREPRISES PARTENAIRES
        </h2>
        <DashboardMap />
      </div>

      <div className="max-md:order-1">
        <h2 className="text-[2rem] w-full font-semibold mb-[1.3rem] font-clash-display text-center leading-[20px] flex flex-col">
          OPERATEURS DE FORMATION HABILITES
          <span className='text-[1.4rem] font-medium text-fdfp-second'>(Survole pour voir les details)</span>
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
                label={renderCustomizedLabel}
                labelLine={false}
                fill="#8884d8"
              >
                {operatorsByTrainingCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend content={renderLegend} align="center" verticalAlign='bottom' />
              <Tooltip content={<CustomTooltip  />} />
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
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {operatorsByTrainingCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS2[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend content={renderLegend} align="center" verticalAlign='bottom' />
               <Tooltip content={<CustomTooltip  />} />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}
