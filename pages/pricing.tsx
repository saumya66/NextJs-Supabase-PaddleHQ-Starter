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

import { postData } from 'utils/helpers';
import { useUser } from 'utils/useUser';
import { PricesResponse, Product } from 'types';
import { getActiveProductsWithPrices } from '@/utils/supabase-client';
import { GetStaticPropsResult } from 'next';
import paddleApi from '@/utils/paddleApi';
import { PaddleLoader } from '@/utils/paddleLoader';

type BillingInterval = 'year' | 'month';

export default function Pricing({ customer_country, products }: PricesResponse ) {
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>('month');
  const [productIdLoading, setProductIdLoading] = useState<Number|null>();
  const { user, isLoading, subscription } = useUser();
  // console.log(customer_country,products)


  function checkoutClosed(data:any) {
    console.log(data);
    setProductIdLoading(null)
    alert('Your purchase has been cancelled, we hope to see you again soon!');
  }
  
  function checkoutComplete(data:any) {
    console.log(data);
    setProductIdLoading(null)
    alert('Thanks for your purchase.');
  }

  const handleCheckout = (productId : Number) => {
    try {
      
      setProductIdLoading(productId); 
      Paddle.Checkout.open({
        product : productId,  
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
          No Products Found.
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
          {products?.map((product) => {
            // const priceString = new Intl.NumberFormat('en-US', {
            //   style: 'currency',
            //   currency: price.currency,
            //   minimumFractionDigits: 0
            // }).format((price?.unit_amount || 0) / 100);
            return (
                <PriceWrapper key={product.product_id}>
                  <Box py={4} px={12}>
                    <Text fontWeight="500" fontSize="2xl">
                    {product.product_title}
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
                      onClick={()=>handleCheckout(product.product_id)} 
                      disabled={isLoading}
                      isLoading={productIdLoading === product.product_id}>
                        {product.product_id === subscription?.product_id ? 'Manage'
                              : 'Subscribe'}
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
  const res = await paddleApi.getPrices([43547,43114,43548])
  const customer_country = res.customer_country
  const products = res.products
  return {
    props: {
      customer_country,
      products
    },
    // revalidate: 60
  };
}
