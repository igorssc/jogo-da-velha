import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary";
  small?: boolean;
}

export const Button = ({
  scheme = "primary",
  small = false,
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        {...props}
        className={`${styles.button} ${styles[scheme]} ${
          small && styles.small
        }`}
      />
    </>
  );
};
