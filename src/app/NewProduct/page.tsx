'use client'

import ProductForm from "@/components/ProductForm/ProductForm";
import { useContextWrap } from "@/contexts/ContextWrap";
import { SignedIn, SignedOut, SignInButton, useSession } from "@clerk/nextjs";
import axios from "axios";
import Unauthorized from "@/components/UnauthorizedLayout/Unauthorized";


export default function NewProduct(){

    const {productInfos,setProductInfos, statusMessage,setStatusMessage, isLoading,setIsLoading} = useContextWrap()
    const {session} = useSession()
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
        if(!session){
            console.log(`There's no active session!`)
            return
        }
        try{
                setIsLoading(true)
                const token = await session?.getToken()
                const response = await axios.post('https://ph-clone.onrender.com/newProduct', productInfos, {headers:{
                    Authorization: `Bearer ${token}`
                }})
            if(response){
                console.log(productInfos)
                
                setStatusMessage('Product added successfully!')
            }
            
        } catch(error){
            console.log(error)
            setStatusMessage(`Couldn't add the product.`)
        } finally{
            setIsLoading(false)
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
                <Unauthorized/>
            </SignedOut>
        </>
    )
}