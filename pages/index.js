import Layout from "@/components/layout"
import {useSession,signIn} from 'next-auth/react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
export default function Home() {
  //const {data:session} = useSession();
  // if (!session) {
  //   return(
  //     <Layout>
  //       <div className="text-blue-900 flex justify-between">

  //       <h2>Not Signed In</h2>
  //       <button className="btn-primary bg-blue-900 text-white py-1 px-2 rounded-md" onClick={() => signIn()}>Sign In</button>
  //       </div>
  //     </Layout>

  //   )
  // } ;
  // console.log(session)
  return(
    <Layout>
      <div className="text-blue-900 flex justify-between">
      <h2>Hello, <strong>Admin</strong></h2>
      {/* <h2>Hello, <strong>{session.user.name}</strong></h2> */}
      {/* <div className="flex bg-gray-300 gap-1 text-black">
      <img src={session.user.image} alt="Profile Pic" className="w-6 h-6"/>
      <span className="px-2">
        {session.user.name}
      </span> 
      

      </div>*/}
      
    </div>
    <div className="flex flex-row mt-8 gap-5 ml-5 ">
    <Card className="py-4 bg-gray-400 w-60 pl-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start  ">
        <p className="text-tiny uppercase font-bold">Weekly Sales</p>
        <small >Increased by 10%</small>
        <h4 className="font-bold text-large">$1000</h4>
      </CardHeader>
      
    </Card>
    <Card className="py-4 bg-gray-400 w-60 pl-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Weekly Orders</p>
        <small >Increased by 40%</small>
        <h4 className="font-bold text-large">$5000</h4>
      </CardHeader>
      
    </Card>
    <Card className="py-4 bg-gray-400 w-60 pl-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Monthly Sales</p>
        <small >Increased by 40%</small>
        <h4 className="font-bold text-large">$25000</h4>
      </CardHeader>
      
    </Card>
    <Card className="py-4 bg-gray-400 w-60 pl-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Page Views</p>
        <small >Increased by 5%</small>
        <h4 className="font-bold text-large">567 Views</h4>
      </CardHeader>
      
    </Card>
      
    </div>
    
    </Layout>
    
  )
}
