/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export const Button = ({
  children,
  onClickFunction,
  version,
  isDisabled,
  style, // do wywalenia na rzecz className
  active,
  className,
}) => {
  return (
    <button
      style={style}
      className={`${styles.reusableButton} ${styles[version]} ${
        styles[active && `active${version}`]
      } ${className}`}
      onClick={onClickFunction}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
