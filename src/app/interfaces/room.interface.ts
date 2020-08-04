export interface RoomInterface {
  error: boolean;
  message: string;
  data: Datum[];
}

interface Datum {
  id: number;
  code: string;
  name: string;
  type: number;
}