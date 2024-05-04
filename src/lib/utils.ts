import { reportNavPathTitle } from "@/components/reports/data/nav-data";
import { Err, Ok, Result } from "@sylvainka12/resultjs";
import { ReadonlyURLSearchParams } from "next/navigation";

// enum ECurrency {
//   DOLLAR = 1,
//   EURO,
//   XOF,
//   POUND,
//   YEN,
// }

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
export const buildPagination = (data: any[], size: number = 5) => {
  if (data === null || typeof data === "string") {
    return { totalPages: 0, pageData: [] };
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

export const currencyFormatter = (amount: number | string) => {
  amount = amount.toString();

  const amountPart = amount.split(".");
  const [amountValue, amountRemain] = amountPart;
  const amountValueArr = amountValue
    .split("")
    .filter((item) => item.trim())
    .reverse();

  const amountResult = [];
  while (amountValueArr.length > 0) {
    amountResult.push(amountValueArr.splice(0, 3));
  }

  const newAmount = amountResult
    .reverse()
    .map((item) => item.join(""))
    .join(",");

  const newRemain = amountRemain || "00";
  return `${newAmount}.${newRemain}`;
};

// URL utils
export const resetPageURL = (
  searchParams: ReadonlyURLSearchParams,
  pathname: string,
  fn: CallableFunction
) => {
  const params = new URLSearchParams(searchParams);
  if (params.get("page")) {
    params.delete("page");
  }
  fn(`${pathname}?${params.toString()}`);
};

export const injectCurrentPage = (
  searchParams: ReadonlyURLSearchParams,
  pathname: string,
  fn: CallableFunction
) => {
  const params = new URLSearchParams(searchParams);
  if (params.get("page") === null) {
    params.set("page", "1");
  }

  fn(`${pathname}?${params.toString()}`);
};

export const getReportEntityName = (value: string) => {
  return value !== null ? value.replaceAll(/[' ', %]/g, "") : "0";
};

// export { getReportPathDetails, parseCookie, buildPagination };
