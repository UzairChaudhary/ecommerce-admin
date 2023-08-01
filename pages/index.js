import Layout from "@/components/layout"
import {useSession} from 'next-auth/react'
export default function Home() {
  const {data:session} = useSession();
  if (!session) return;
  return(
    <Layout>
      <div className="text-blue-900">
      {session.user.email}
    </div>
    </Layout>
    
  )
}
