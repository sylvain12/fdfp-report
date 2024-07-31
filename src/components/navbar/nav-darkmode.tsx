"use client";

import { useDarkModeStore } from "@/store/navs.store";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function NavDarkMode() {
  const { isDark, toggleMode } = useDarkModeStore();

  return (
    <div
      onClick={toggleMode}
      className="nav-darkmode border-r-fdfp-textsecond  bg-fdfp-second text-white cursor-pointer"
    >
      {isDark ? (
        <SunIcon className="w-12 font-bold" />
      ) : (
        <MoonIcon className="w-12 font-bold" />
      )}
    </div>
  );
}
