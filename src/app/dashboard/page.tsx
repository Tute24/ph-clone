'use client'

import { Clerk } from "@clerk/clerk-js"
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import axios from "axios"

import { useEffect } from "react"

export default function Dashboard(){
    
    useEffect(()=>{
        async function getDashboard() {
            
            try{
                
                const response = await axios.get('https://ph-clone.onrender.com/dashboard')
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