import { TReportListLink } from "../navbar/report.model";
import ReportCard from "./report-card";

export default function ReportList({ links }: TReportListLink) {
  return (
    <div className="report-list-container">
      {links.map(({ href, name, active, icon }) => {
        return (
          <ReportCard
            key={name}
            href={href}
            name={name}
            active={active}
            icon={icon}
          />
        );
      })}
    </div>
  );
}
