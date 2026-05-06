export interface DashboardListApiResponse {
  files: DashboardDocuments[];
}

export interface DashboardDocuments {
  document_name: string;
  ingested_at_utc: string;
  ingestion_status: string;
  extraction_status: string;
  extracted_fields_count: number;
  last_extracted_at_utc: string;
}
