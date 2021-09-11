import classNames from 'classnames';
import styles from './logo.module.css';

export default function Logo({ animate = false, ...restProps }) {
  return (
    <div
      className={classNames(styles.logo, {
        'is-animated': animate,
      })}
      role="img"
      aria-label="Laundry Day logo"
      {...restProps}
    >
      <div className={styles.laundryCover} />
      <div className={styles.laundry} />
    </div>
  );
}
