import { TLink } from "@/types/navigation.type";
import Link from "next/link";

export default function ReportCard({ href, name, icon }: TLink) {
  const ReportCardIcon = icon;
  return (
    <Link href={href} className="report-card">
      <ReportCardIcon className="w-14 text-fdfp-main" />
      <p className="font-normal text-[1.4rem]">{name}</p>
    </Link>
  );
}
