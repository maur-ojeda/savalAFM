export interface CcenterInterface{
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
  name: string;
  code: string;
  attributes: (Attribute | null)[];
}

interface Attribute {
  id: number;
  name: string;
  human_name?: any;
  help_message: string;
}