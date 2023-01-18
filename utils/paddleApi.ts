import axios from "axios"
import { ApiCallReturn, Prices } from "types";

export interface PaddleApi{
    getPrices(this:Number[]) : ()=>Promise<Prices>
}
const PADDLE_API_URL = "https://checkout.paddle.com/api"
const paddleApi={

    getPrices : async function getPrices(product_ids : Number[]):Promise<Prices> {
        let res;
        try{
            res = await axios.get(`${PADDLE_API_URL}/2.0/prices\?product_ids=${product_ids.join(',')}`)
            return res.data
        }
        catch(err){
            console.log(res?.status,res?.statusText)
            throw new Error(res?.statusText)
        }
    }
    
}

export default paddleApi