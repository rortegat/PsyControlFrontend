import { Privilege } from './privilege';

export class Role {
    id: number;
    rolename: string;
    privileges: Privilege[];
}
