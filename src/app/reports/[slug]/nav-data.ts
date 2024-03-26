import { TLink } from "@/types/navigation.type";
import {
  ChartBarSquareIcon,
  DocumentMagnifyingGlassIcon,
  PresentationChartLineIcon,
  BanknotesIcon,
  HomeIcon,
  ListBulletIcon,
  CursorArrowRaysIcon,
  ArchiveBoxIcon,
  BuildingLibraryIcon,
  ScaleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { stringify } from "querystring";

const globalAnalyzeNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/global-analyze?${stringify({
      name: "plan de formation",
      year: 2023,
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formation", "2024"],
  },
  {
    name: "Actions de formations",
    href: `/reports/global-analyze?name=${"actions de formations"}`,
    active: false,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations", "2024"],
  },
  {
    name: "Projets de formations",
    href: `/reports/global-analyze?name=${"projets de formations"}`,
    active: true,
    icon: ArchiveBoxIcon,
    query: ["projets de formations", "2024"],
  },
  {
    name: "Entreprises",
    href: `/reports/global-analyze?name=${"entreprises"}`,
    active: true,
    icon: BuildingLibraryIcon,
    query: ["entreprises", "2024"],
  },
  {
    name: "Cabinets de formations",
    href: `/reports/global-analyze?name=${"cabinets de formations"}`,
    active: true,
    icon: ScaleIcon,
    query: ["cabinets de formations", "2024"],
  },
];

const applicationsAndApprovalsNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/global-analyze?${stringify({
      name: "plan de formation",
      year: 2023,
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formation", "2024"],
  },
  {
    name: "Actions de formations",
    href: `/reports/global-analyze?name=${"actions de formations"}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations", "2024"],
  },
  {
    name: "Nombre de stagiaires par action",
    href: `/reports/global-analyze?name=${stringify({
      name: "Nombre de stagiaires par action",
    })}`,
    active: true,
    icon: UsersIcon,
    query: ["Nombre de stagiaires par action", "2024"],
  },
];

const refundsAndSettlementsNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/global-analyze?${stringify({
      name: "plan de formation",
      year: 2023,
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formation", "2024"],
  },
  {
    name: "Actions de formations",
    href: `/reports/global-analyze?name=${"actions de formations"}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations", "2024"],
  },
];

const reportNavs: TLink[] = [
  {
    name: "Analyse globale",
    href: "/reports/global-analyze",
    active: true,
    icon: PresentationChartLineIcon,
  },
  {
    name: "Demandes et Agréments",
    href: "/reports/applications-and-approvals",
    active: false,
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    name: "Remboursements et liquidations",
    href: "/reports/refunds-and-settlements",
    active: false,
    icon: BanknotesIcon,
  },
];

const mainNavs: TLink[] = [
  { name: "Acceuil", href: "/", icon: HomeIcon, active: true },
  {
    name: "Rapports",
    href: "/reports/global-analyze",
    icon: ChartBarSquareIcon,
    active: false,
  },
];

export {
  globalAnalyzeNavs,
  applicationsAndApprovalsNavs,
  refundsAndSettlementsNavs,
  reportNavs,
  mainNavs,
};
