import Container from '../container';
import Logo from '../logo';
import styles from './header.module.css';

export default function Header({ children }) {
  return (
    <header className={styles.header}>
      <Container>
        <Logo />
        {children}
      </Container>
    </header>
  );
}
