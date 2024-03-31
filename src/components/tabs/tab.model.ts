import { ReactElement, ReactNode } from "react";

export type TabVariant = "unstyled" | "styled";

export type TabListProps = {
  children: ReactNode;
};

export type TabProps = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export type TabPanelsProps = {
  children: ReactElement<TabPanelProps>[];
  initialIndex: number;
};

export type TabPanelProps = {
  children: ReactNode;
  isActive: boolean;
};
