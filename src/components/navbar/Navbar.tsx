import NavLinks from "./nav-links";
import NavLogo from "./nav-logo";
import NavLogout from "./nav-logout";
import NavRight from "./nav-right";
import NavSearch from "./nav-search";
// import "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <NavLogout />
      <NavLogo />
      <NavLinks />
      <NavRight />
      <NavSearch />
    </>
  );
};

export default Navbar;
