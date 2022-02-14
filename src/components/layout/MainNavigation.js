import { NavLink, Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div >
        <Link to="/quotes" className={classes.logo}>
          Great Quotes
        </Link>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" activeClassName={classes.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quote" activeClassName={classes.active}>
              Add A Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
