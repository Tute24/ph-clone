'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import { SignedOut, SignInButton } from "@clerk/clerk-react"
import { SignedIn } from "@clerk/nextjs"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage(){
    const {tagsArray, setTagsArray} = useContextWrap()
    const {upVoteProduct, setUpVoteProduct} = useContextWrap()
    const [productsArray, setProductsArray] = useState([])
    const [mouseOverProduct,setMouseOverProduct] = useState<string>('')
    
    useEffect(()=>{
        async function fetchProducts(){
            try{
                const response = await axios.get('http://localhost:3000/productsList')
                if(response){
                    const productsData = response.data.products
                    const tagsFetch: string[] = productsData.flatMap((e:{
                        _id: string,
                        description:string,
                        summDesc: string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    } ) => e.tags.flatMap(tag => tag.split(/,\s*/)))
                    setProductsArray(productsData)
                    const uniqueTags = [... new Set (tagsFetch)]
                    setTagsArray(uniqueTags)
                    
                }
            }catch(error){
                console.log(error)
        }
    }
    fetchProducts()
},[])

    return(
        <>
        <div className="flex flex-row ">
            <div className="w-9/12">
                <h1 className="flex justify-center p-4 font-bold">Products:</h1>
                <ul className="flex flex-col text-center items-center">
                    {productsArray.sort((a:{
                        _id: string,
                        description:string,
                        summDesc: string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    },b:{
                        _id: string,
                        description:string,
                        summDesc: string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    }) => b.upVotes - a.upVotes).map((e:{
                        _id: string,
                        description:string,
                        summDesc: string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    }) => (
                            <div id={e.productName}  key={e._id} className="p-5 border-gray-400 w-3/5">
                                <li key={e._id} className="flex flex-col justify-center border-solid border-2 shadow-md rounded-lg hover:shadow-lg" >
                                    <h2 className="font-bold p-2">{e.productName}</h2>
                                    <div className="flex flex-row justify-between gap-4 items-center ml-5 mr-5 ">
                                        
                                        <p >About: {e.description}</p>
                                        <Link href={e.productUrl} target="blank" className="  text-orange-500 hover:underline ">Official Website</Link>
                                        <SignedOut>
                                            <SignInButton mode="modal">
                                                <button className="px-2 border-solid border-2 border-gray-200 rounded-md" type="button" >
                                                    <img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" />
                                                    <span>
                                                        {e.upVotes}
                                                    </span>
                                                </button>
                                            </SignInButton>
                                        </SignedOut>
                                        <SignedIn>
                                            <input type="hidden" name="product" value={e._id} />
                                            <button onClick={()=>{
                                setUpVoteProduct({
                                    product: e._id
                                }); e.upVotes++
                            }} className="px-2 border-solid border-2 border-gray-200 rounded-md" type="button">
                                                <img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" />
                                                <span className="text-orange-500">
                                                    {e.upVotes}
                                                </span>
                                            </button>
                                        </SignedIn>
                                    </div >
                                    <div className="text-xs text-orange-500 p-2 flex flex-row gap-2">

                                        {e.tags.flatMap(tag => tag.split(/,\s*/)).map((item, index) =>(
                                                <Link key={`${e._id}-${index}`} href={`/tags/${item}`}>
                                                    <span className="hover:underline cursor-pointer">
                                                        {item}
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
            <div>
                <h2 className="flex justify-center p-4 font-bold">Categories:</h2>
                <ul className="flex flex-row m-auto">
                    {tagsArray.map(e =>(
                    <li className="p-2" key={e}>
                        <Link href={`/tags/${e}`}>
                            <span className="text-sm text-orange-500 hover:underline cursor-pointer">
                                {e}
                            </span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}