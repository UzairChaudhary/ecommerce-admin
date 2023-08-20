import { useSession, signIn } from "next-auth/react"
import { useState } from "react";
import Nav from "@/components/nav"
import Logo from "./logo";
export default function Layout({children}) {
  const { data: session } = useSession()
  const [showNav, setshowNav] = useState(false);
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
  <div className="bg-bgGray min-h-screen ">
    <div className="block md:hidden flex items-center">
    <button 
    onClick={()=> setshowNav(true)}
    type="button" className="text-black pl-0 ">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>

    </button>
    <div className="flex grow justify-center mr-6">
    <Logo />
    </div>
    </div>
    <div className="flex">
      <Nav show={showNav} />
      <div className="flex-grow p-4 " >
          {children} <br/>
      </div>
    
  </div>
  </div>
)

}
