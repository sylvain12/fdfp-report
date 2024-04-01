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

const parseCookie = (cookie: string) => {
  const result = Object.create(null);
  const cookieArr = cookie.split(";").map((cookie: string) => {
    return cookie.trim().split("=");
  });

  cookieArr.forEach((item) => {
    const [key, value] = item;
    result[key] = parseInt(value);
  });

  return result;
};

/**
 * Builds pagination for a given array of data.
 * @param {Object[]} data - The array of data to paginate.
 * @param {number} [size=5] - The number of items per page.
 * @returns {{ totalPages: number, pageData: any[] }} - An object containing the total number of pages and paginated data.
 */
const buildPagination = (data: {}[], size: number = 5) => {
  if (data === null || typeof data === "string") {
    return { totalPages: 0, pageData: null };
  }
  const paginationData = [...data];
  const results = [];
  while (paginationData.length > 0) {
    results.push(paginationData.splice(0, size));
  }

  return { totalPages: results.length, pageData: results };
};

export { getReportPathDetails, parseCookie, buildPagination };
