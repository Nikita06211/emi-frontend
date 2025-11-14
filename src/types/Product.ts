// src/types/Product.ts

export interface EMIPlan {
    id: number;
    monthlyPayment: number;
    tenureMonths: number;
    interestRate: number;
    cashback?: string | null;
  }
  
export interface Product {
    id: number;
    name: string;
    variant: string;
    mrp: number;
    price: number;
    imageUrl: string;
    category: string;
    emiPlans: EMIPlan[];
  }
  