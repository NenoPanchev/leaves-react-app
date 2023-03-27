export interface IRole {
    id: number
    name: string
    permissions: [{
        name: string
    }]
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

export interface EditRoleButtonProps {
    role: IRole
    refreshCurrentState: number
    refresh: (value: number) => void;
}

export interface RoleSearchFilterProps {
    refreshCurrentState: number
    refresh: (value: number) => void;
    setRoles: (value: IRole[]) => void;
    setFilter: (value: FormData) => void;
    setShouldFilter: (value: boolean) => void;
}