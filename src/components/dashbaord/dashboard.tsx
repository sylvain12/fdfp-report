import React from "react";
import DashboardHeaderCard from "./dashboard-header-card";
import DashboardTableData from "./dashboard-table-data";
import DashboardHeader from "./dashboard-header";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <DashboardHeaderCard />
      <DashboardTableData />
    </>
  );
}
