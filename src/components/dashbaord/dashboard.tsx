import DashboardHeader from "./dashboard-header";
import DashboardPart1 from './dashboard-part-1';
import DashboardPart2 from './dashboard-part-2';
import React from 'react';

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <div className='flex mt-8'>
        <DashboardPart1 />
        <DashboardPart2 />
      </div>
    </>
  );
}
