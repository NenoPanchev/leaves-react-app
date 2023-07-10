export interface IRole {
    id: number
    name: string
    permissions: [{
        name: string
    }]
}