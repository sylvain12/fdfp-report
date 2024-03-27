import { reportNavPathTitle } from "@/app/reports/[slug]/nav-data";

const getReportPathLink = (pathname: string) =>
  pathname.split("/").slice(0, 3).join("/");

const getReportPathDetails = (pathname: string) => {
  const parts = pathname.split("/").slice(1);
  const pathKey = parts[1];
  return {
    name: reportNavPathTitle[pathKey],
    href: getReportPathLink(pathname),
  };
};

export { getReportPathDetails };
