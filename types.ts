export interface PageMeta {
  title: string;
  description: string;
  cardImage: string;
}

export interface Customer {
  id: string /* primary key */;
  stripe_customer_id?: string;
}





export interface UserDetails {
  id: string /* primary key */;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  // billing_address?: Stripe.Address;
  // payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}


//getPrices
export interface Prices {
  success: boolean;
  response: PricesResponse;
}
export interface PricesResponse {
  customer_country: string;
  products?: (Product)[] | null;
}
export interface Product {
  product_id: number;
  product_title: string;
  currency: string;
  vendor_set_prices_included_tax: boolean;
  price: PriceOrListPrice;
  list_price: PriceOrListPrice;
  subscription: Subscription;
}
export interface PriceOrListPrice {
  gross: number;
  net: number;
  tax: number;
}
export interface Subscription {
  trial_days: number;
  interval: string;
  frequency: number;
  price: PriceOrListPrice;
  list_price: PriceOrListPrice;
}


declare global {
  var Paddle: any;
}