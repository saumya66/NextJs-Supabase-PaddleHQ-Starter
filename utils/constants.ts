export interface KeyValueType{
    [props:string]:string
}
export const plansToPrice:KeyValueType = {
    "superb" : '10.99',
    "pro" : '8'
}

export const priceToPlans:KeyValueType = {
    "10.99" : 'superb',
    "8" : 'pro'
}

export const planIdToPrice:KeyValueType = {
   "43547" : "10.99",
    "43114" : "8"
}
export const planIdToPlanName:KeyValueType = {
    "43547" : "superb",
     "43114" : "pro"
 }
 