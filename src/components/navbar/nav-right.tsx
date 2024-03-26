import { BellIcon } from "@heroicons/react/24/outline";

export default function NavRight() {
  return (
    <div className="nav-right">
      <div className="nav-right-user">
        <p className="text-[1.3rem] uppercase">Hi, Sylvain</p>
      </div>

      <div className="nav-right-menu">
        <div className="nav-right-menu-item">
          <BellIcon className="w-10" />
          <span className="nav-right-menu-item-span font-manrope">3</span>
        </div>
      </div>
    </div>
  );
}
