import type { AppProps } from 'next/app';
import '../styles/config.css';
import '../styles/tokens.css';
import '../styles/globals.css';

function LaundryDayApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default LaundryDayApp;
