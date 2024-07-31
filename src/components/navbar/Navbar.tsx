import NavLinks from "./nav-links";
import NavLogo from "./nav-logo";
import NavDarkMode from "./nav-darkmode";
import NavRight from "./nav-right";
import NavSearch from "./nav-search";
import NavHumberger from "./nav-humberger";
import NavMobile from "./nav-mobile";
// import "./navbar.module.css";

const Navbar = () => {
  return (
    <>
      <NavDarkMode />
      <NavLogo />
      <NavLinks />
      <NavRight />
      <div className="lg:hidden block col-start-1 col-span-1 row-start-1">
        <NavHumberger />
      </div>
      {/* <div className=""> */}
      <NavMobile />
      {/* </div> */}
      {/* <NavSearch /> */}
    </>
  );
};

export default Navbar;
