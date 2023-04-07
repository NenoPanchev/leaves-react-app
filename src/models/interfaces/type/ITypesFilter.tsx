export default interface ITypesFilter {
    id: string[],
    dateCreated: string[],
    createdBy: string[],
    lastUpdated: string[],
    typeName: string[],
    daysLeave: string[],
    offset: number,
    limit: number,
    operation:string,
    sort: string,
    deleted: string 
}