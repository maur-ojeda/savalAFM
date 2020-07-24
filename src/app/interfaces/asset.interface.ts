export interface AssetInterfase {
  id: number;
  createdAt: CreatedAt;
  updatedAt: CreatedAt;
  society: string;
  code: string;
  subCode: string;
  specie: Specie;
  description: string;
  catalogClass: Specie;
  referalCode: string;
  serieNumber: string;
  rfidLabelSap: string;
  count: number;
  historyManagement: boolean;
  inventoryFlag: boolean;
  unitType: string;
  creditorId: string;
  newAsset: boolean;
  assetOrigin: string;
  lifetimeYear: number;
  lifetimeYear15: number;
}

interface Specie {
  __initializer__: Initializer;
  __cloner__: Initializer;
  __isInitialized__: boolean;
}

interface Initializer {
}

interface CreatedAt {
  date: string;
  timezone_type: number;
  timezone: string;
}