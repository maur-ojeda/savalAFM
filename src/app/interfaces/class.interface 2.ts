export interface cClassInterface {
  error: boolean;
  message: string;
  data: Datum[];
  next?: any;
  old?: any;
  page: number;
  items: number;
}

interface Datum {
  id: number;
  code: string;
  name: string;
}