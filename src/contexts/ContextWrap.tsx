"use client"
import { createContext, useContext, useState } from "react";

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

    const [statusMessage,setStatusMessage]= useState('')
    const [tagsArray, setTagsArray] = useState<string[]>([])

    return(
        <ContextWrap.Provider value={{productInfos, setProductInfos,statusMessage,setStatusMessage, tagsArray, setTagsArray}} >
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