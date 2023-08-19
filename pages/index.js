import Layout from "@/components/layout"
import {useSession,signIn} from 'next-auth/react'
export default function Home() {
  const {data:session} = useSession();
  if (!session) {
    return(
      <Layout>
        <div className="text-blue-900 flex justify-between">

        <h2>Not Signed In</h2>
        <button className="btn-primary bg-blue-900 text-white py-1 px-2 rounded-md" onClick={() => signIn()}>Sign In</button>
        </div>
      </Layout>

    )
  } ;
  console.log(session)
  return(
    <Layout>
      <div className="text-blue-900 flex justify-between">
      <h2>Hello, {session.user.name}</h2>
      <div className="flex bg-gray-300 gap-1 text-black">
      <img src={session.user.image} alt="Profile Pic" className="w-6 h-6"/>
      <span className="px-2">
        {session.user.name}
      </span>


      </div>
    </div>
    </Layout>
    
  )
}
