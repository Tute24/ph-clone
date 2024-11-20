'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"


export default function TagPage(){

    const {tag} = useParams<{tag:string}>()
    const decodedTag = {decoded: decodeURIComponent(tag)}

    useEffect(()=>{
        async function getProductsWithTag(){
            try{
                const response = await axios.post('http://localhost:3000/getAll',decodedTag)
                const products = response.data.products
                console.log(products)
            }catch(error){
                console.log(error)
            }
        }
        getProductsWithTag()
    },[])

    return(
        <h2>{decodeURIComponent(tag)}</h2>
    )
}