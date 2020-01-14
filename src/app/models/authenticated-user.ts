import { Role } from './role'

export class AuthenticatedUser {
    token:string
    username:string
    firstname:string
    lastname:string
    email:string
    roles:Role[]
}
