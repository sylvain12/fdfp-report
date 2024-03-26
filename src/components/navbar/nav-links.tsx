"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { mainNavs } from "@/app/reports/[slug]/nav-data";
import { usePathname } from "next/navigation";

const getPathRoute = (path: string) => {
  return path.split("/").slice(1)[0].trim();
};

export default function NavLinks() {
  const navs = [...mainNavs];
  const pathname = usePathname();

  return (
    <div className="nav-main-menu">
      {navs.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className={clsx("nav-main-menu-link", {
              active:
                pathname.length > 1
                  ? getPathRoute(pathname) === getPathRoute(link.href)
                  : pathname === link.href,
            })}
            title={link.name}
            key={link.name}
            href={link.href}
          >
            {/* <LinkIcon className="w-10" /> */}
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
