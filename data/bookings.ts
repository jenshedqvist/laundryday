import type { Booking } from './commonTypes';

const today = new Date(2021, 9, 11, 12, 0, 0);
const [year, month, day, hour] = [
  today.getFullYear(),
  today.getMonth(),
  today.getDay(),
  today.getHours(),
];
const weeks: Booking[] = [
  {
    id: 1,
    week: 36,
    start: new Date(year, month, day, hour),
    end: new Date(year, month, day, hour + 2),
    rooms: [2],
  },
  {
    id: 2,
    week: 36,
    start: new Date(year, month, day + 1, hour + 2),
    end: new Date(year, month, day + 1, hour + 4),
    rooms: [1, 2],
  },
  {
    id: 3,
    week: 37,
    start: new Date(year, month, day + 5, hour + 4),
    end: new Date(year, month, day + 5, hour + 5),
    rooms: [1],
  },
  {
    id: 4,
    week: 37,
    start: new Date(year, month, day + 4, hour + 1),
    end: new Date(year, month, day + 4, hour + 5),
    rooms: [2],
  },
];

export default weeks;
