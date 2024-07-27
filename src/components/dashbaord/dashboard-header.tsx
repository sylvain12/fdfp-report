import DashboardViewMenu from "./dashboard-view-menu";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between flex-col items-start tablet:items-center tablet:mb-[9rem] tablet:flex-row">
      <div className="mb-6 tablet:mb-0">
        <span className="bg-fdfp-second text-white text-[1.2rem] inline-block mb-2 font-medium py-1 px-2 rounded-md">
          Année en cours: 2021
        </span>
        <h1 className="font-normal text-[3.5rem] text-fdfp-main">
          Tableau de bord
        </h1>
        <p className="font-normal text-fdfp-main text-[1.2rem]">
          Des analyses globales
        </p>
      </div>
      <DashboardViewMenu />
    </div>
  );
}
