import IRequestDataGet from "./IRequestDataGet";

export default interface ILeaveRequestPage {
    content: Array<IRequestDataGet>,

    totalElements: number,
    totalPages: number,
    size: number,
    numberOfElements: number,
    number:number,

    first: boolean,
    last: boolean
}