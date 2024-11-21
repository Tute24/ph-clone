"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextWrapProps {
        productInfos: {
            productName: string,
            description: string,
            productUrl: string,
            tags:string[]
        };
        setProductInfos: (
            value: 
            {
                productName: string,
                description: string,
                productUrl: string,
                tags:string[]
            }
        ) => void;
        statusMessage: string;
        setStatusMessage: (value:string) => void;
        tagsArray: string[];
        setTagsArray: (value: string[]) => void;
        upVoteProduct: {
            product: string
        }
        setUpVoteProduct: (value:{
            product:string
        }) => void
}

const ContextWrap = createContext<ContextWrapProps | undefined>(undefined)

export function ContextWrapProvider ({children}: {children: React.ReactNode}){
    const [productInfos,setProductInfos] = useState<{productName: string,
        description: string,
        productUrl: string,
        tags:string[]}>({
            productName: '',
            description: '',
            productUrl: '',
            tags: []
        })

    const [statusMessage,setStatusMessage]= useState<string>('')

    const [tagsArray, setTagsArray] = useState<string[]>([])
    const [upVoteProduct, setUpVoteProduct] = useState<{
        product: string
    }>({
        product:''
    })
    
    useEffect(()=>{
        const storagedTags = localStorage.getItem('tags')

        if(storagedTags){
            setTagsArray(storagedTags.split(','))
        }
    },[])

    useEffect(()=>{
        if(tagsArray.length > 0)
            {
                localStorage.setItem('tags',tagsArray.join(','))
            }
    },[tagsArray])

    useEffect(()=>{
        async function voteUp(){
           console.log(upVoteProduct)
           try{
               const response = await axios.post('http://localhost:3000/upVote',upVoteProduct)
           }catch(error){
            console.log(error)
           }       
   }
   voteUp()
   },[upVoteProduct])

    return(
        <ContextWrap.Provider value={{
            productInfos, 
            setProductInfos,
            statusMessage,
            setStatusMessage, 
            tagsArray, 
            setTagsArray, 
            upVoteProduct,
            setUpVoteProduct
            }} >
            {children}
        </ContextWrap.Provider>
    )
}

export function useContextWrap(){
    const wrapContext = useContext(ContextWrap)

    if(!wrapContext){
        throw new Error('Context Error')
    }

    return wrapContext
}