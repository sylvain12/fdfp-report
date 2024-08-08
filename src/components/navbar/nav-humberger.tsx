"use client";

import { useNavMobileStore } from "@/store/navs.store";
import { Icon } from "@iconify/react";

export default function NavHumberger() {
  const { isVisible, toogleVisibility } = useNavMobileStore();

  return (
    <div
      onClick={() => toogleVisibility()}
      className="nav-humberger border-r border-fdfp-light cursor-pointer p-4 w-full h-full flex items-center justify-center hover:bg-fdfp-bg-card transition"
    >
      {/* {isVisible ? (
        <Icon icon="prime:times" width="40px" />
      ) : (
        <Icon icon="solar:hamburger-menu-outline" width="40px" />
      )} */}
      <Icon icon="solar:hamburger-menu-outline" width="40px" />
    </div>
  );
}
