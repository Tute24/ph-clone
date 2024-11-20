'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import axios from "axios"
import { useParams } from "next/navigation"


export default function TagPage(){

    const {tag} = useParams<{tag:string}>()

    async function getAll(){
        try{
            const response = await axios.post('http://localhost:3000/getAll')
        }catch(error){

        }
    }

    return(
        <h2>{decodeURIComponent(tag)}</h2>
    )
}