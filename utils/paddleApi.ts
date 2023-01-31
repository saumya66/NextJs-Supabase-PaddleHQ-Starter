import axios from "axios"
import { PaddleSubscriptionUser, PricesResponse } from "types";

export interface PaddleApi{
    getPrices(this:Number[]) : ()=>Promise<PricesResponse>
}
// const PADDLE_API_URL = "https://checkout.paddle.com/api" //use this in live
const PADDLE_API_URL = "https://sandbox-checkout.paddle.com/api" //use this in sandbox
const paddleApi={

    getPrices : async function getPrices(product_ids : Number[]):Promise<PricesResponse> {
        let res:any;
        try{
            res = await axios.get(`https://sandbox-checkout.paddle.com/api/2.0/prices/?product_ids=${product_ids.join(',')}`)
            return res.data.response
        }
        catch(err:any){
            console.log(err)
            throw new Error(err)
        }
    },

    getSubscriptionUsers : async function getSubscriptionUsers(plan_id:number):Promise<PaddleSubscriptionUser[]>{
        let res:any;
        console.log(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID, process.env.NEXT_PUBLIC_PADDLE_AUTH_KEY)
        const options = {
            method: 'POST',
            url: `https://sandbox-vendors.paddle.com/api/2.0/subscription/users`,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: { 
              vendor_id: process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID,
              vendor_auth_code: String(process.env.NEXT_PUBLIC_PADDLE_AUTH_KEY),
              plan_id: plan_id  
            }
          };
        try{
            res = await axios(options)
            return res.data.response
        }
        catch(err:any){
            console.log(err)
            throw new Error(err)
            // throw new Error(res?.statusText)
        }
    } 
    
}

export default paddleApi