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

const globalAnalyzeNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/global-analyze/details/?${stringify({
      name: "plan de formation",
    })}`,
    active: false,
    icon: ListBulletIcon,
    query: ["plan de formation"],
  },
  {
    name: "Actions de formations",
    href: `/reports/global-analyze/details?name=${"actions de formations"}`,
    active: false,
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

const applicationsAndApprovalsNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/applications-and-approvals/details?${stringify({
      name: "plan de formations",
    })}`,
    active: false,
    icon: ListBulletIcon,
    query: ["plan de formations"],
  },
  {
    name: "Actions de formations",
    href: `/reports/applications-and-approvals/details?name=${"actions de formations"}`,
    active: false,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations"],
  },
  {
    name: "Nombre de stagiaires par action",
    href: `/reports/applications-and-approvals/details/?${stringify({
      name: "Nombre de stagiaires par action",
    })}`,
    active: false,
    icon: ChartPieIcon,
    query: ["Nombre de stagiaires par action"],
  },
  {
    name: "Domaine de formations",
    href: `/reports/applications-and-approvals/details/?${stringify({
      name: "Domaine de formations",
    })}`,
    active: false,
    icon: PuzzlePieceIcon,
    query: ["Domaine de formations"],
  },
  {
    name: "Cabinets de formations",
    href: `/reports/applications-and-approvals/details/?${stringify({
      name: "Cabinets de formations",
    })}`,
    active: false,
    icon: ScaleIcon,
    query: ["Cabinets de formations"],
  },
  {
    name: "Projets initiés",
    href: `/reports/applications-and-approvals/details/?${stringify({
      name: "Projets Projets initiés",
    })}`,
    active: false,
    icon: InboxStackIcon,
    query: ["Projets initiés"],
  },
];

const refundsAndSettlementsNavs: TLink[] = [
  {
    name: "Actions demandés en remboursement",
    href: `/reports/refunds-and-settlements/details?${stringify({
      name: "Actions demandés en remboursement",
    })}`,
    active: false,
    icon: ListBulletIcon,
    query: ["Actions demandés en remboursement"],
  },
  {
    name: "Actions liquidées",
    href: `/reports/refunds-and-settlements/details?name=${"Actions liquidées"}`,
    active: false,
    icon: CursorArrowRaysIcon,
    query: ["Actions liquidées"],
  },
  {
    name: "Plans liquidés",
    href: `/reports/refunds-and-settlements/details?name=${"Plans liquidés"}`,
    active: false,
    icon: BookOpenIcon,
    query: ["Plans liquidés"],
  },
];

const reportNavs: TLink[] = [
  {
    name: "Analyse globale",
    href: "/reports/global-analyze",
    active: false,
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

interface IReportNavPathTitle {
  [key: string]: string;
}

const reportNavPathTitle: IReportNavPathTitle = {
  "global-analyze": "Analyse globale",
  "applications-and-approvals": "Demandes et Agréments",
  "refunds-and-settlements": "Remboursements et liquidations",
};

export {
  globalAnalyzeNavs,
  applicationsAndApprovalsNavs,
  refundsAndSettlementsNavs,
  reportNavs,
  mainNavs,
  reportNavPathTitle,
};
