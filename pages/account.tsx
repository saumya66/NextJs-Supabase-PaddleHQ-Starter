import Link from 'next/link';
import { useState, ReactNode } from 'react';

import { useUser } from 'utils/useUser';

import { User } from '@supabase/supabase-js';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import {Box,Text, Button, Stack, Flex}  from '@chakra-ui/react';
import Spinner from '@/components/ui/Spinner';
import { planIdToPlanName, planIdToPrice, plansToPrice } from '@/utils/constants';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <Box color='black' 
      display="flex" 
      flexDirection='column' 
      w='100%'  
      borderWidth='1px' 
      borderRadius='lg' 
      overflow='hidden' 
      shadow="2xl" 
      mb={4}
      p={4}>
      <Text fontWeight="bold" fontSize={'lg'}>{title}</Text >
      <Text fontSize={'sm'}>{description}</Text>
      {children}
      {footer && <Box borderTop="1px" w='100%' borderColor='gray.300' p={2} mt={2}>  {footer}</Box>}
    </Box>
  );
}

export const getServerSideProps = withPageAuth({ redirectTo: '/signin' });

export default function Account({ user }: { user: User }) {
  const [loading, setLoading] = useState(false);
  const { isLoading, subscriptions, userDetails , activeSubscriptions} = useUser();



  return (
    <Box w="100%" paddingX={['2%','10%','25%']}>
      <Text mb="3rem" fontSize="3rem" fontWeight="bold" color="white">account</Text>
      <Card
          title="Your Plan"
          description={
            activeSubscriptions
              ? `You are currently on the ${Object.keys(planIdToPlanName).includes(activeSubscriptions[0].plan_id) ? planIdToPlanName[activeSubscriptions[0].plan_id] : 'free'} plan.`
              : ''
          }
          footer={
            <Flex direction={'column'} >
              {
                subscriptions?.map((subscription)=>{
                return(<Flex direction={{base:'column',md:'row'}} justify="space-between" align="center" mb="1rem" >
                    <div>
                     {Object.keys(planIdToPlanName).includes(subscription.plan_id) ? planIdToPlanName[subscription.plan_id] : 'plain'}
                    </div>
                    <Flex direction={{md:'column',lg:'row'}}  marginY={{base:'0.8rem',md:'0rem'}}>
                      <Button
                        isLoading ={loading}
                        disabled={loading || subscription.subscription_state=='deleted'}
                        onClick={()=>window.open(subscription?.subscription_cancel_url)}
                        display={{  md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={{base : 'yellow',md:'white'}}
                        mr="1rem"
                        mb="0.4rem"
                        bg={'green.500'}
                        _hover={{
                          bg: 'green.300',
                        }}
                      >
                        {subscription.subscription_state=='deleted' ? `cancelled on ${subscription.subscription_cancelled_at && new Date(subscription.subscription_cancelled_at).toUTCString()}` : "cancel"}
                      </Button>
                      <Button
                        isLoading ={loading}
                        disabled={loading || !subscription}
                        onClick={()=>window.open(subscription?.subscription_update_url)}
                        display={{ md: 'inline-flex' }}
                        fontSize={'sm'}
                        mb="0.4rem"
                        fontWeight={600}
                        color={'white'}
                        bg={'green.500'}
                        _hover={{
                          bg: 'green.300',
                        }}
                      >
                        update payment method
                      </Button>
                    </Flex>
                  </Flex>
                )
                })
              }
            
            </Flex>
          }
        >
          <div className="text-xl mt-8 mb-4 font-semibold">
            {isLoading ? (
              <div className="h-12 mb-6">
                <Spinner />
              </div>
            ) : activeSubscriptions ? (
               `$${Object.keys(planIdToPrice).includes(activeSubscriptions[0].plan_id) ? planIdToPrice[activeSubscriptions[0].plan_id] : '0'}/month`
            ) : (
              <Link href="/">
                <a>Choose your plan</a>
              </Link>
            )}
          </div>
        </Card>
        <Card
          title="Your Email"
          description=""
          // footer={}
        >
          <p className="text-xl mt-8 mb-4 font-semibold">
            {user ? user.email : undefined}
          </p>
        </Card>
    </Box>
  );
}
