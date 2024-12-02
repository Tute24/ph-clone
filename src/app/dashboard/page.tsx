'use client'

import { Clerk } from "@clerk/clerk-js"
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import axios from "axios"

import { useEffect } from "react"


export default function Dashboard(){
    
    useEffect(()=>{
        async function getDashboard() {
            const nextPublicKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
            if(!nextPublicKey){
                throw new Error('Publick Key not provided!')
            }

            const clerk = new Clerk(nextPublicKey)
            try{
                await clerk.load()
                const token = await clerk.session?.getToken()
                if(!token){
                    console.log('No token provided!')
                    return
                }
                console.log(token)
                const response = await axios.get('/dashboard',{headers:{
                    'Authorization': `Bearer ${token}`
                }})
            }catch(error){
                console.log(error)
            }
            
    }
    getDashboard()
    },[])
    return(
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