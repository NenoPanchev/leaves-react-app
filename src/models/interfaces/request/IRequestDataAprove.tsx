import { Dayjs } from "dayjs";
type DayjsType = Dayjs| null|undefined|string;

export default interface IRequestDataApprove {
    requestType: string,
    startDate: DayjsType,
    endDate: DayjsType,
    approvedStartDate: Dayjs| null|undefined|string,
    approvedEndDate: Dayjs| null|undefined|string,
  }