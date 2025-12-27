export interface Course {
  id: string
  type: string
  start_date: string
  end_date: string
  times: string
  description: string
  prerequisites?: string
  price?: number
  registration_deadline?: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: string
  title: string
  file_url: string
  description?: string
  category?: string
  created_at: string
  updated_at: string
}

export interface PageContent {
  id: string
  page_key: string
  content: any
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  first_name: string
  last_name: string
  email: string
  phone?: string
  message: string
  consent: boolean
}

export interface CourseRegistration {
  course_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  consent: boolean
}
