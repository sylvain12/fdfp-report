import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const TABLETOSHOW = "tableToShow";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (
    request.nextUrl.pathname.includes("refunds-and-settlements") ||
    response.url.includes("refunds-and-settlements")
  ) {
    response.cookies.set(TABLETOSHOW, "3");
  }

  if (
    request.nextUrl.pathname.includes("applications-and-approvals") ||
    response.url.includes("applications-and-approvals")
  ) {
    response.cookies.set(TABLETOSHOW, "2");
  }

  if (
    request.nextUrl.pathname.includes("global-analyze") ||
    response.url.includes("global-analyze")
  ) {
    response.cookies.set(TABLETOSHOW, "1");
  }

  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/reports/refunds-and-settlements/",
// };
