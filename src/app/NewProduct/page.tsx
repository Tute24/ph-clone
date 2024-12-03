'use client'

import ProductForm from "@/components/ProductForm/ProductForm";
import { useContextWrap } from "@/contexts/ContextWrap";
import { SignedIn, SignedOut, SignInButton, useSession } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

export default function NewProduct(){

    const {productInfos,setProductInfos} = useContextWrap()
    const {statusMessage,setStatusMessage} = useContextWrap()
    const {session} = useSession()
    const [isSeassionLoaded,setIsSessionLoaded] = useState<boolean>(false)
    function handleInputChange(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
        setProductInfos(
            {
                ...productInfos,
            [e.target.name] : e.target.value
            }
        )
    }

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        if(session){
            setIsSessionLoaded(true)
        }
        try{
            if(isSeassionLoaded){
                const token = await session?.getToken()
                const response = await axios.post('https://ph-clone.onrender.com/newProduct', productInfos, {headers:{
                    Authorization: `Bearer ${token}`
                }})
            if(response){
                console.log(productInfos)
                setStatusMessage('Product added successfully!')
            }
            }
            
        } catch(error){
            console.log(error)
            setStatusMessage(`Couldn't add the product.`)
        }
    }
    
    return(
        <>
            <SignedIn>
                <ProductForm 
                    productInfos={productInfos}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}                   
                />
            </SignedIn>
            <SignedOut>
                <h2>
                    You must be logged in to add a new product.
                </h2>
                <SignInButton>
                    <button type="button">
                        Log in
                    </button>
                </SignInButton>
            </SignedOut>
        </>
    )
}