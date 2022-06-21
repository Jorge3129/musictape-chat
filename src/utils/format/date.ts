import dayjs from "dayjs";
import {DATETIME_FORMAT} from "../../constants/format";


export const formatDateTime = (date?: string) => {
    return dayjs(date).format(DATETIME_FORMAT)
}
