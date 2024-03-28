import {
  ArrowLeftStartOnRectangleIcon,
  SunIcon,
  MoonIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NavDarkMode() {
  return (
    <div className="nav-darkmode border-r-fdfp-textsecond border-r bg-fdfp-second text-white">
      <Link href={""}>
        <MoonIcon className="w-12 font-bold" />
      </Link>
    </div>
  );
}
