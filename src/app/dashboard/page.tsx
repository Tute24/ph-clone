'use client'

import { Clerk } from '@clerk/clerk-js'
import { SignedIn, SignedOut, useClerk, useSession } from '@clerk/clerk-react'
import axios from 'axios'

import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { session } = useSession()
  const [isSeassionLoaded, setIsSessionLoaded] = useState<boolean>(false)

  

  useEffect(() => {
    async function getDashboard() {
        if(session){
            setIsSessionLoaded(true)
        }
        
      

      try {
        if(isSeassionLoaded){
        const token = await session?.getToken()
        const response = await axios.get(
          'https://ph-clone.onrender.com/dashboard',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response.data)}
      } catch (error) {
        console.log(error)
      }
    }
    getDashboard()
  }, [session,isSeassionLoaded])
  return (
    <>
      <SignedOut>
        <h2>Você não está logado!</h2>
      </SignedOut>
      <SignedIn>
        <h2>Oi Mundo</h2>
      </SignedIn>
    </>
  )
}
