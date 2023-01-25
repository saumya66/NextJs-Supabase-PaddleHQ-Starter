import {
  createBrowserSupabaseClient,
  User
} from '@supabase/auth-helpers-nextjs';
import { PaddleSubscriptionUser, Subscription, SubscriptionCancelWebhookRequest } from 'types';

export const supabase = createBrowserSupabaseClient();


export const updateUserName = async (user: User, name: string) => {
  await supabase
    .from('users')
    .update({
      full_name: name
    })
    .eq('id', user.id);
};

export const addSubscription = async (usersSubscription:PaddleSubscriptionUser, id:string|null) => {
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
      subscription_cancelled_at:null,
      trial_start: null,
      trial_end: null,
    }
  ])
  if(error){
    console.log(error)
    throw error;
  }
}

export const cancelSubscription = async (subscription_id:string , status:string,cancelled_at:string) => {
  const { data, error } = await supabase
  .from('subscriptions')
  .update(
    {
      subscription_state: status,
      subscription_cancelled_at:cancelled_at,
    }
    )
   .eq('subscription_id', subscription_id)
  if(error){
    console.log(error)
    throw error;
  }
  return data
}