import React from "react";
import { TBreadcrumb } from "./breadcrumb.model";
import BreadcrumbItem from "./breadcrumb-item";

const Breadcrumb = ({ items }: TBreadcrumb) => {
  return (
    <div className="breadcrumb max-md:hidden">
      {items.map((item) => (
        <BreadcrumbItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default Breadcrumb;
