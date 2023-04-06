import { Dayjs } from 'dayjs';
export default interface IRequestPost {
    id: number,
    startDate: Dayjs | null,
    endDate: Dayjs | null,
  }
  