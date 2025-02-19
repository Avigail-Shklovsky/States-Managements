import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: Date | string, format = "MMM D, YYYY, hh:mm A", tz = "Asia/Jerusalem") => {
  return dayjs(date).tz(tz).format(format);
};