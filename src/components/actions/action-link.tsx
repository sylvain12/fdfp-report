import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function ActionLink() {
  return (
    <div className="flex items-center justify-end h-full gap-10">
      <button className="btn btn-icon btn-main uppercase">
        <ArrowDownTrayIcon className="w-8" />
        Exporter
      </button>
    </div>
  );
}
