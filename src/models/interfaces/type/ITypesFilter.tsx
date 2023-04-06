export default interface ITypesFilter {
    [x: string]: any;
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