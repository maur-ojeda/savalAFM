export interface CcenterInterface{
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