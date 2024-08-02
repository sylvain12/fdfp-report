import { currencyFormatter } from "@/lib/utils";
import { useGetData } from "@/store/table-data.store";
import { Icon } from "@iconify/react";

export default function ReportTableTotals() {
  const { data } = useGetData();
  return (
    <div className="report-details-totals">
      <div className="report-details-totals-items">
        {data !== null &&
          data.totals.map((total) => (
            <div key={total.label} className="report-details-totals-item">
              <p>{total?.label!}</p>
              <span>{currencyFormatter(total.value, " ")}</span>
            </div>
          ))}

        {/* <div className="report-details-totals-item">
          <p>Lorem, ipsum.</p>
          <span>{currencyFormatter("29999009833", " ")}</span>
        </div>
        <div className="report-details-totals-item">
          <p>Lorem, ipsum.</p>
          <span>{currencyFormatter("29999009833", " ")}</span>
        </div>
        <div className="report-details-totals-item">
          <p>Lorem, ipsum.</p>
          <span>{currencyFormatter("29999009833", " ")}</span>
        </div>
        <div className="report-details-totals-item">
          <p>Lorem, ipsum.</p>
          <span>{currencyFormatter("29999009833", " ")}</span>
        </div> */}
      </div>
      <div
        onClick={() => console.log("You clicked me!!!")}
        className="absolute top-[1.5rem] right-[3rem] cursor-pointer"
      >
        <Icon icon="clarity:times-line" width="42" />
      </div>
    </div>
  );
}
