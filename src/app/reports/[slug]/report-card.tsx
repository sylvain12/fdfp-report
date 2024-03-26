import { TLink } from "@/types/navigation.type";
import Link from "next/link";

export default function ReportCard({ href, name, icon }: TLink) {
  const ReportCardIcon = icon;
  console.log(icon);
  return (
    <Link href={href} className="report-card">
      {/* <span className="text-[3rem] text-fdfp-main-light font-normal font-manrope">
        324
      </span> */}
      <ReportCardIcon className="w-14 text-fdfp-main" />
      <p className="font-normal text-[1.4rem]">{name}</p>
    </Link>
  );
}
