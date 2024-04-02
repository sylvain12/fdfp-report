import ReportNav from "@/components/reports/report-nav";

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
