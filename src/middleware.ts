import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const TABLETOSHOW = "tableToShow";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (
    request.nextUrl.pathname.includes("training-plans-and-actions") ||
    response.url.includes("training-plans-and-actions")
  ) {
    response.cookies.set(TABLETOSHOW, "3");
  }

  if (
    request.nextUrl.pathname.includes("approved-training-and-study-projects") ||
    response.url.includes("approved-training-and-study-projects")
  ) {
    response.cookies.set(TABLETOSHOW, "2");
  }

  if (
    request.nextUrl.pathname.includes("liquidation-of-training-plans") ||
    response.url.includes("liquidation-of-training-plans")
  ) {
    response.cookies.set(TABLETOSHOW, "1");
  }

  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/reports/refunds-and-settlements/",
// };
