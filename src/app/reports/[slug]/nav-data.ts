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
    href: `/reports/global-analyze/tables/?${stringify({
      name: "plan de formation",
      year: 2023,
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formation", "2024"],
  },
  {
    name: "Actions de formations",
    href: `/reports/global-analyze/tables?name=${"actions de formations"}`,
    active: false,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations", "2024"],
  },
  {
    name: "Projets de formations",
    href: `/reports/global-analyze/tables?name=${"projets de formations"}`,
    active: true,
    icon: InboxStackIcon,
    query: ["projets de formations", "2024"],
  },
  {
    name: "Entreprises",
    href: `/reports/global-analyze/tables?name=${"entreprises"}`,
    active: true,
    icon: BuildingLibraryIcon,
    query: ["entreprises", "2024"],
  },
  {
    name: "Cabinets de formations",
    href: `/reports/global-analyze/tables?name=${"cabinets de formations"}`,
    active: true,
    icon: ScaleIcon,
    query: ["cabinets de formations", "2024"],
  },
];

const applicationsAndApprovalsNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/applications-and-approvals/tables?${stringify({
      name: "plan de formation",
      year: 2023,
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formation", "2024"],
  },
  {
    name: "Actions de formations",
    href: `/reports/applications-and-approvals/tables?name=${"actions de formations"}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["actions de formations", "2024"],
  },
  {
    name: "Nombre de stagiaires par action",
    href: `/reports/applications-and-approvals/tables?name=${stringify({
      name: "Nombre de stagiaires par action",
    })}`,
    active: true,
    icon: ChartPieIcon,
    query: ["Nombre de stagiaires par action", "2024"],
  },
  {
    name: "Domaine de formations",
    href: `/reports/applications-and-approvals/tables/?${stringify({
      name: "Domaine de formations",
    })}`,
    active: true,
    icon: PuzzlePieceIcon,
    query: ["Domaine de formations", "2024"],
  },
  {
    name: "Cabinets de formations",
    href: `/reports/applications-and-approvals/tables/?${stringify({
      name: "Cabinets de formations",
    })}`,
    active: true,
    icon: ScaleIcon,
    query: ["Cabinets de formations", "2024"],
  },
  {
    name: "Projets initiés",
    href: `/reports/applications-and-approvals/tables/?${stringify({
      name: "Projets Projets initiés",
    })}`,
    active: true,
    icon: InboxStackIcon,
    query: ["Projets initiés", "2024"],
  },
];

const refundsAndSettlementsNavs: TLink[] = [
  {
    name: "Actions demandés en remboursement",
    href: `/reports/refunds-and-settlements/tables?${stringify({
      name: "Actions demandés en remboursement",
      year: 2023,
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["Actions demandés en remboursement", "2024"],
  },
  {
    name: "Actions liquidées",
    href: `/reports/refunds-and-settlements/tables?name=${"Actions liquidées"}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["Actions liquidées", "2024"],
  },
  {
    name: "Plans liquidés",
    href: `/reports/refunds-and-settlements/tables?name=${"Plans liquidés"}`,
    active: true,
    icon: BookOpenIcon,
    query: ["Plans liquidés", "2024"],
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
