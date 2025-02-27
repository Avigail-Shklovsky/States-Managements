import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (date: Date | string | null | undefined): string =>
  date ? dayjs(date).tz("Asia/Jerusalem").format("MMM D, YYYY, hh:mm A") : "N/A";
