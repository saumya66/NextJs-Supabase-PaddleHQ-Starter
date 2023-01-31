import { useEffect, useState, createContext, useContext } from 'react';
import {
  useUser as useSupaUser,
  useSessionContext,
  User
} from '@supabase/auth-helpers-react';
import { Subscription, UserDetails } from 'types';

type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscriptions: Subscription[] | null;
  activeSubscriptions: Subscription[] | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  console.log("Inside")
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase
  } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(null);
  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[] | null>(null);

  const getUserDetails = () => supabase.from('users').select('*').eq("id",user?.id).single();
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*')
      .eq("user_id",user?.id)
      // .single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscriptions) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];

          if (userDetailsPromise.status === 'fulfilled')
            setUserDetails(userDetailsPromise.value.data);

          if (subscriptionPromise.status === 'fulfilled')
          {
            setSubscriptions(subscriptionPromise.value.data && subscriptionPromise.value.data);//storing all subscriptions both active and cancelled
            setActiveSubscriptions(             ///storing all active subscription in order of highest to lowest priced plans 
              subscriptionPromise.value.data && 
              subscriptionPromise.value.data
              .filter((sub)=>sub.subscription_state == 'active')
              .sort((a, b) => Number(b.plan_price) - Number(a.plan_price))
            )
          }

          setIsloadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscriptions(null);
      setActiveSubscriptions(null)
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscriptions,
    activeSubscriptions
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
