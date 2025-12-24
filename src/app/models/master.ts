export class BikeDetails {
  BikeID?: number;
  BikeName?: string;
  Model?: string;
  Amount?: number;
  Brand?: string;
  PurchaseDate?: string; // or Date
  RegistrationNo?: string;
  InsuranceDetails?: Insurance[];
  Color?: string;
  FuelType?: string;
  Valid_Until?: string;
  MaintenanceDetails?: Maintenance[];
}

export interface Bike {
  id: number;
  name: string;
  brand: string;
  model: string;
  buyDate: string;
  amount: number;
  insurance: Insurance;
  registration: Registration;
  maintenance: Maintenance[];
  specifications: Specifications;
  documents: Document[];
  currentMileage: number;
  fuelType: string;
  color: string;
}

export interface Insurance {
  BikeID?: number;
  CompanyName: string;
  Policy_Number: string;
  Valid_From: Date;
  Valid_Until: Date;
  Premium: number;
  Coverage_Amount: number;
}

export interface Registration {
  number: string;
  validUntil: Date;
}

export class Maintenance {
  MNID?: number;

  BikeID?: number;
  Service_Date?: any;
  Service_Type?: string;
  Service_Cost?: number;
  Mileage?: number;
  Service_Center?: string;
  Notes?: string;
}

export interface Specifications {
  engine: string;
  power: string;
  torque: string;
  fuelCapacity: string;
  weight: string;
  topSpeed: string;
}

export interface Document {
  name: string;
  type: string;
  uploadDate: string;
}

export class Cls_User {
  MobileNo?: string = '7096119971';
  Password?: string;
}
