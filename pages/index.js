import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';

export default function Home() {
  return (
    <>
      <Head>
        <title>Laundry Day</title>
        <meta name="description" content="Get shit washed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <h1>Let's get shit washed!</h1>
      </Container>
      <Footer />
    </>
  );
}
