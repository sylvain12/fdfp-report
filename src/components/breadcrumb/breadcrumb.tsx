import React from "react";
import { TBreadcrumb } from "./breadcrumb.model";
import BreadcrumbItem from "./breadcrumb-item";

const Breadcrumb = ({ separator, items }: TBreadcrumb) => {
  return (
    <div className="breadcrumb">
      {items.map((item) => (
        <BreadcrumbItem key={item.title} {...item} />
      ))}
    </div>
  );
};

export default Breadcrumb;
