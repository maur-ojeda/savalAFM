export interface RequestInterface {
  id: number;
  createdAt: CreatedAt;
  catalogClass: CatalogClass;
  specie: CatalogClass;
  description: string;
  assetCount: number;
  creditorId: string;
  newAsset: boolean;
  assetOrigin?: any;
  lifetimeYear: number;
  lifetimeYear15?: any;
  assetRequestDetails: Initializer;
  createdBy: CatalogClass;
  evaluatedBy?: any;
  status: number;
  isEvaluated: boolean;
  specieAttributes: Initializer;
  history: Initializer;
}

interface CatalogClass {
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