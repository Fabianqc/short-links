export interface BackendErrorResponse {
    message: string | string[];
    error?: string;
    statusCode?: number;
}