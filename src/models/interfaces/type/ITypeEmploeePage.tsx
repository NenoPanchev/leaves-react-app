import ITypeEmploeeGet from "./ITypeEmploeeGet";

export default interface ILeaveRequestPage {
    content: Array<ITypeEmploeeGet>,

    totalElements: number,
    totalPages: number,
    size: number,
    numberOfElements: number,
    number:number,

    first: boolean,
    last: boolean
}