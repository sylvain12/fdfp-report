import NavLogo from "../navbar/nav-logo";
import SidebarLinks from "./sidebar-links";

export const Sidebar = () => {
  return (
    <>
      <div className="h-[50px] flex items-center justify-center">
        <NavLogo />
      </div>
      <SidebarLinks />
    </>
  );
};
