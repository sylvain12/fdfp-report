import { TLink } from "@/types/navigation.type";

type TBreadcrumbItem = {
  title: string;
  link: TLink;
  isCurrent?: boolean;
  showIcon?: boolean;
};

type TBreadcrumb = {
  separator: string;
  items: TBreadcrumbItem[];
};

export type { TBreadcrumbItem, TBreadcrumb };
