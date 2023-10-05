export interface DiscountedItemsTypes {
  id: number;
  discount: number;
}

export interface CalculatePriceTypes {
  totalPrice: number;
  totalItems: number;
  totalDiscount: number;
  totalDiscountItems: number;
  updatedFinalPrice: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface DiscountedItemsTypes {
  id: number;
  discount: number;
}

export interface CouponResponse {
  discountCode: string;
  price: number;
  isValid: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}
