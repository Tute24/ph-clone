'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect } from "react"


export default function TagPage(){

    const {tag} = useParams<{tag:string}>()
    const decodedTag = {decoded: decodeURIComponent(tag)}

    useEffect(()=>{
        async function getAll(){
            try{
                const response = await axios.post('http://localhost:3000/getAll',decodedTag)
                const products = response.data.products
                
                const filteredProducts = products.filter((product:{
                    _id: string,
                        description:string,
                        productName:string,
                        productUrl: string,
                        tags:string[],
                        upVotes: number
                }) =>(
                    product.tags.flatMap(tag => tag.split(/,\s*/)).includes(decodedTag.decoded)
                ))

                console.log(filteredProducts)
            }catch(error){
    
            }
        }
        getAll()
    },[])

    return(
        <h2>{decodeURIComponent(tag)}</h2>
    )
}