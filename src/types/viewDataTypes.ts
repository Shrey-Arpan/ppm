export interface ViewDataApiResponse {
  sections: Section[];
}

export interface Section {
  section_name: string;
  fields: Field[];
}

export interface Field {
  field_name: string;
  field_value: string;
  confidence: string; // can improve this 👇
  confidence_score: number;
  citation_pages: number[];
  citation_text: string;
  retrieval_score: number;
}