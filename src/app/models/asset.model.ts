export class Asset {
    id: string;
    status: number;
    createdAt: CreatedAt;
    updatedAt: CreatedAt;
    society: string;
    referalCode: string;
    code: string;
    subCode: string;
    catalogClass: CatalogClass;
    specie: Specie;
    description: string;
    serieNumber: string;
    rfidLabelSap: string;
    count: number;
    unitType: string;
    historyManagement: boolean;
    lastInventoryAt: CreatedAt;
    moreInfoInventory: string;
    inventoryFlag: boolean;
    capitalizationDateAt: CreatedAt;
    costCenter: CatalogClass;
    lCenter: LCenter;
    lBuilding: LCenter;
    lFloor: LCenter;
    lArea: LCenter;
    lRoom: LCenter;
    creditorId: string;
    creditorName: string;
    newAsset: boolean;
    assetOrigin: string;
    valorationArea: number;
    amortizationCode: string;
    lifetimeYear: number;
    lifetimeCycle: number;
    amortizationStartedAt: CreatedAt;
    valorationArea15: number;
    amortizationCode15: string;
    lifetimeYear15: number;
    lifetimeCycle15: number;
    amortizationStartedAt15: CreatedAt;
    descapitalizationDateAt?: any;
    downDocumentAt: CreatedAt;
    downPostingAt: CreatedAt;
    downMoveClass: string;
    downReferenceAt: CreatedAt;
    downTotal: boolean;
    downComment: string;
    downDocumentClass: string;
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