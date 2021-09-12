import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { Booking, WeeklyUtz } from '../data/commonTypes';
import Routes from '../data/routes';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import styleUtil from '../styles/utils/space.module.css';

export default function Home({ weeklyUtz }: { weeklyUtz: WeeklyUtz[] }) {
  return (
    <>
      <Head>
        <title>Laundry Day</title>
        <meta name="description" content="Get shit washed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Text.Prose className={styleUtil.mt}>
          <h2>Current availability</h2>
          {weeklyUtz.map((utz: WeeklyUtz) => (
            <div key={utz.week}>
              <h3>
                {utz.week} ({utz.bookings.length})
              </h3>
              {utz.bookings.map((b: Booking) => (
                <p key={b.id}>
                  {b.start} {b.end} {b.rooms}
                </p>
              ))}
            </div>
          ))}
          <p>
            <small>(your current bookings not included)</small>
          </p>
          <h3>View and manage your bookings:</h3>
          <p>[Form]</p>
          <p>
            <Link href={`/${Routes.Login}`}>Log in</Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link href={`/${Routes.Register}`}>Create one here</Link>
          </p>
        </Text.Prose>
      </Container>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/bookings/utz');
  const weeklyUtz = await res.json();

  return {
    props: {
      weeklyUtz,
    },
  };
};
