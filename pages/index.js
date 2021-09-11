import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import styleUtil from '../styles/utils/space.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Laundry Day</title>
        <meta name="description" content="Get shit washed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <Text.Title>Laundry Day</Text.Title>
      </Header>
      <Container>
        <Text.Prose className={styleUtil.mt} style={{ '--mt': 3 }}>
          <h2>UTZ</h2>
          <p>A quick overview of what's availible the coming weeks</p>
          <p>
            <small>(your current bookings not included)</small>
          </p>
          <h3>View and manage your bookings:</h3>
          <p>[Form]</p>
        </Text.Prose>
      </Container>
      <Footer />
    </>
  );
}
