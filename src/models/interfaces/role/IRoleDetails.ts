export interface IRoleDetails {
    id: number
    name: string
    permissions: [{
        name: string
    }]
    createdAt: string
    createdBy?: string
    lastModifiedAt?: string
    lastModifiedBy?: string
}