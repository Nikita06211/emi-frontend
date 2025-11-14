// src/types/Product.ts

export interface EMIPlan {
  id: number;
  monthlyPayment: number | string;
  tenureMonths: number;
  interestRate: number;
  cashback?: string | null;
}

export interface Variant {
  id: number;
  name: string;
  price: number | string;
  attributes?: Record<string, any> | null;
}

export interface Product {
  id: number;
  name: string;
  mrp: number | string;
  price: number | string;
  images: string[];
  category: string;
  emiPlans: EMIPlan[];
  variants: Variant[];
}
  