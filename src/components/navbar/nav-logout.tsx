import {
  ArrowLeftStartOnRectangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NavLogout() {
  return (
    <div className="nav-logout border-r-fdfp-bg border-r bg-fdfp-second">
      <Link href={""}>
        <PowerIcon className="w-12 text-white" />
      </Link>
    </div>
  );
}
