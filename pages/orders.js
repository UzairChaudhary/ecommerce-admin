import Layout from "@/components/layout"
import {Card, CardHeader} from "@nextui-org/react";

export default function Orders(){
    return(
        <Layout>
            <h1> Orders</h1>
            
            <div className="flex flex-row mt-8 gap-5 ml-5 ">
            <Card className="py-4 bg-gray-400 w-60 pl-2">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Total Orders Today </p>

                    <h4 className="font-bold text-large">3000 Orders</h4>
                </CardHeader>
      
            </Card>
            <Card className="py-4 bg-gray-400 w-60 pl-2">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Orders Shipped Today</p>

                    <h4 className="font-bold text-large">100 Orders</h4>
                </CardHeader>
      
            </Card>
            </div>
            <div className="flex flex-row mt-8 gap-5 ml-5 ">
            <Card className="py-4 bg-gray-400 w-60 pl-2">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Total Orders This Month</p>

                    <h4 className="font-bold text-large">6000 Orders</h4>
                </CardHeader>
                </Card>
                <Card className="py-4 bg-gray-400 w-60 pl-2">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Total Orders This Year</p>

                    <h4 className="font-bold text-large">25000 Orders</h4>
                </CardHeader>
                </Card>

            </div>

        </Layout>
    )
  
}
