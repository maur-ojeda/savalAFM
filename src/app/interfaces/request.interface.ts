export interface RequestInterface {
  error: boolean;
  message: string;
  data: Datum[];
}

interface Datum {
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
  assetRequestDetails: AssetRequestDetails;
  createdBy: CreatedBy;
  evaluatedBy?: any;
  status: number;
  isEvaluated: boolean;
  specieAttributes: AssetRequestDetails;
  history: AssetRequestDetails;
}

interface CreatedBy {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
}

interface AssetRequestDetails {
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