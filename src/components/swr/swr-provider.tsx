"use client";

import { SWRConfig } from "swr";
import Fallback from "../errors/fallback";
export const SWRProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SWRConfig
      value={{
        suspense: true,
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
        onError: (error, key) => {
          console.log(error);
        },
        fallback: <Fallback />,
        fallbackData: "",
      }}
    >
      {children}
    </SWRConfig>
  );
};
