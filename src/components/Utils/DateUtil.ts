import dayjs from "dayjs";

export function reformatDateString(oldString:string) {
    const formattedDate = dayjs(oldString).format('DD.MM.YYYY');
    return formattedDate;
}