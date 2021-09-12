import Head from 'next/head';
import Link from 'next/link';
import Routes from '../data/routes';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import styleUtil from '../styles/utils/space.module.css';

export default function Overview() {
  return (
    <>
      <Head>
        <title>Overview | Laundry Day</title>
        <meta name="description" content="Log in to Laundry App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Text.Prose className={styleUtil.mt3}>
          <h2>Overview</h2>
          <Link href={Routes.Calendar}>Calendar</Link>
        </Text.Prose>
      </Container>
      <Footer />
    </>
  );
}
