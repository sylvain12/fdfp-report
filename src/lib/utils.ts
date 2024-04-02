import { reportNavPathTitle } from "@/components/reports/data/nav-data";

export const getReportPathLink = (pathname: string) =>
  pathname.split("/").slice(0, 3).join("/");

export const getReportPathDetails = (pathname: string) => {
  const parts = pathname.split("/").slice(1);
  const pathKey = parts[1];
  return {
    name: reportNavPathTitle[pathKey],
    href: getReportPathLink(pathname),
  };
};

export const parseCookie = (cookie: string) => {
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
export const buildPagination = (data: {}[], size: number = 5) => {
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

/**
 * Flattens an array of arrays into a single-dimensional array.
 * @param {any[]} arr - The array of arrays to flatten.
 * @returns {any[]} - The flattened single-dimensional array.
 */
export const flattenArray = (arr: any[]): any[] => {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    []
  );
};

// export { getReportPathDetails, parseCookie, buildPagination };
