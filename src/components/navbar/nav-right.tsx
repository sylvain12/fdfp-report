import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function NavRight() {
  return (
    <div className="nav-right">
      <div className="nav-right-user">
        <p className="text-[1.3rem] uppercase">Bonjour, FDFP</p>
      </div>

      <div className="nav-right-menu">
        {/* <div className="nav-right-menu-item bg-gray-100">
          <MagnifyingGlassIcon className="w-12 text-fdfp-text opacity-35" />
        </div> */}
        <div className="nav-right-menu-item">
          <BellIcon className="w-10" />
          <span className="nav-right-menu-item-span font-manrope">3</span>
        </div>
      </div>
    </div>
  );
}
