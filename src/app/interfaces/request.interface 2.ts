export interface RequestInterface {
  id: number;
  createdAt: CreatedAt;
  catalogClass: CatalogClass;
  specie: Specie;
  description: string;
  assetCount: number;
  creditorId: string;
  newAsset: boolean;
  assetOrigin?: any;
  lifetimeYear: number;
  lifetimeYear15?: any;
  assetRequestDetails: AssetRequestDetail[];
  createdBy: CreatedBy;
  evaluatedBy?: any;
  status: number;
  isEvaluated: boolean;
  specieAttributes: SpecieAttribute[];
  history: History[];
  number: number;
}

interface CreatedBy {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
}

interface AssetRequestDetail {
  id: number;
  serieNumber: string;
  costCenter: CatalogClass;
  lCenter: LCenter;
  lBuilding: LCenter;
  lFloor: LCenter;
  lArea: LCenter;
  lRoom: LCenter;
  status: number;
  code?: any;
}

interface LCenter {
  id: number;
  code: string;
  name: string;
  type: number;
}

interface Specie {
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

interface CatalogClass {
  id: number;
  code: string;
  name: string;
}

interface CreatedAt {
  date: string;
  timezone_type: number;
  timezone: string;
}


interface History {
  id: number;
  createdBy: CreatedBy;
  description: string;
  status: number;
}

interface SpecieAttribute {
  id: number;
  specieAttribute: Attribute;
  value: string;
}

