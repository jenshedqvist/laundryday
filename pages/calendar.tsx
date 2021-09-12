import Head from 'next/head';
import Link from 'next/link';
import ROUTES from '../constants/routes';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import styleUtil from '../styles/utils/space.module.css';

export default function Calendar() {
  return (
    <>
      <Head>
        <title>Calendar | Laundry Day</title>
        <meta name="description" content="Log in to Laundry App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Text.Prose className={styleUtil.mt3}>
          <h2>Calendar</h2>
        </Text.Prose>
      </Container>
      <Footer />
    </>
  );
}
