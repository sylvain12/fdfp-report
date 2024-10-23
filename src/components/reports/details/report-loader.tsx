import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const ReportTableLoader = () => {
  return (
    <>
      <table className="w-full text-right rtl:text-right">
        <thead className="text-[1.2rem] border-b border-t border-fdfp-light bg-fdfp-bg-thead">
          <tr>
            <th className="px-6 py-6 text-left bg-background">
              <Skeleton className="w-[150px] h-[20px] rounded-full max-md:w-full" />
            </th>
            <th className="px-6 py-6 text-center bg-background visible max-md:hidden">
              <Skeleton className="w-[150px] h-[20px] rounded-full" />
            </th>
            <th className="px-6 py-6 text-center bg-background visible max-md:hidden">
              <Skeleton className="w-[150px] h-[20px] rounded-full" />
            </th>
            <th className="px-6 py-6 text-center bg-background visible max-md:hidden">
              <Skeleton className="w-[150px] h-[20px] rounded-full" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 3 }).map((_, index: number) => (
            <tr
              key={index + 1}
              className="bg-fdfp-bg-white border-b border-fdfp-light text-[1.4rem] font-normal text-center"
            >
              <td className="px-6 py-5 font-bold text-left text-[1.1rem] w-[130px]">
                <Skeleton className="w-[150px] h-[20px] rounded-full max-md:w-full" />
              </td>
              <td className="px-6 py-5 font-bold text-left text-[1.1rem] w-[130px] visible max-md:hidden">
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </td>
              <td className="px-6 py-5 font-bold text-left text-[1.1rem] w-[130px] visible max-md:hidden">
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </td>
              <td className="px-6 py-5 font-bold text-left text-[1.1rem] w-[130px] visible max-md:hidden">
                <Skeleton className="w-[150px] h-[20px] rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}


// Totals section loader
export const ReportTotalLoader = () => {

  return (
    <div className='flex flex-1 gap-2'>
      {Array.from({ length: 4 }).map((_, index: number) => (
        <div className='flex flex-1 flex-col text-right gap-1 items-end' key={index}>
          <Skeleton className='w-[90%] h-[20px]' />
          <Skeleton className='w-[70%] h-[20px]' />
        </div>
      ))}
    </div>
  );
}