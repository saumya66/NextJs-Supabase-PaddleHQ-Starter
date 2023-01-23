import axios from "axios"
import { PricesResponse } from "types";

export interface PaddleApi{
    getPrices(this:Number[]) : ()=>Promise<PricesResponse>
}
// const PADDLE_API_URL = "https://checkout.paddle.com/api" //use this in live
const PADDLE_API_URL = "https://sandbox-checkout.paddle.com/api" //use this in sandbox
const paddleApi={

    getPrices : async function getPrices(product_ids : Number[]):Promise<PricesResponse> {
        let res:any;
        try{
            res = await axios.get(`${PADDLE_API_URL}/2.0/prices\?product_ids=${product_ids.join(',')}`)
            return res.data.response
        }
        catch(err){
            console.log(res?.status,res?.statusText)
            throw new Error(res?.statusText)
        }
    }
    
}

export default paddleApi