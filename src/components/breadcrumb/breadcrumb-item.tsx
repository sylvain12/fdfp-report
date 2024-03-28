import Link from "next/link";
import { TBreadcrumbItem } from "./breadcrumb.model";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const BreadcrumbItem = ({
  title,
  link,
  showIcon,
  isCurrent,
}: TBreadcrumbItem) => {
  const ItemIcon = link.icon;
  return (
    <div
      className={clsx("breadcrumb-item", {
        "font-normal": isCurrent,
        "font-thin": !isCurrent,
      })}
    >
      <Link
        href={link.href}
        className={clsx({
          "uppercase font-bold": isCurrent,
        })}
      >
        {showIcon ? <ItemIcon className="w-10" /> : title}
      </Link>
      {!isCurrent ? <ChevronRightIcon className="w-8" /> : <></>}
    </div>
  );
};

export default BreadcrumbItem;
