'use client'

import { SignedOut, SignInButton } from "@clerk/clerk-react"
import { SignedIn } from "@clerk/nextjs"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage(){

    const [productsArray, setProductsArray] = useState([])
    const [tagsArray, setTagsArray] = useState<string[]>([])
    const [upVoteProduct, setUpVoteProduct] = useState<string>('')

    useEffect(()=>{
        async function fetchProducts(){
            try{
                const response = await axios.get('http://localhost:3000/productsList')
                if(response){
                    const productsData = response.data.products
                    const tagsFetch: string[] = productsData.flatMap((e:{
                        _id: string,
                        description:string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    } ) => e.tags.flatMap(tag => tag.split(/,\s*/)))
                    console.log(tagsFetch)
                    console.log(productsData)
                    setProductsArray(productsData)
                    setTagsArray([... tagsArray])

                    const uniqueTags = [... new Set (tagsFetch)]
                    setTagsArray(uniqueTags)
                    
                }
            }catch(error){
                console.log(error)
        }
    }
    fetchProducts()
},[])

    function idVote(e:any){
        setUpVoteProduct(e.target.id)
    }

    async function voteUp(){
            try{
                const response = await axios.post('http://localhost:3000/upVote',upVoteProduct)
            } catch(error){
                console.log(error)
            }
    }

    

    return(
        <>
        <div className="flex flex-row ">
            <div className="w-9/12">
                <h1 className="flex justify-center p-4 font-bold">Products:</h1>
                <ul className="flex flex-col text-center items-center">
                    {productsArray.map((e:{
                        _id: string,
                        description:string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                    }) => (
                            <div key={e._id} className="p-5 border-gray-400 w-3/5">
                                <li key={e._id} className="flex flex-col justify-center border-solid border-2 shadow-md rounded-lg hover:shadow-lg" >
                                    <h2 className="font-bold p-2">{e.productName}</h2>
                                    <div className="flex flex-row justify-evenly items-center ">
                                        
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
                                            <button id={e._id} className="px-2 border-solid border-2 border-gray-200 rounded-md" type="button" onClick={()=>{idVote;voteUp}}><img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" /><span>{e.upVotes}</span></button>
                                        </SignedIn>
                                    </div >
                                    <div className="text-xs text-orange-500 p-2 flex flex-row gap-2">

                                        {e.tags.flatMap(tag => tag.split(/,\s*/)).map((item, index) =>(
                                                <span className="hover:underline cursor-pointer" key={`${e._id}-${index}`}>{item}</span>
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
                        <span className="text-sm text-orange-500 hover:underline cursor-pointer">{e}</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        </>
    )
}