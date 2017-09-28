import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./modal.scss";

export default function Modal({ display, children }) {
  return (
    <div className={classnames({ [styles.hidden]: !display })}>
      <div className={styles.overlay} />
      <div className={`${styles.modal} ${styles.center}`}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  display: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};
