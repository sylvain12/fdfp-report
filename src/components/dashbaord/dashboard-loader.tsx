import { Skeleton } from "@/components/ui/skeleton";
import React from 'react';

export function SkeletonCard() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index: number) => (
        <Skeleton
          key={index}
          className="h-[100px] flex-1 rounded-xl col-span-1 w-full"
        />
      ))}
    </>
  );
}

export function DashboardArcordionLoader({api='api'}: {api: string}) {
  return (
    <div className="flex gap-[2rem] flex-wrap items-center">
      {Array.from({ length: 4 }).map((_, index: number) => (
        <div key={`${api}-${index}`} className="flex flex-col basis-[230px] gap-3">
          <Skeleton className="h-[10px] w-[100px] rounded-xl" />
          <Skeleton className="h-[15px] w-[170px] rounded-xl" />
        </div>
      ))}
    </div>
  );
}

export function DashboardMapLoader() {
  return (
    <div className='flex items-center justify-center w-full pt-6'>
      <Skeleton className="h-[400px] w-[400px] rounded-xl" />
    </div>
  );
}