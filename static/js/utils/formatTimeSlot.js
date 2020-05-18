import { format, isToday, isTomorrow, parseISO } from 'date-fns';

export function formatDay(day) {
  switch (true) {
    case isToday(day):
      return 'Today';
    case isTomorrow(day):
      return 'Tomorrow';
    default:
      return format(day, 'iiii do');
  }
}

export function formatTime(time) {
  // date-fns removed am/pm formatting https://github.com/date-fns/date-fns/issues/946#issuecomment-452766765
  return `${format(time, 'haaaaa')}m`;
}

export const parseDateTime = (date, time) => parseISO(`${date} ${time}`);

export const toStartTime = ({ date, startsAt }) => parseDateTime(date, startsAt);

export const toEndTime = ({ date, endsAt }) => parseDateTime(date, endsAt);

export function formatTimeSlot({ date, startsAt, endsAt }) {
  const start = parseDateTime(date, startsAt);
  const end = parseDateTime(date, endsAt);

  // Return a custom format required by designs
  return `${formatDay(start)}, ${formatTime(start)} – ${formatTime(end)}`;
}
