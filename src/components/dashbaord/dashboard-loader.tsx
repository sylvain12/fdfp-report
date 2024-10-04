import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-center gap-[4rem]">
      {Array.from({ length: 4 }).map((_, index: number) => (
        // <div key={index}>
        <Skeleton key={index} className="h-[100px] w-[180px] flex-1 rounded-xl" />
        // </div>
      ))}
    </div>
  );
}
