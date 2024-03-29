import ActionLink from "@/components/actions/action-link";
import { TReportDetails } from "../../report.model";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ListBulletIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";

export default function RefundsAndSettlementsTable({
  title,
  tables,
  summary,
}: TReportDetails) {
  return (
    <div>
      <div className="flex items-end justify-end gap-[1rem] bg-white mt-[4rem] px-5 py-10 border-b">
        <form className="flex items-end text-[1.3rem] gap-4">
          <div>
            <label htmlFor="years" className="block font-medium">
              Année
            </label>
            <select
              id="years"
              className="w-[100px] min-w-full border border-fdfp-text text-[1.4rem] px-2 py-3 focus:outline-none hover:outline-none active:outline-none bg-white"
            >
              <option selected>...</option>
              <option value="2021">2021</option>
              <option value="2021">2021</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </div>
          <div>
            <label htmlFor="amounts" className="block font-medium">
              Montant proposé en remboursement selon:
            </label>
            <select
              id="amounts"
              className="w-[100px] min-w-full border border-fdfp-text text-[1.4rem] px-2 py-3 focus:outline-none hover:outline-none active:outline-none bg-white"
            >
              <option selected className="bg-white">
                ...
              </option>
              <option value="2021">2021</option>
              <option value="2021">2021</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </div>
          <button className="btn btn-icon btn-main-transparent btn-main uppercase">
            Charger
            <ArrowPathIcon className="w-8" />
          </button>
        </form>

        <div className="flex-1 mr-0">
          <ActionLink />
        </div>
      </div>

      {/* Table details */}
      <div className="relative overflow-x-auto ">
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
