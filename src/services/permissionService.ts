import { Permission } from "../models/objects/Permission";


export default function mapPermissionName(permissionNames: string[]) {
    let permissionsArray = new Array<Permission>;
    if (permissionNames) {
        permissionNames.forEach(name => {
            let perm = new Permission();
            perm.setName(name)
            permissionsArray.push(perm);
        })
    }
    return permissionsArray;
}