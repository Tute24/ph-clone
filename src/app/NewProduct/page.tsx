'use client'

import ProductForm from "@/components/ProductForm/ProductForm";
import { useContextWrap } from "@/contexts/ContextWrap";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";


export default function NewProduct(){

    const {productInfos,setProductInfos} = useContextWrap()

    function handleInputChange(e:any){
        setProductInfos(
            {
                ...productInfos,
            [e.target.name] : e.target.value
            }
        )
    }

    async function handleSubmit(e:any){
        e.preventDefault()
        
        try{
            
        } catch(error){
            console.log(error)
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