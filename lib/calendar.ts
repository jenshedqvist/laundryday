import dayjs from './dayjs';
import type { HourRange } from '../data/commonTypes';
import { createNumberRange, groupBy } from '../lib/utils';

export const minBookableDurationHours: number = 1;
export const bookableHours24Range: number[] = [7, 22];
export const slotsPerDay: number =
  bookableHours24Range[1] - bookableHours24Range[0];

export function getAvailableHours(ranges: HourRange[]): number[] {
  let availableHours = createNumberRange(
    bookableHours24Range[0],
    bookableHours24Range[1]
  );
  for (const range of ranges) {
    const [start, end] = range;
    const startIndex = availableHours.indexOf(start);
    const endIndex = availableHours.indexOf(end);
    if (startIndex >= 0 && endIndex >= 0) {
      const deleteCount = endIndex - startIndex;
      availableHours.splice(startIndex, deleteCount);
    }
  }
  return availableHours;
}

export function getDateString(config: object, date: Date): string {
  return new Intl.DateTimeFormat('en-US', config).format(date);
}

export function getDayName(date: Date): string {
  return getDateString({ weekday: 'long' }, date);
}

export function getWeekDates(weekRange: [number, number]) {
  const [start, end] = weekRange;
  return createNumberRange(start, end).map((weekNum) => {
    let dates: Date[] = [];
    for (let day = 1; day <= 7; day += 1) {
      dates.push(dayjs(dayjs().isoWeekday(day)).isoWeek(weekNum).toDate());
    }
    return dates;
  });
}
