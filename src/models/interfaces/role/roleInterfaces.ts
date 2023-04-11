export interface IRole {
    id: number
    name: string
    permissions: [{
        name: string
    }]
}

export interface IRolePage {
    content: IRole[],
    totalElements: number,
    totalPages: number,
    numberOfElements: number,
    number:number,
    size: number,
    first: boolean,
    last: boolean
}

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

export interface IRoleFilter {
    name: string
    permissions: string[]
    offset: number
    limit: number
}

export interface EditRoleButtonProps {
    role: IRole
    refreshCurrentState: number
    refresh: (value: number) => void;
}

export interface RoleSearchFilterProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    filter: IRoleFilter;
    setFilter: (value: IRoleFilter) => void;
}