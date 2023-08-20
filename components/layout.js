import { useSession, signIn } from "next-auth/react"
import Nav from "@/components/nav"
export default function Layout({children}) {
  const { data: session } = useSession()
  if (!session){
  return (
    <div className='bg-bgGray w-screen h-screen flex items-center'  > 
      <div className='text-center w-full'>
          <button className='btn-primary bg-white text-black p-2 px-4 rounded-lg'onClick={() => signIn('google')}>Login with Google</button>
      </div>
    </div>
  )
};
return (
  <div className="bg-bgGray min-h-screen flex">
      <Nav/>
      <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2 " >
          {children} <br/>
      </div>
    
  </div>
)

}
