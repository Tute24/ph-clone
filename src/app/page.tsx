'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage(){

    const [productsArray, setProductsArray] = useState([])
    const [tagsArray, setTagsArray] = useState<string[]>([])

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

    

    return(
        <>
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
                                <div className="flex flex-row justify-evenly items-center p-2">
                                    <p >About: {e.description}</p>
                                    <Link href={e.productUrl} target="blank" className=" underline text-orange-500 ">Official Website</Link>
                                </div >
                                <div className="text-xs p-2 flex flex-row gap-2">

                                    {e.tags.flatMap(tag => tag.split(/,\s*/)).map((item, index) =>(
                                             <span className="underline" key={`${e._id}-${index}`}>{item}</span>
                                        ))}
                                </div>
                            </li>
                        </div>
                        )
                    )
                        }
                
            </ul>
        </>
    )
}