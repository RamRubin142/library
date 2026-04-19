import styles from "./ThemeButton.module.css";

type Props = {
  mode: "light" | "dark";
  toggle: () => void;
};

export const ThemeButton = ({ mode, toggle }: Props) => {
  return (
    <div className={styles.switchWrapper}>
      <label className={styles.switch}>
        <input type="checkbox" checked={mode === "dark"} onChange={toggle} />

        <div className={styles.slider}>
          <div className={styles.sunMoon}>
            <div className={styles.moonDot} />
            <div className={styles.moonDot} />
            <div className={styles.moonDot} />
          </div>

          <div className={styles.stars}>
            <div className={styles.star} />
            <div className={styles.star} />
            <div className={styles.star} />
            <div className={styles.star} />
          </div>
        </div>
      </label>
    </div>
  );
};