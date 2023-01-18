import { getActiveProductsWithPrices } from 'utils/supabase-client';
import { Product } from 'types';
import { GetStaticPropsResult } from 'next';
import { PaddleLoader } from '@/utils/paddleLoader';

interface Props {
  products: Product[];
}

export default function PricingPage({ products }: Props) {
  return( 
  <>
    <PaddleLoader/>
    <h1>main page</h1>
    <button onClick={()=>{Paddle.Checkout.open({product : "43114"})}}>Buy Now</button>
  </> 
  )
}
