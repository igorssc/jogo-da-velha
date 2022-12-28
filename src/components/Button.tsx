import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "primary" | "secondary";
}

export const Button = ({ scheme = "primary", ...props }: ButtonProps) => {
  return (
    <>
      <button {...props} className={`${styles.button} ${styles[scheme]}`} />
    </>
  );
};
