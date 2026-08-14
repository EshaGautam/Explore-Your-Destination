export interface Destination {
  name: string;
  state: string;
  country: string;
  description: string;
}

export interface Place {
  name: string;
  type: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
