import type { AppProps } from 'next/app';
import { UserProvider } from '../contexts/User';
import '../styles/config.css';
import '../styles/tokens.css';
import '../styles/globals.css';

function LaundryDayApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default LaundryDayApp;
