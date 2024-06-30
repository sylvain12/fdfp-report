import { TLink } from '@/types/navigation.type';
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
        })}`,
        active: true,
        icon: ListBulletIcon,
        query: ["plan de formations"],
    },
    {
        name: "Actions de formations agrées",
        href: `/reports/training-plans-and-actions/details?name=${stringify({
            name: "Actions de formations agrées"
            })}`,
        active: true,
        icon: CursorArrowRaysIcon,
        query: ["Actions de formations agrées"],
    },
    {
        name: "Bénéficiaires des actions agrées",
        href: `/reports/training-plans-and-actions/details/?${stringify({
        name: "Bénéficiaires des actions agrées",
        })}`,
        active: true,
        icon: ChartPieIcon,
        query: ["Bénéficiaires des actions agrées"],
    },
];


// Tab 2 navs items
const liquidationOfTrainingPlansNavs: TLink[] = [
    {
        name: "Actions demandés en remboursement",
        href: `/reports/liquidation-of-training-plans/details?${stringify({
        name: "Actions demandés en remboursement",
        })}`,
        active: true,
        icon: BanknotesIcon,
        query: ["Actions demandés en remboursement"],
    },
    {
        name: "Actions liquidées",
        href: `/reports/liquidation-of-training-plans/details?${stringify({
        name: "Actions liquidées",
        })}`,
        active: true,
        icon: CursorArrowRaysIcon,
        query: ["Actions liquidées"],
    },
    {
        name: "Plans liquidés",
        href: `/reports/liquidation-of-training-plans/details?${stringify({
        name: "Plans liquidés",
        })}`,
        active: true,
        icon: ListBulletIcon,
        query: ["Plans liquidés"],
    },
];

// Tabs 3 navs items
const approvedTrainingAndStudyProjectsNavs: TLink[] = [
    {
        name: "Projets de formations agrées",
        href: `/reports/approved-training-and-study-projects/details?${stringify({
        name: "Projets de formations agrées",
        })}`,
        active: true,
        icon: ChartBarIcon,
        query: ["Projets de formations agrées"],
    },
    {
        name: "Projets d'études agrées",
        href: `/reports/approved-training-and-study-projects/details?${stringify({
        name: "Projets d'études agrées",
        })}`,
        active: true,
        icon: ChartBarIcon,
        query: ["Projets d'études agrées"],
    },
]

export {
    reportNavs,
    trainingPlansAndActionsNavs,
    liquidationOfTrainingPlansNavs,
    approvedTrainingAndStudyProjectsNavs,
};