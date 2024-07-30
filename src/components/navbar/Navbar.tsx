import NavLinks from "./nav-links";
import NavLogo from "./nav-logo";
import NavDarkMode from "./nav-darkmode";
import NavRight from "./nav-right";
import NavSearch from "./nav-search";
import NavHumberger from "./nav-humberger";
// import "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <NavDarkMode />
      <NavLogo />
      <NavLinks />
      <NavRight />
      <div className="lg:hidden block">
        <NavHumberger />
      </div>
      {/* <NavSearch /> */}
    </>
  );
};

export default Navbar;
