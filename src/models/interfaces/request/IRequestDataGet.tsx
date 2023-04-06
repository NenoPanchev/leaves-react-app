export default interface IRequestDataGet {
    id: number,
    startDate: string,
    endDate: string,
    approved?: boolean,
    createdBy: string,
    daysRequested:number,
    isDeleted:boolean
  }
  