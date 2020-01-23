import { Patient } from './patient'

export class Consult {
    id: number
    reason: string
    description: string
    createdDate: Date
    patient:Patient
}
