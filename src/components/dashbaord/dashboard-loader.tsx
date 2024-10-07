import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-[2rem] w-full">
      {Array.from({ length: 4 }).map((_, index: number) => (
        <Skeleton
          key={index}
          className="h-[100px] flex-1 rounded-xl col-span-1 w-full"
        />
      ))}
    </div>
  );
}


export function DashboardArcordionLoader() {
  return (
    <div className="flex gap-[2rem] flex-wrap items-center">
      {Array.from({ length: 4 }).map((_, index: number) => (
        <div key={index} className="flex flex-col basis-[230px] gap-3">
          <Skeleton key={index} className="h-[10px] w-[100px] rounded-xl" />
          <Skeleton key={index} className="h-[15px] w-[170px] rounded-xl" />
        </div>
      ))}
    </div>
  );
}
