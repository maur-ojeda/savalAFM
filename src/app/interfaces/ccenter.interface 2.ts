export interface CcenterInterface{
  error: boolean;
  message: string;
  data: Datum[];
}

interface Datum {
  id: number;
  code: string;
  name: string;
}

