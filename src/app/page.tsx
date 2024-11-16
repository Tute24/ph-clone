'use client'

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage(){

    const [productsArray, setProductsArray] = useState([])

    useEffect(()=>{
        async function fetchProducts(){
            try{
                const response = await axios.get('http://localhost:3000/productsList')
                if(response){
                    const productsData = response.data.products
                    console.log(productsData)
                    setProductsArray(productsData)
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
                            <li className="flex flex-col justify-center border-solid border-2 shadow-md rounded-lg hover:shadow-lg" key={e._id}>
                                <h2 className="font-bold p-2">{e.productName}</h2>
                                <p >About: {e.description}</p>
                                <Link href={e.productUrl} target="blank" className="mt-2 underline text-orange-500 ">Official Website</Link>
                            </li>
                        </div>
                        )
                    )
                        }
                
            </ul>
        </>
    )
}