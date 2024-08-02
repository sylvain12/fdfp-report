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
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { stringify } from "querystring";

// Report tabs navs menus
const reportNavs: TLink[] = [
  {
    name: "Plans et actions de formations",
    href: "/reports/training-plans-and-actions",
    active: false,
    icon: DocumentMagnifyingGlassIcon,
  },
  {
    name: "Liquidation des plans de formation",
    href: "/reports/liquidation-of-training-plans",
    active: false,
    icon: BanknotesIcon,
  },
  {
    name: "Projets de formation et d'étude agrées",
    href: "/reports/approved-training-and-study-projects",
    active: false,
    icon: PresentationChartLineIcon,
  },
];

// tab1 navs items
const trainingPlansAndActionsNavs: TLink[] = [
  {
    name: "Plans de formations",
    href: `/reports/training-plans-and-actions/details?${stringify({
      name: "plan de formations",
      table: "PL_FORM",
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["plan de formations"],
    key: "PL_FORM",
  },
  {
    name: "Actions de formations agrées",
    href: `/reports/training-plans-and-actions/details?${stringify({
      name: "Actions de formations agrées",
      table: "ACT_FORM_AGR",
    })}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["Actions de formations agrées"],
    key: "ACT_FORM_AGR",
  },
  {
    name: "Bénéficiaires des actions agrées",
    href: `/reports/training-plans-and-actions/details/?${stringify({
      name: "Bénéficiaires des actions agrées",
      table: "BEN_ACT_AGR",
    })}`,
    active: true,
    icon: ChartPieIcon,
    query: ["Bénéficiaires des actions agrées"],
    key: "BEN_ACT_AGR",
  },
];

// Tab 2 navs items
const liquidationOfTrainingPlansNavs: TLink[] = [
  {
    name: "Actions demandés en remboursement",
    href: `/reports/liquidation-of-training-plans/details?${stringify({
      name: "Actions demandés en remboursement",
      table: "ACT_DMD_REM",
    })}`,
    active: true,
    icon: BanknotesIcon,
    query: ["Actions demandés en remboursement"],
    key: "ACT_DMD_REM",
  },
  {
    name: "Actions liquidées",
    href: `/reports/liquidation-of-training-plans/details?${stringify({
      name: "Actions liquidées",
      table: "ACT_LIQ",
    })}`,
    active: true,
    icon: CursorArrowRaysIcon,
    query: ["Actions liquidées"],
    key: "ACT_LIQ",
  },
  {
    name: "Plans liquidés",
    href: `/reports/liquidation-of-training-plans/details?${stringify({
      name: "Plans liquidés",
      table: "PL_LIQ",
    })}`,
    active: true,
    icon: ListBulletIcon,
    query: ["Plans liquidés"],
    key: "PL_LIQ",
  },
];

// Tabs 3 navs items
const approvedTrainingAndStudyProjectsNavs: TLink[] = [
  {
    name: "Projets de formations agrées",
    href: `/reports/approved-training-and-study-projects/details?${stringify({
      name: "Projets de formations agrées",
      table: "",
    })}`,
    active: false,
    icon: ChartBarIcon,
    query: ["Projets de formations agrées"],
    key: "",
  },
  {
    name: "Projets d'études agrées",
    href: `/reports/approved-training-and-study-projects/details?${stringify({
      name: "Projets d'études agrées",
      table: "",
    })}`,
    active: false,
    icon: ChartBarIcon,
    query: ["Projets d'études agrées"],
    key: "",
  },
];

interface IReportNavPathTitle {
  [key: string]: string;
}

const reportNavPathTitle: IReportNavPathTitle = {
  "training-plans-and-actions": "Plans et actions de formations",
  "liquidation-of-training-plans": "Liquidation des plans de formation",
  "approved-training-and-study-projects":
    "Projets de formation et d'étude agrées",
};

export {
  reportNavs,
  trainingPlansAndActionsNavs,
  liquidationOfTrainingPlansNavs,
  approvedTrainingAndStudyProjectsNavs,
  reportNavPathTitle,
};
