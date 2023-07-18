export default interface IRequestDataGet {
    id: number,
    requestType: string,
    startDate: string,
    endDate: string,
    approved?: boolean,
    createdBy: string,
    daysRequested:number,
    approvedStartDate: string,
    approvedEndDate: string,
    deleted:boolean
  }
  