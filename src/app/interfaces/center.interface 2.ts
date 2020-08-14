export interface CenterInterface{
    error: boolean;
    message: string;
    data: Datum[];
    next: string;
    old?: any;
    page: number;
    items: number;
    total: number;
  }
  
  interface Datum {
    id: number;
    code: string;
    name: string;
    type: number;
  }