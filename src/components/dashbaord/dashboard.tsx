import DashboardHeader from "./dashboard-header";
import DashboardPart1 from './dashboard-part-1';
import DashboardPart2 from './dashboard-part-2';

import React from 'react';
// import DashboardPart3 from './dashboard-part-3';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <div className="dashboard__maintainer">
        <DashboardPart1 />
        <DashboardPart2 />
        {/* <DashboardPart3 /> */}
      </div>
    </>
  );
}
