interface ICrimes {
  status: string
  message: string
  crimes: CrimesData
}

export interface CrimesData {
  current_page: number
  data: Crimes[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url?: any
  path: string
  per_page: number
  prev_page_url?: any
  to: number
  total: number
}

interface Link {
  url?: string
  label: string
  active: boolean
}

export interface Crimes {
  id: number
  crime_category_id: number
  intensity: string
  color_code: string
  deleted_at?: any
  created_at: string
  updated_at: string
  crime_reports: Crimereports
  crime_category: Crimecategory
}

interface Crimecategory {
  id: number
  name: string
  slug: string
  intensity?: any
  color_code?: any
  created_at: string
  updated_at: string
}

interface Crimereports {
  id: number
  crime_id: number
  description: string
  image?: any
  reported_by: string
  is_verified: number
  verified_by?: any
  latitude: string
  longitude: string
  reported_at?: any
  deleted_at?: any
  created_at: string
  updated_at: string
}
