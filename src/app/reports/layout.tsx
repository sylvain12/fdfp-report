import { Suspense } from "react";
import ReportNav from "./report-nav";
import Loader from "@/components/animation/loader";

const ReportLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="report-container">
      <ReportNav />
      {children}
    </div>
  );
};

export default ReportLayout;
