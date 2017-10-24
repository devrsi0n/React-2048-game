import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.scss";
import github from "../../assets/images/github-white.png";
import i18n from "../../utils/i18n";

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header className={styles.header}>
    <nav>
      <ul className={styles.row}>
        <li className={styles.title}>
          {/* eslint-disable jsx-a11y/anchor-is-valid */}
          <Link to="/">{i18n.home}</Link>
        </li>
        <li className={styles.link}>
          <Link to="/comments">{i18n.comments}</Link>
        </li>
        <li className={styles.spacer} />
        <li>
          <a
            href="https://github.com/devrsi0n/React-2048-game"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="github repo" className={styles.icon} />
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
