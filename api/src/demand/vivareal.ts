interface AddressPoint {
  aproximated: boolean;
  source: string;
  approximateLat: number;
  approximateLon: number;
  radius: number;
}

interface Address {
  country: string;
  zipCode: string;
  geoJson: string;
  city: string;
  level: string;
  precision: string;
  confidence: string;
  stateAcronym: string;
  source: string;
  point: AddressPoint;
  ibgeCityId: string;
  zone: string;
  street: string;
  locationId: string;
  district: string;
  name: string;
  state: string;
  neighborhood: string;
  poisList: string[];
  pois: string[];
  valuableZones: string[];
}

interface PricingInfo {
  price: string;
  businessType: string;
}

interface AdvertiserContact {
  chat: string;
  phones: string[];
}

interface Media {
  id: string;
  url: string;
  type: string;
}

interface Account {
  id: string;
  name: string;
  logoUrl: string;
  licenseNumber: string;
  showAddress: boolean;
  legacyVivarealId: number;
  phones: {
    primary: string;
    mobile: string;
  };
  tier: string;
}

interface AccountLink {
  data: Record<string, unknown>;
  name: string;
  href: string;
  rel: string;
}

interface Link {
  data: {
    state: string;
    city: string;
    zone: string;
    neighborhood: string;
    street: string;
    streetNumber: string;
  };
  name: string;
  href: string;
  rel: string;
}

export class VivaRealProperty {
  displayAddressType: string;
  amenities: string[];
  usableAreas: string[];
  constructionStatus: string;
  listingType: string;
  description: string;
  title: string;
  unitTypes: string[];
  nonActivationReason: string;
  propertyType: string;
  unitSubTypes: string[];
  id: string;
  portal: string;
  parkingSpaces: number[];
  address: Address;
  suites: number[];
  publicationType: string;
  externalId: string;
  bathrooms: number[];
  usageTypes: string[];
  totalAreas: string[];
  advertiserId: string;
  bedrooms: number[];
  pricingInfos: PricingInfo[];
  showPrice: boolean;
  status: string;
  advertiserContact: AdvertiserContact;
  videoTourLink: string;
  whatsappNumber: string;
  stamps: any[];
  account: Account;
  medias: Media[];
  accountLink: AccountLink;
  link: Link;
}

export interface VivaRealResponse {
  search: {
    result: {
      listings: {
        listing: VivaRealProperty
      }[];
    };
  };
}
