import { TLink } from "@/types/navigation.type";
import {
  ChartBarSquareIcon,
  DocumentMagnifyingGlassIcon,
  PresentationChartLineIcon,
  BanknotesIcon,
  HomeIcon,
  ListBulletIcon,
  CursorArrowRaysIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  InboxStackIcon,
  ChartPieIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { stringify } from "querystring";

// Main navivagation
const mainNavs: TLink[] = [
  { name: "Acceuil", href: "/", icon: HomeIcon, active: true },
  {
    name: "Rapports",
    href: "/reports/training-plans-and-actions",
    icon: ChartBarSquareIcon,
    active: false,
  },
];


// 
const globalAnalyzeNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/global-analyze/details/?${stringify({
      name: "plan de formation",
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formation"],
  },
  {
    name: "Actions de formations",
    href: `/reports/global-analyze/details?name=${"actions de formations"}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations"],
  },
  {
    name: "Projets de formations",
    href: `/reports/global-analyze/details?name=${"projets de formations"}`,
    active: false,
    icon: InboxStackIcon,
    query: ["projets de formations"],
  },
  {
    name: "Entreprises",
    href: `/reports/global-analyze/details?name=${"entreprises"}`,
    active: false,
    icon: BuildingLibraryIcon,
    query: ["entreprises"],
  },
  {
    name: "Cabinets de formations",
    href: `/reports/global-analyze/details?name=${"cabinets de formations"}`,
    active: false,
    icon: ScaleIcon,
    query: ["cabinets de formations"],
  },
];

export {
  globalAnalyzeNavs,
  mainNavs,
};
