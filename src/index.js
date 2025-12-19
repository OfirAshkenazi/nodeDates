// console.log("Node + ES Modules works!");
import { format } from "date-fns";

import { formatDateRange } from './dates.js';
import { getDateInfo } from './dates.js';
import { getDateInterval } from "./dates.js";


const start = "2025-01-01";
const end = "2025-10-25";

// Q - a
const output1 = formatDateRange(start, end, "shortDate");
console.log("formatted shortDate:", output1);


const output2 = formatDateRange(start, end, "monthYear");
console.log("formatted monthYear:", output2);

// Q - b
//console.log(getDateInfo("2025-03-10T12:30:00"));
//console.log(getDateInfo("2025-03-10T12:30:00", "Asia/Jerusalem"));

// Q - c
// const result = getDateInterval("2025-01-01", "2025-01-25", "week");
// const formatted = [];

// for (const date of result) {
//   formatted.push(format(date, "dd/MM/yyyy"));
// }

// console.log(formatted);