import { Dayjs } from 'dayjs';
export default interface IRequestPost {
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  }