import cn from 'classnames';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

import { useUser } from 'utils/useUser';
import { PricesResponse, Product } from 'types';
import { addSubscription } from '@/utils/supabase-client';
import { GetStaticPropsResult } from 'next';
import paddleApi from '@/utils/paddleApi';
import { PaddleLoader } from '@/utils/paddleLoader';

type BillingInterval = 'year' | 'month';

export default function Pricing({ customer_country, products }: PricesResponse ) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [productIdLoading, setProductIdLoading] = useState<Number|null>();
  let { user, isLoading, subscriptions } = useUser();
  useEffect(()=>{
    console.log(subscriptions);
    // subscriptions && console.log(subscriptions.map((sub)=>sub.plan_id).includes(product.product_id))
  },[subscriptions])
  //Post Checkout Functions 👇`
  function checkoutClosed(data:any) {
    console.log(data);
    setProductIdLoading(null)

    alert('Your purchase has been cancelled, we hope to see you again soon!');
  }
  
  async function checkoutComplete(checkoutdata:any) {
    setProductIdLoading(null)
    console.log(checkoutdata.product.id);

    
    let curPlansSubs = await paddleApi.getSubscriptionUsers(checkoutdata.product.id)//Getting all subscription with a product/plan id
    let [usersSubscription] = curPlansSubs.filter((sub)=>sub.user_email == user?.email)//filtering out the user's subscription on a plan/product from the above list (must be one) 
    
    console.log("User's new sub from Paddle : ", usersSubscription)

    await addSubscription(usersSubscription,user?.id)
    console.log("Added New Subscription")
    
    window.location.reload(); //refreshing to update the Subscription state in the context
  }
 
  const handleCheckout = (productId : Number) => {
    if(!user)
    {
      router.push('/signin')
      return
    }
    try {
      setProductIdLoading(productId); 
      let extraParams = {
        userId : user?.id,
        userEmail : user?.email
      }
      Paddle.Checkout.open({
        product : productId,  
        passthrough: JSON.stringify(extraParams),
        successCallback: checkoutComplete,
        closeCallback: checkoutClosed
      })
    } catch (error) {
      console.log(error)
      return alert((error as Error)?.message);
    } finally {
    }
  };

  if (!products?.length)
    return (
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl" mt={6}>
          no Products Found.
        </Heading>
     </VStack>
    );
  function PriceWrapper({ children }: { children: ReactNode }) {
      return (
        <Box
          className="card"
          w={{sm:'100%', md:'40%', lg:'40%'}}
          mb={4}
          shadow="2xl"
          borderWidth="1px"
          alignSelf={{ base: 'center', lg: 'flex-start' }}
          borderColor={useColorModeValue('gray.200', 'gray.500')}
          borderRadius={'xl'}>
          {children}
        </Box>
      );
  }
  return (
    <Box className="pricing" w='100%' h="100vh" minWidth="400px" paddingX={{sm:'5%', md:'8%', lg:'10%'}}
     display={'flex'} 
     flexDirection='column' alignItems="center">    
        <PaddleLoader/>
        <VStack spacing={2} textAlign="center" w='100%'>
          <Heading as="h1" fontSize="4xl" mt={6}>
            plans that fit your need
          </Heading>
          {/* <Text fontSize="lg" color={'gray.500'}>
            Start with 14-day free trial. No credit card needed. Cancel at
            anytime.
          </Text> */}
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          w="95%"
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}>
          <PriceWrapper>
                <Box py={4} px={12}>
                  <Text fontWeight="500" fontSize="2xl">
                  free
                  </Text>
                  <HStack justifyContent="center">
                    <Text fontSize="5xl" fontWeight="900">
                    {`$0`}
                    </Text>
                    <Text fontSize="3xl" color="gray.500">
                      /month
                    </Text>
                  </HStack>
                </Box>
                <VStack
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  py={4}
                  borderBottomRadius={'xl'}>
                  <List spacing={3} textAlign="start" px={12}>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      unlimited build minutes
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Lorem, ipsum dolor.
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      5TB Lorem, ipsum dolor.
                    </ListItem>
                  </List>
                  <Box w="80%" pt={7}>
                    <Button w="full" colorScheme="red" variant="outline" 
                    // onClick={} 
                    // isLoading={}
                    disabled={isLoading}
                    >
                      get started
                    </Button>
                  </Box>
                </VStack>
              </PriceWrapper>
          {products?.map((product) => {
            return (
                <PriceWrapper key={product.product_id}>
                  <Box py={4} px={12}>
                    <Text fontWeight="500" fontSize="2xl">
                    {product.product_title.toLowerCase()}
                    </Text>
                    <HStack justifyContent="center">
                      <Text fontSize="5xl" fontWeight="900">
                      {`$${product.price.gross}`}
                      </Text>
                      <Text fontSize="3xl" color="gray.500">
                        /{product.subscription.interval}
                      </Text>
                    </HStack>
                  </Box>
                  <VStack
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    py={4}
                    borderBottomRadius={'xl'}>
                    <List spacing={3} textAlign="start" px={12}>
                      <ListItem>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        unlimited build minutes
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        Lorem, ipsum dolor.
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaCheckCircle} color="green.500" />
                        5TB Lorem, ipsum dolor.
                      </ListItem>
                    </List>
                    <Box w="80%" pt={7}>
                      <Button w="full" colorScheme="red" variant="outline" 
                      onClick={()=> subscriptions?.length && subscriptions.map((sub)=>sub.plan_id).includes(product.product_id.toString() ) ? router.push('/account') :handleCheckout(product.product_id)} 
                      disabled={isLoading}
                      isLoading={productIdLoading === product.product_id}>
                        {
                          subscriptions?.length && subscriptions.sort((a, b) => Number(b.plan_price) - Number(a.plan_price))[0].plan_id == product.product_id.toString() ? "current subscription" 
                          : subscriptions?.length && subscriptions.map((sub)=>sub.plan_id).includes(product.product_id.toString()) ? 'manage'
                              : 'subscribe'
                        }
                      </Button>
                    </Box>
                  </VStack>
                </PriceWrapper>
            );
          })}
        </Stack>
    </Box>
  );
}



export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const res = await paddleApi.getPrices([43547,43114])
  const customer_country = res.customer_country
  const products = res.products
  return {
    props: {
      customer_country,
      products
    },
    revalidate: 60
  };
}
