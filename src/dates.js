import {
  format,
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getISOWeek,
  getDayOfYear,
  getQuarter,
  getDaysInMonth,
  addYears,
  addMonths,
  addWeeks,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  parse,
  isValid
} from "date-fns";

// Q - a
const DATE_FORMATS = {
  shortDate: "dd/MM/yy",
  monthYear: "MM/yyyy",
};

export function formatDateRange(startDate, endDate, formatKey) {
  if (!formatKey) {
    throw new Error("formatString is required");
  }

  const formatString = DATE_FORMATS[formatKey];
  if (!formatString) {
    throw new Error("Invalid formatString key");
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!isValid(start)) {
    throw new Error("Invalid start date");
  }

  if (!isValid(end)) {
    throw new Error("Invalid end date");
  }


  const startText = format(start, formatString);
  const endText = format(end, formatString);
  const result = startText + " - " + endText;

  return result;
}

// Q - b
export function getDateInfo(dateInput, timeZone) {
  let date = new Date(dateInput);

  if (timeZone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const partsList = formatter.formatToParts(date);
    const parts = {};

    for (const p of partsList) {
      parts[p.type] = p.value;
    }

    date = set(date, {
      year: Number(parts.year),
      month: Number(parts.month) - 1,
      date: Number(parts.day),
      hours: Number(parts.hour),
      minutes: Number(parts.minute),
      seconds: Number(parts.second),
      milliseconds: 0,
    });
  }

  return {
    year: getYear(date),
    month: getMonth(date) + 1,
    monthName: format(date, "LLLL"),
    day: getDate(date),
    weekdayName: format(date, "EEEE"),
    hour: getHours(date),
    minute: getMinutes(date),
    second: getSeconds(date),
    millisecond: getMilliseconds(date),
    isoString: date.toISOString(),
    weekOfYear: getISOWeek(date),
    dayOfYear: getDayOfYear(date),
    quarter: getQuarter(date),
    isWeekend: date.getDay() >= 4,
    daysInMonth: getDaysInMonth(date),
    timestamp: date.getTime(),
  };
}

// Q - c

export const INTERVALS = {
  YEAR: "year",
  MONTH: "month",
  WEEK: "week",
  DAY: "day",
  HALF_DAY: "half-day",
  HOUR: "hour",
  MINUTE: "minute",
  SECOND: "second",
};

const addYear = (date) => addYears(date, 1);
const addMonth = (date) => addMonths(date, 1);
const addWeek = (date) => addWeeks(date, 1);
const addDay = (date) => addDays(date, 1);
const addHalfDay = (date) => addHours(date, 12);
const addHour = (date) => addHours(date, 1);
const addMinute = (date) => addMinutes(date, 1);
const addSecond = (date) => addSeconds(date, 1);


const INTERVAL_MAP = {
  [INTERVALS.YEAR]: addYear,
  [INTERVALS.MONTH]: addMonth,
  [INTERVALS.WEEK]: addWeek,
  [INTERVALS.DAY]: addDay,
  [INTERVALS.HALF_DAY]: addHalfDay,
  [INTERVALS.HOUR]: addHour,
  [INTERVALS.MINUTE]: addMinute,
  [INTERVALS.SECOND]: addSecond,
};


export function getDateInterval(startDate, endDate, interval = "day") {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (!isValid(start)) {
    throw new Error("Invalid start date");
  }

  if (!isValid(end)) {
    throw new Error("Invalid end date");
  }

  if (start > end) {
    throw new Error("Start date must be before end date");
  }

  const addStep = INTERVAL_MAP[interval];
  if (!addStep) {
    throw new Error("Unsupported interval: " + interval);
  }

  const dates = [];
  let current = start;

  dates.push(current);

  while (true) {
    const next = addStep(current);

    if (next > end) {
      dates.push(end);
      break;
    }

    dates.push(next);
    current = next;
  }

  return dates;
}