import { Dayjs } from "dayjs";

export default interface IRequestDataApprove {
    requestType: string,
    startDate: Dayjs| null|undefined|string,
    endDate: Dayjs| null|undefined|string,
    approvedStartDate: Dayjs| null|undefined|string,
    approvedEndDate: Dayjs| null|undefined|string,
  }