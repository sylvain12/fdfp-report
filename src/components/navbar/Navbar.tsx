import NavLinks from "./nav-links";
import NavLogo from "./nav-logo";
import NavDarkMode from "./nav-darkmode";
import NavRight from "./nav-right";
import NavSearch from "./nav-search";
// import "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <NavDarkMode />
      <NavLogo />
      <NavLinks />
      <NavRight />
      <NavSearch />
    </>
  );
};

export default Navbar;
