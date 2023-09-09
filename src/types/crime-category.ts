export interface CategoryApiResponse {
  message: string
  status: string
  crime_category: Crimecategory
}

export interface Crimecategory {
  id: number
  name: string
  slug: string
  intensity?: any
  color_code?: any
  created_at: string
  updated_at: string
}
