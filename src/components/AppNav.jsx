import { Link, useLocation } from "react-router-dom";
import styles from "./AppNav.module.css";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";
import { routes } from "../config/routes";

export const AppNav = () => {
  const { pathname } = useLocation();
  const [currentFilter, setCurrentFilter] = useState(pathname);

  useEffect(() => {
    setCurrentFilter(pathname);
  }, [pathname]);

  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link to={routes.chooseTrip}>
            <Button active={"/app/choose-trip" === currentFilter} version="nav">
              Choose trip
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/app/choose-trip/new-trip">
            <Button
              active={"/app/choose-trip/new-trip" === currentFilter}
              version={"nav"}
            >
              Create new trip
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/app/map">
            <Button active={"/app/map" === currentFilter} version={"nav"}>
              Search on the map
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/app/weather">
            <Button active={"/app/weather" === currentFilter} version={"nav"}>
              Check weather
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
