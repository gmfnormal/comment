import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar"
export const safeJsonParse = (v: string) => {
    try {
        return JSON.parse(v)
    } catch {
        return {}
    }
}
export const getDate = () => parseInt(`${new Date().valueOf() / 1000}`)

// TODO 调整日期
export const getCalendarTime = (time: string | number) => {
    dayjs.extend(calendar);
    return dayjs(Number(time)).calendar(null, {
        sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
        nextDay: '[Tomorrow at] h:mm A', // The next day ( Tomorrow at 2:30 AM )
        nextWeek: 'dddd [at] h:mm A', // The next week ( Sunday at 2:30 AM )
        lastDay: '[Yesterday at] h:mm A', // The day before ( Yesterday at 2:30 AM )
        lastWeek: '[Last] dddd [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
        sameElse: 'YYYY年MM月DD日'
    });
}