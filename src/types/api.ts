export interface ApiResponse<T> {
  success: boolean;
  meessage: string;
  statusCode: number;
  data: T;
}
