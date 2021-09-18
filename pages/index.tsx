import Head from 'next/head';
import Link from 'next/link';
import dayjs from '../lib/dayjs';
import { GetServerSideProps } from 'next';
import type { Booking } from '../data/commonTypes';
import Routes from '../data/routes';
import {
  getAvailableHours,
  slotsPerDay,
  getDayName,
  getWeekDates,
} from '../lib/calendar';
import { isWithinRange } from '../lib/utils';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import UtzList from '../components/utzList';
import styleUtil from '../styles/utils/space.module.css';

export default function Home({ bookings }: { bookings: Booking[] }) {
  const thisWeekNum = dayjs().isoWeek();
  const weekRange = [thisWeekNum, thisWeekNum + 2];
  const weeklyCalendar: WeeklyDates[] = getWeekDates(weekRange).map(
    (dates, index) => ({
      week: thisWeekNum + index,
      dates,
    })
  );
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
          {weeklyCalendar
            .filter(function filterThreeWeeks(weeklyDates: WeeklyDates) {
              return isWithinRange(weekRange, weeklyDates.week);
            })
            .map((weeklyDates: WeeklyDates) => {
              const bookingsThisWeek = bookings.filter(
                (b: Booking) => b.week === weeklyDates.week
              );
              return (
                <div key={weeklyDates.week}>
                  <h3>
                    Week {weeklyDates.week} ({bookingsThisWeek.length})
                  </h3>
                  <UtzList>
                    {weeklyDates.dates.map((date: Date) => {
                      const bookingsThisDay = bookingsThisWeek.filter(
                        (booking: Booking) =>
                          dayjs(date).isSame(dayjs(booking.date), 'day')
                      );
                      const dailyUtzRatio = getDailyUtz(bookingsThisDay);
                      const dailyUtzPercent = Math.round(
                        100 - dailyUtzRatio * 100
                      );
                      return (
                        <UtzList.Item
                          key={date.toString()}
                          utz={dailyUtzPercent}
                        >
                          {getDayName(date)} ({bookingsThisDay.length}) (
                          {dailyUtzRatio})
                        </UtzList.Item>
                      );
                    })}
                  </UtzList>
                </div>
              );
            })}

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

function getDailyUtz(bookings: Booking[]): number {
  const hoursLeft = getAvailableHours(
    bookings.map((b: Booking) => b.hourRange)
  );
  return (hoursLeft.length - 1) / slotsPerDay;
}

type WeeklyDates = {
  week: number;
  dates: Date[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/bookings/');
  const bookings: Booking[] = await res.json();

  return {
    props: {
      bookings,
    },
  };
};
