export interface Deal {
  id: string
  name: string
  status: 'active' | 'pending' | 'closed' | 'draft'
  type: string
  amount: number
  currency: string
  uploadedAt: string
  processedAt?: string
  summary?: string
  extractedData?: Record<string, unknown>
}

export interface PPMDocument {
  id: string
  dealId: string
  fileName: string
  fileSize: number
  uploadedAt: string
  status: 'uploading' | 'processing' | 'completed' | 'failed'
  pageCount?: number
  extractedFields?: ExtractedField[]
}

export interface ExtractedField {
  key: string
  label: string
  value: string | number | boolean | null
  confidence: number
  category: 'financial' | 'legal' | 'operational' | 'general'
}
