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

    const dateString =
      parts.year + "-" +parts.month + "-" + parts.day + "T" + parts.hour + ":" + parts.minute + ":" + parts.second + ".000";

    date = new Date(dateString);
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
export function getDateInterval(startDate, endDate, interval = "day") {
  const start = new Date(startDate);
  const end = new Date(endDate);

   if (start > end) {
    throw new Error("Start date must be before end date");
  }

  const dates = [];
  let current = start;

  dates.push(current);

  while (true) {
    let next;

    if (interval === "year") {
      next = addYears(current, 1);
    } else if (interval === "month") {
      next = addMonths(current, 1);
    } else if (interval === "week") {
      next = addWeeks(current, 1);
    } else if (interval === "day") {
      next = addDays(current, 1);
    } else if (interval === "half-day") {
      next = addHours(current, 12);
    } else if (interval === "hour") {
      next = addHours(current, 1);
    } else if (interval === "minute") {
      next = addMinutes(current, 1);
    } else if (interval === "second") {
      next = addSeconds(current, 1);
    } else {
      throw new Error("Unsupported interval: " + interval);
    }

    if (next > end) {
      dates.push(end);
      break;
    }

    if (next.getTime() === end.getTime()) {
      dates.push(next);
      break;
    }

    dates.push(next);
    current = next;
  }

  return dates;
}


