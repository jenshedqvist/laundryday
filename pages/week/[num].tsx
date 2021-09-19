import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import dayjs from '../../lib/dayjs';
import { UserContext } from '../../contexts/User';
import type { Booking } from '../../data/commonTypes';
import Routes from '../../data/routes';
import { getWeekDates } from '../../lib/calendar';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Container from '../../components/container';
import CalendarView, { WeeklyDates } from '../../containers/calendarView';

export default function WeekView({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const routerWeek = Number(router.query.num);
  const { isAuthenticated } = React.useContext(UserContext);

  if (process.browser && !isAuthenticated) {
    // Quick fix for Next choking on router being called on server
    router.push(
      `/${Routes.Login}?redirect=${`/${Routes.Calendar}/${routerWeek}`}`
    );
  }

  const currentWeekNum = dayjs().isoWeek();
  const weekRange = [currentWeekNum, routerWeek + 2];
  const weeklyCalendar: WeeklyDates[] = getWeekDates(weekRange).map(
    (dates, index) => ({
      week: weekRange[0] + index,
      dates,
    })
  );

  return (
    <>
      <Head>
        <title>Week {routerWeek} | Laundry Day</title>
        <meta name="description" content={`Bookings for week ${routerWeek}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <CalendarView bookings={bookings} weeklyCalendar={weeklyCalendar} />
      </Container>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/bookings/');
  const bookings: Booking[] = await res.json();

  return {
    props: {
      bookings,
    },
  };
};
