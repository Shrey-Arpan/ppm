const AZURE_CODE = import.meta.env.VITE_API_AZURE_CODE;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GET_DOCUMENT_DATA = `${BASE_URL}/api/extracted-fields?code=${AZURE_CODE}`;
