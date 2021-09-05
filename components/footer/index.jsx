import styles from './footer.module.css';

export default function Footer({ children }) {
  return <header className={styles.footer}>{children}</header>;
}
