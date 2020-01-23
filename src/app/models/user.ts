import { Role } from './role'

export class User {
    username:string
    firstname:string
    lastname:string
    email:string
    password?:string
    roles:Role[]
}
