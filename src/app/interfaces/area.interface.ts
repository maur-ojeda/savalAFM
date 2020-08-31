export interface AreaInterface {
  error: boolean;
  message: string;
  data: Datum[];
}

interface Datum {
  id: number;
  location_id: number;
  code: string;
  name: string;
  type: number;
}