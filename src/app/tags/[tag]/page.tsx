'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function TagPage(){

    const {tag} = useParams<{tag:string}>()
    const decodedTag = {decoded: decodeURIComponent(tag)}
    const [selectedTagArray,setSelectedTagArray] = useState([])

    useEffect(()=>{
        async function getProductsWithTag(){
            try{
                const response = await axios.post('http://localhost:3000/getAll',decodedTag)
                const products = response.data.products
                setSelectedTagArray(products)
                console.log(products)
                console.log(selectedTagArray)
            }catch(error){
                console.log(error)
            }
        }
        getProductsWithTag()
    },[])

    return(
        <div>
            <h1 className="flex justify-center p-4 font-bold">{decodedTag.decoded} products: </h1>
            <div className="w-9/12">
                <ul className="flex flex-col text-center items-center">
                    {selectedTagArray.map((products:{
                        _id: string,
                        description:string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    }) =>  (
                            <div key={products._id} className="p-5 border-gray-400 w-3/5">
                                <li key={products._id} className="flex flex-col justify-center border-solid border-2 shadow-md rounded-lg hover:shadow-lg" >
                                        <h2 className="font-bold p-2">{products.productName}</h2>
                                        <div className="flex flex-row justify-between gap-4 items-center ml-5 mr-5 ">
                                            <p>About: {products.description}</p>
                                            <Link href={products.productUrl} target="blank" className="  text-orange-500 hover:underline ">
                                            Official Website
                                            </Link>
                                            <SignedOut>
                                                <SignInButton mode="modal">
                                                <button className="px-2 border-solid border-2 border-gray-200 rounded-md" type="button" >
                                                    <img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" />
                                                    <span>
                                                        {products.upVotes}
                                                    </span>
                                                </button>
                                                </SignInButton>
                                            </SignedOut>
                                            <SignedIn>
                                                <button type="button" className="px-2 border-solid border-2 border-gray-200 rounded-md" onClick={()=>{
                                                    products.upVotes++
                                                }}>
                                                    <img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" />
                                                    <span className="text-orange-500">
                                                        {products.upVotes}
                                                    </span>
                                                </button>
                                            </SignedIn>
                                        </div>
                                        <div className="text-xs text-orange-500 p-2 flex flex-row gap-2">
                                            {products.tags.flatMap(tag => tag.split(/,\s*/)).map((tag,index)=>(
                                                <Link href={`/tags/${tag}`} key={`${products._id} - ${index}`}>
                                                    <span className="hover:underline cursor-pointer">
                                                        {tag}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                </li>
                            </div>

                            )
                        )
                    }
                </ul>
            </div>
            
        </div>
    )
}


