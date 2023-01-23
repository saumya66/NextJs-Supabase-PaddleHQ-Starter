import Script from "next/script"

export function PaddleLoader(){
    return (
    <> 
        <Script src="https://cdn.paddle.com/paddle/paddle.js" onLoad={()=>{ 
            Paddle.Environment.set("sandbox");
            Paddle.Setup({
                vendor : Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID)
            })
            }}
        />
    </>
    )
}