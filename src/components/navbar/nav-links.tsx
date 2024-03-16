"use client";

import Link from "next/link";
import {
  HomeIcon,
  ChartBarSquareIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { TLink } from "@/types/navigation.type";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links: TLink[] = [
  { name: "Acceuil", href: "/", icon: HomeIcon, active: true },
  {
    name: "Rapports",
    href: "/reports",
    icon: ChartBarSquareIcon,
    active: false,
  },
  {
    name: "A propos",
    href: "reports",
    icon: InformationCircleIcon,
    active: false,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="nav-main-menu">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className={clsx("nav-main-menu-link", {
              active: pathname === link.href,
            })}
            title={link.name}
            key={link.name}
            href={link.href}
          >
            <LinkIcon className="w-10" />
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
