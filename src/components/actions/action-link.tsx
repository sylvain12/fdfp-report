import { TLink } from "@/types/navigation.type";
import { PrinterIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const actionsNavs: TLink[] = [
  {
    name: "Imprimer",
    href: "",
    active: true,
    icon: PrinterIcon,
  },
  //   {
  //     name: "Export csv",
  //     href: "",
  //     active: false,
  //     icon: ArrowDownTrayIcon,
  //   },
];

export default function ActionLink() {
  return (
    <div className="flex items-center justify-end h-full gap-10">
      {/* {actionsNavs.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            className="gap-4 h-full text-[1.2rem] uppercase flex items-center justify-end text-fdfp-main font-semibold"
            key={link.name}
            href={link.href}
          >
            <LinkIcon className="w-8 text-fdfp-text" />
            {link.name}
          </Link>
        );
      })} */}
      {/* 
      <button className="btn btn-icon btn-main-transparent uppercase">
        <ArrowDownTrayIcon className="w-8" />
        Export Excel
      </button> */}

      <button className="btn btn-icon btn-main uppercase">
        <ArrowDownTrayIcon className="w-8" />
        Exporter
      </button>
    </div>
  );
}
