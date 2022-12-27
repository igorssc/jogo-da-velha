import styles from "./Toggle.module.css";

interface ToggleProps {
  isChecked: boolean;
  onToggleSwitchChange: () => any;
}

export const Toggle = ({ isChecked, onToggleSwitchChange }: ToggleProps) => {
  return (
    <>
      <div className={styles.ToggleSwitch}>
        <div className={styles.ToggleSwitch__wrapper}>
          <div
            className={`${styles.Slider} ${isChecked && styles.isChecked}`}
            onClick={onToggleSwitchChange}
          ></div>
        </div>
      </div>
    </>
  );
};
