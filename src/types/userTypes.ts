export interface UsersData {
  data: UsersType[]
}

export interface UsersType {
  id: number
  name: string
  email: string
  phone_number?: any
  avatar?: any
  email_verified_at?: any
  verification_code?: any
  verification_code_expired_at?: any
  created_at: string
  updated_at: string
  roles: Role[]
  emergency_contacts: any[]
  firstName?: string
}

interface Role {
  id: number
  name: string
  pivot: Pivot
}

interface Pivot {
  model_id: number
  role_id: number
  model_type: string
}
