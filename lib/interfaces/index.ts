type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

type Review = {
  rating: number;
  comment: string;
  date: string; // ISO 8601 date string
  reviewerName: string;
  reviewerEmail: string;
};

type Meta = {
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  barcode: string;
  qrCode: string; // URL to the QR code image
};

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[]; // URLs to images
  thumbnail: string; // URL to the thumbnail image
}
export interface ICartItem extends IProduct {
  quantity: number;
}
export interface ICategory {
  slug: string;
  name: string;
  url: string;
}
export interface IGenericResponse<T> {
  // statusCode?: number;
  // success?: boolean;
  // meta?: {
  //   page?: number;
  //   limit?: number;
  //   total?: number;
  // };
  data?: T;
  message?: string;
}
export interface IUser {
  _id: string;
  name: string;
  email: string; // major update
  mobile: string; // major update
  password: string; // separate api
  displayImage: string;
  addresses: IEcomAddress[];
  isActive: boolean;
  role?: string;
  // cart: IEComUserCartItem[];
  // wishList?: IEComWishList[];
  attemptWrongPassword: number;
  blockingInfo: {
    isBlocked: boolean;
    blockedUntil: Date | null;
  };
  lastChangedPassword: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IEcomAddress {
  _id?: string;
  addressType: AddressType | string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: [number, number];
  isDefault?: boolean;
}
export enum AddressType {
  HOME = "home",
  OFFICE = "office",
  SHOP = "shop",
  OTHER = "other",
}
