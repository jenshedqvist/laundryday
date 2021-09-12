import styles from './footer.module.css';

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Footer({ children, ...restProps }: FooterProps) {
  return (
    <footer className={styles.footer} {...restProps}>
      {children}
    </footer>
  );
}
