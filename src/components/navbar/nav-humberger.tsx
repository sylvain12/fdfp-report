"use client";

import { Icon } from "@iconify/react";
import { useState } from "react";

export default function NavHumberger() {
  const [isToogle, toggleHamberger] = useState<boolean>(false);

  return (
    <div
      onClick={() => toggleHamberger(!isToogle)}
      className="border-l cursor-pointer p-4 w-full h-full flex items-center justify-center hover:bg-fdfp-bgsecond transition"
    >
      {isToogle ? (
        <Icon icon="prime:times" width="40px" />
      ) : (
        <Icon icon="solar:hamburger-menu-outline" width="40px" />
      )}
    </div>
  );
}
