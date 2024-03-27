import {
  ArrowLeftStartOnRectangleIcon,
  SunIcon,
  MoonIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NavDarkMode() {
  return (
    <div className="nav-logout border-r-fdfp-bg border-r bg-fdfp-second">
      <Link href={""}>
        <MoonIcon className="w-12 text-white font-bold" />
      </Link>
    </div>
  );
}
