"use client";

import Link from "next/link";
import { HomeIcon, ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { TLink } from "@/types/navigation.type";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links: TLink[] = [
  { name: "Acceuil", href: "/", icon: HomeIcon, active: true },
  {
    name: "Rapports",
    href: "/reports",
    icon: ChartBarSquareIcon,
    active: false,
  },
];

const getPathRoute = (path: string) => {
  return path.split("/").slice(1)[0].trim();
};

export default function SidebarLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full justify-center items-cente">
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <Link
            className={clsx(
              `h-[70px] flex flex-col items-center justify-center`,
              {
                "bg-white text-fdfp-main font-normal":
                  pathname.length > 1
                    ? getPathRoute(pathname) === getPathRoute(link.href)
                    : pathname === link.href,
                "text-white":
                  pathname.length > 1
                    ? getPathRoute(pathname) !== getPathRoute(link.href)
                    : pathname !== link.href,
              }
            )}
            title={link.name}
            key={link.name}
            href={link.href}
          >
            <LinkIcon className="w-16" />
            <span className="text-[1.2rem]">{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
