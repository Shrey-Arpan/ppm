const AZURE_CODE = import.meta.env.VITE_AZURE_CODE;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const DASHBOARD_LIST_API = `${BASE_URL}/api/files-list?code=${AZURE_CODE}`;
export const RETRY_PROCESSING_API = `${BASE_URL}/disable-api/ingest-blob?code=${AZURE_CODE}`;
