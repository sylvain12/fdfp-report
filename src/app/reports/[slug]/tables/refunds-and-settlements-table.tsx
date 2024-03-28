import ActionLink from "@/components/actions/action-link";
import { TReportDetails } from "../../report.model";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function RefundsAndSettlementsTable({
  title,
  tables,
  summary,
}: TReportDetails) {
  return (
    <div>
      <div className="flex items-end justify-end gap-[4rem] bg-white mt-[4rem] px-5 py-10 border-b">
        {/* <h3 className="text-[2.75rem] font-medium flex-1 ml-0 font-serif">
          {title}
        </h3> */}
        {/* Filter year */}
        <div className="flex flex-col gap-2 text-[1.4rem]">
          <label htmlFor="" className="font-medium">
            Année
          </label>
          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            data-dropdown-placement="bottom"
            className="w-[100px] border border-fdfp-text font-light text-[1.4rem] px-5 py-3 text-center inline-flex items-center justify-between gap-[1.2rem]"
            type="button"
          >
            ...
            <ChevronDownIcon className="w-6" />
          </button>

          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdownSearch"
            className="z-10 hidden bg-white rounded-lg shadow w-6"
          >
            <ul
              className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              <li>
                <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <label
                    htmlFor="checkbox-item-17"
                    className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Roberta Casas
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Filter Status */}
        <div className="flex flex-col gap-2 text-[1.4rem]">
          <label htmlFor="" className="font-medium">
            Montant proposé en remboursement selon:
          </label>
          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            data-dropdown-placement="bottom"
            className="border border-fdfp-text font-light text-[1.4rem] px-5 py-3 text-center inline-flex items-center justify-between gap-[1.2rem]"
            type="button"
          >
            Veuillez faire votre selection <ChevronDownIcon className="w-6" />
          </button>

          {/* <!-- Dropdown menu --> */}
          <div
            id="dropdownSearch"
            className="z-10 hidden bg-white rounded-lg shadow w-6"
          >
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-8" />
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search user"
                />
              </div>
            </div>
            <ul
              className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              <li>
                <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <label
                    htmlFor="checkbox-item-17"
                    className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                  >
                    Roberta Casas
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <button className="btn btn-icon btn-main-transparent btn-main uppercase">
          Charger
          <ArrowPathIcon className="w-8" />
        </button>

        <div className="flex-1 mr-0">
          <ActionLink />
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-right rtl:text-right">
          <thead className="text-[1.2rem] bg-white border-b border-fdfp-light">
            <tr>
              <th scope="col" className="px-6 py-6 text-left">
                Entités
              </th>
              <th scope="col" className="px-6 py-6">
                Nombre Actions Agréées
              </th>
              <th scope="col" className="px-6 py-6">
                Nombre Actions Demandées
              </th>
              <th scope="col" className="px-6 py-6">
                Part Action Demandées
              </th>
              <th scope="col" className="px-6 py-6">
                Montant Total Agréé/Action
              </th>
              <th scope="col" className="px-6 py-6">
                % Agrée
              </th>
              <th scope="col" className="px-6 py-6">
                Montant Total Demandé
              </th>
              <th scope="col" className="px-6 py-6">
                % Demander
              </th>
              <th scope="col" className="px-6 py-6">
                Montant Total Proposé/Action
              </th>
              <th scope="col" className="px-6 py-6">
                % Proposer
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b text-[1.5rem] font-thin text-right">
              <th
                scope="row"
                className="px-6 py-8 font-normal whitespace-nowrap text-left"
              >
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-8">2041</td>
              <td className="px-6 py-8">603</td>
              <td className="px-6 py-8">29.54%</td>
              <td className="px-6 py-8">2170805942</td>
              <td className="px-6 py-8">10.89%</td>
              <td className="px-6 py-8">549263255</td>
              <td className="px-6 py-8">013.00%</td>
              <td className="px-6 py-8">104943000</td>
              <td className="px-6 py-8">6.88%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
