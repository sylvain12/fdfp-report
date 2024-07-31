"use client";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { mainNavs } from "../reports/data/nav-data";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useWindowClick, useWindowSize } from "@/hooks/window.hook";
import { useNavMobileStore } from "@/store/navs.store";
import { useEffect } from "react";

const getPathRoute = (path: string) => {
  return path.split("/").slice(1)[0].trim();
};

export default function NavMobile() {
  const navs = [...mainNavs];
  const pathname = usePathname();
  const windowSize = useWindowSize();
  const { isVisible, resetVisibility } = useNavMobileStore();
  const windowElement = useWindowClick();

  console.log(windowElement);

  useEffect(() => {
    if (windowSize.width > 1024) resetVisibility();
  }, [windowSize.width]);

  return (
    <div
      className={clsx("nav-mobile", {
        invisible:
          windowSize.width >= 1024 || (windowSize.width < 1024 && !isVisible),
      })}
    >
      <div className="nav-mobile-section">
        {navs.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              className={clsx("nav-mobile-link", {
                active:
                  pathname.length > 1
                    ? getPathRoute(pathname) === getPathRoute(link.href)
                    : pathname === link.href,
              })}
              title={link.name}
              key={link.name}
              href={link.href}
            >
              <LinkIcon className="w-14" />
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="nav-mobile-section">
        <Link className="nav-mobile-link text-fdfp-second" href="/">
          <AdjustmentsHorizontalIcon className="w-14" />
          Adminitration
        </Link>
      </div>
    </div>
  );
}
