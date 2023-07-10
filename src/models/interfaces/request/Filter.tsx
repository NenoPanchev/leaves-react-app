export default interface Filter {
    id: string[],
    dateCreated: string[],
    createdBy: string[],
    lastUpdated: string[],
    startDate: string[],
    endDate: string[],
    approved: string[],
    offset: number,
    limit: number,
    operation:string,
    sort: string,
    deleted: string 
}