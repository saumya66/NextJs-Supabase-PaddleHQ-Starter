import {
  createBrowserSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { ProductWithPrice } from 'types';
import type { Database } from 'types_db';

export const supabase = createBrowserSupabaseClient<Database>();

export const getActiveProductsWithPrices = async (): Promise<
  ProductWithPrice[]
> => {
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
    throw error;
  }
  // TODO: improve the typing here.
  return (data as any) || [];
};

export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from('users')
    .update({
      full_name: name
    })
    .eq('id', user.id);
};

export const addSubscription = async (usersSubscription, id) => {
  const { data, error } = await supabase
  .from('subscriptions')
  .insert([
    {
      subscription_id : usersSubscription.subscription_id, 
      user_id: id,
      metadata: null,
      plan_id: usersSubscription.plan_id,
      subscription_state: usersSubscription.state,
      cur_subscription_created_at: usersSubscription.last_payment.date,
      cur_subscription_ends_at: usersSubscription.next_payment.date,
      user_email: usersSubscription.user_email,
      marketing_consent: usersSubscription.marketing_consent,
      subscription_update_url: usersSubscription.update_url,
      subscription_cancel_url: usersSubscription.cancel_url,
      plan_price:usersSubscription.last_payment.amount,
      currency:usersSubscription.last_payment.currency,
      trial_start: null,
      trial_end: null,
    }
  ])
  if(error){
    console.log(error)
    throw error;
  }
}

export const updateSubscription = async (usersSubscription, id) => {
  const { data, error } = await supabase
  .from('subscriptions')
  .update(
    {
      subscription_id : usersSubscription.subscription_id, 
      user_id: id,
      plan_id: usersSubscription.plan_id,
      subscription_state: usersSubscription.state,
      cur_subscription_created_at: usersSubscription.last_payment.date,
      cur_subscription_ends_at: usersSubscription.next_payment.date,
      user_email: usersSubscription.user_email,
      marketing_consent: usersSubscription.marketing_consent,
      subscription_update_url: usersSubscription.update_url,
      subscription_cancel_url: usersSubscription.cancel_url,
      plan_price:usersSubscription.last_payment.amount,
      currency:usersSubscription.last_payment.currency,
      trial_start: null,
      trial_end: null,
      metadata: null,
    }
    )
   .eq('user_id', id)
  if(error){
    console.log(error)
    throw error;
  }
  return data
}