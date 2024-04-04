import { EDashboardView, useDashboardStore } from "@/store/dashboard.store";
import clsx from "clsx";

export default function DashboardViewMenu() {
  const { view, setView } = useDashboardStore();

  return (
    <>
      <div className="flex items-center gap-1 bg-white p-2 rounded-[.425em] border-fdfp-main border-none text-[1.1rem] font-normal">
        <div
          onClick={() => setView(1)}
          className={clsx(
            "px-4 py-2 rounded-xs cursor-pointer rounded-[.425em] transition",
            {
              "bg-fdfp-main text-white": view == EDashboardView.TRAINING_PLAN,
            }
          )}
        >
          Plan de formations
        </div>
        <div
          onClick={() => setView(2)}
          className={clsx(
            "px-4 py-2 rounded-xs cursor-pointer rounded-[.425em] transition",
            {
              "bg-fdfp-main text-white": view == EDashboardView.TRAINING_ACTION,
            }
          )}
        >
          Action de formations
        </div>
      </div>
    </>
  );
}
