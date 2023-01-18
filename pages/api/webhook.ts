import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange
} from 'utils/supabase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyPaddleWebhook } from 'verify-paddle-webhook';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(!req.body) return res.status(401).json({error: "No req body found"})
  
  console.log(req.body)
  // const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
  // MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAuQ3c7lIBLYCoSVPUJ6bm5OYaeFIeqJ4U/kQH0RQbUm5axhCkXCxjMLVBRPFpRE+6Q9+jUefZw7hdnrg7+y9dX33b4zK1QGpMcMlIy+IYQpaw5cniljy0OcdqObuzJYyB0hhNMHWIcvtmxXs+GhdUdcuipnA23hExRoNWZKoz1SEogZhBTZjOqvghpKpCWuqT/6kvhwyjRxvO4V0rzLiNbGaYAtNAyFPUCKhlISy4SmIy6JnhAw+UVBwPAj1Kraj+j9n7Qvp9FYsfPJrYpBk7qf6o7ZGe77opEO83WaCGVaDp49R1Vx4N88ISerVP7QzRPki/uExWquwtuS2D6Kavj+eYp1scW1XSWLD+17fdw8YMzbFRcPh/S69vaB67TCJUraB0sf3czpuWcwDLUuR1E7qu1N238tnwZdYgdQzkdu6SMSbFD2DAHGEo2tBdBN0s7RwuKnxlzSeGt3s9Aj7dLnLx8i8puvG/jTZY1KGYAGOFZHvypqltj9KM3dyN0JZrMsfd5nbzfRfWLpd6ljo1uNB4za0iYYsUBQGAt3iA9qXaz+PvAv4a+WKA+wBIzxEW938F+f43HfFMmUbXYBUsc11MRmMSCZdsyrwCCZivwbvPWyger24XV1c4DTdG7WMRptF82ggcnAP2PquBDobba3cjMuihkaX0dKyYV4+20WUCAwEAAQ==
  // -----END PUBLIC KEY-----`;
  // if (verifyPaddleWebhook(PUBLIC_KEY, req.body)) {
    // console.log('Webhook is valid!');
    if(req.body.alert_name === "subscription_created"){
      res.status(200).json({success: "true"})
    }
  // }
  else {console.log("invalid");res.status(400).json({success: "false"})}
  
};

