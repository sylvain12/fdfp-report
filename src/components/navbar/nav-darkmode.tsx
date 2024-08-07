"use client";

import { useDarkModeStore } from "@/store/navs.store";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function NavDarkMode() {
  const { isDark, toggleMode } = useDarkModeStore();

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    // const selectedTheme = localStorage.getItem("theme");

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

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
