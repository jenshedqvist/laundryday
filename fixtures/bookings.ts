import { v4 as uuidv4 } from 'uuid';
import type { Booking } from '../data/commonTypes';

const bookings: Booking[] = [
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-21'),
    hourRange: [7, 10],
    room: 2,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-21'),
    hourRange: [19, 21],
    room: 2,
    isOwn: true,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-22'),
    hourRange: [10, 12],
    room: 1,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-22'),
    hourRange: [12, 15],
    room: 2,
    isOwn: true,
  },
  {
    id: uuidv4(),
    week: 37,
    date: new Date('2021-09-22'),
    hourRange: [19, 22],
    room: 1,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-22'),
    hourRange: [19, 22],
    room: 2,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-22'),
    hourRange: [10, 12],
    room: 2,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-24'),
    hourRange: [12, 16],
    room: 1,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-24'),
    hourRange: [11, 13],
    room: 2,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 38,
    date: new Date('2021-09-25'),
    hourRange: [7, 12],
    room: 2,
    isOwn: false,
  },

  {
    id: uuidv4(),
    week: 39,
    date: new Date('2021-09-20'),
    hourRange: [18, 21],
    room: 1,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 39,
    date: new Date('2021-09-27'),
    hourRange: [21, 22],
    room: 1,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 39,
    date: new Date('2021-09-27'),
    hourRange: [19, 22],
    room: 2,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 39,
    date: new Date('2021-09-28'),
    hourRange: [7, 12],
    room: 1,
    isOwn: false,
  },
  {
    id: uuidv4(),
    week: 39,
    date: new Date('2021-09-28'),
    hourRange: [17, 20],
    room: 2,
    isOwn: false,
  },
];

export default bookings;
