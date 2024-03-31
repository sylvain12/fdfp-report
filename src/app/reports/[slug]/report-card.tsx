import { useGetData } from "@/store/table-data.store";
import { TLink } from "@/types/navigation.type";
import Link from "next/link";

export default function ReportCard({ href, name, icon }: TLink) {
  const ReportCardIcon = icon;
  const { resetTable } = useGetData();
  return (
    <Link onClick={() => resetTable()} href={href} className="report-card">
      <ReportCardIcon className="w-14 text-fdfp-main" />
      <p className="font-normal text-[1.4rem]">{name}</p>
    </Link>
  );
}
