import dayjs from "dayjs";

export function reformatDateStringToBG(oldString:string) {
    return oldString
        ? dayjs(oldString).format('DD.MM.YYYY')
        : '';
}

export function reformatDateStringToLocalDate(oldString:string) {
    return oldString
        ? dayjs(oldString, 'DD.MM.YYYY').format('YYYY-MM-DD')
        : '';
}