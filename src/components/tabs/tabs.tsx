import React, { ReactNode, useState } from "react";
import {
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabProps,
} from "./tab.model";

// Tabs component
export const Tabs = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

// TabList component
export const TabList = ({ children }: TabListProps) => {
  return <div className="flex py-[1.2rem] border-b">{children}</div>;
};

// Tab component
export const Tab = ({ children, isActive, onClick }: TabProps) => {
  return (
    <button
      className={`text-[1.3rem] py-6 px-4 text-left flex gap-4 font-normal text-fdfp-text ${
        isActive ? "text-fdfp-main border bg-white rounded-sm" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// TabPanels component
export const TabPanels = ({ children, initialIndex = 0 }: TabPanelsProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="">
      {React.Children.toArray(children).map((child, index) => {
        if (React.isValidElement(child) && child.type === TabPanel) {
          return React.cloneElement<TabPanelProps>(child, {
            isActive: index === activeIndex,
            children: child,
            onClick: () => setActiveIndex(index),
          });
        }
        return null;
      })}
    </div>
  );
};

// TabPanel component
export const TabPanel = ({ children, isActive }: TabPanelProps) => {
  if (!isActive) {
    return null;
  }

  return <div className="bg-white">{children}</div>;
};
