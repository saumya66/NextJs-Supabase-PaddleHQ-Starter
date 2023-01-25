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

//Paddle Types 👇
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
  subscription: PaddleSubscription;
}
export interface PriceOrListPrice {
  gross: number;
  net: number;
  tax: number;
}
export interface PaddleSubscription {
  trial_days: number;
  interval: string;
  frequency: number;
  price: PriceOrListPrice;
  list_price: PriceOrListPrice;
}

//getSubscriptionUsers
export interface PaddleSubscriptionUser {
  subscription_id: number;
  plan_id: number;
  user_id: number;
  user_email: string;
  marketing_consent: boolean;
  update_url: string;
  cancel_url: string;
  state: string;
  signup_date: string;
  last_payment: LastPaymentOrNextPayment;
  payment_information: PaymentInformation;
  quantity: number;
  next_payment: LastPaymentOrNextPayment;
}
export interface LastPaymentOrNextPayment {
  amount: number;
  currency: string;
  date: string;
}
export interface PaymentInformation {
  payment_method: string;
  card_type: string;
  last_four_digits: string;
  expiry_date: string;
}



declare global {
  var Paddle: any;
}

//webhooks 
export interface SubscriptionCancelWebhookRequest {
  alert_id: string;
  alert_name: string;
  cancellation_effective_date: string;
  checkout_id: string;
  currency: string;
  custom_data: string;
  email: string;
  event_time: string;
  linked_subscriptions: string;
  marketing_consent: string;
  passthrough: string;
  quantity: string;
  status: string;
  subscription_id: string;
  subscription_plan_id: string;
  unit_price: string;
  user_id: string;
  p_signature: string;
}


//Supabase Types 👇
export interface Subscription{
  cur_subscription_created_at: string;
  cur_subscription_ends_at: string;
  subscription_cancelled_at:string | Date | number | null;
  currency: string;
  marketing_consent: boolean;
  metadata?: null;
  plan_id: string;
  plan_price: string;
  subscription_cancel_url: string;
  subscription_id: string;
  subscription_state: string | any;
  subscription_update_url: string;
  trial_end?: null;
  trial_start?: null;
  user_email: string;
  user_id: string;
}
