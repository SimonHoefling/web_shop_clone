// src/api/apiService.d.ts
declare module '@/api/apiService' {

  export function fetchApiData(endpoint: string): Promise<{ data: YourDataType[] }>;

  // Define YourDataType as an interface to match your API response structure
  export interface YourDataType {
    id: number;
    name: string;
    sizes: string[];
    colors: string[];
    price: number;
    pictures: string[];
    details: string[];
    fit: string[];
  }
}
