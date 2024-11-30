'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProdArrayProps from "@/types/ProdArrayProps"
import DialogModal from "@/components/DialogModal/DialogModal"

export default function TagPage(){

    const {tag} = useParams<{tag:string}>()
    const decodedTag = {decoded: decodeURIComponent(tag)}
    const {modalDisplay} = useContextWrap()
    const {upVoteProduct, setUpVoteProduct} = useContextWrap()
    const {dialogRef,setDialogRef} = useContextWrap()
    const {selectedLi,setSelectedLi} = useContextWrap()
    const {rankingIndex,setRankingIndex} = useContextWrap()
    const [selectedTagArray,setSelectedTagArray] = useState<ProdArrayProps[]>()
    const {tagsArray, setTagsArray} = useContextWrap()
    
    useEffect(() => {
        if (tagsArray.length === 0) {
            console.log("Tags ainda não carregadas");
        } else {
            console.log("Tags carregadas do contexto:", tagsArray);
        }
    }, [tagsArray])

    useEffect(()=>{
        async function getProductsWithTag(){
            try{
                const response = await axios.post('http://localhost:3000/getAll',decodedTag)
                const products = response.data.products
                setSelectedTagArray(products)               
            }catch(error){
                console.log(error)      
            }
        }
        getProductsWithTag()
    },[])

    useEffect(()=>{
        function getRef(){
            const dialogRef = selectedTagArray?.find((product) => product._id === selectedLi)
            if(dialogRef){
                setDialogRef(dialogRef)
            }
        }
        getRef()
    },[selectedLi])

function displayUpVote(productID?:string){
    const isThere = selectedTagArray?.find((product) => product._id === productID)
    if(isThere&&isThere.upVotes){
        isThere.upVotes++
    }
}

function openModal(){
    modalDisplay?.current?.showModal()
}

function closeModal(){
    modalDisplay?.current?.close()
}

    return(
        <div className="flex flex-row ">
            
            <div className="w-9/12">
                <h1 className="flex justify-center p-4 font-bold">{decodedTag.decoded} products: </h1>
                <ul className="flex flex-col text-center items-center">
                    {selectedTagArray?.sort((a,b) => b.upVotes - a.upVotes).map((product) =>  (
                            <div key={product._id} className="p-5 border-gray-400 w-3/5">
                                <li onClick={()=>{
                                    openModal()
                                    setSelectedLi(product._id)
                                    setRankingIndex(selectedTagArray.indexOf(product)+1)
                                }} key={product._id} className="flex flex-col justify-center border-solid border-2 shadow-md rounded-lg cursor-pointer hover:shadow-lg" >
                                        <h2 className="font-bold p-2">{product.productName}</h2>
                                        <div className="flex flex-row justify-between gap-4 items-center ml-5 mr-5 ">
                                            <p className="text-sm">About - {product.summDesc}</p>
                                            <Link href={product.productUrl} target="blank" className="  text-orange-500 hover:underline ">
                                            Official Website
                                            </Link>
                                            <SignedOut>
                                                <SignInButton mode="modal">
                                                <button className="px-2 border-solid border-2 border-gray-200 rounded-md" type="button" >
                                                    <img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" />
                                                    <span>
                                                        {product.upVotes}
                                                    </span>
                                                </button>
                                                </SignInButton>
                                            </SignedOut>
                                            <SignedIn>
                                                <button type="button" className="px-2 border-solid border-2 border-gray-200 rounded-md" onClick={()=>{
                                                    displayUpVote(product._id);
                                                    setUpVoteProduct({product: product._id})
                                                }}>
                                                    <img className="h-5 w-5 p-0" src="/upArrow.png" alt="upVote" />
                                                    <span className="text-orange-500">
                                                        {product.upVotes}
                                                    </span>
                                                </button>
                                            </SignedIn>
                                        </div>
                                        <div className="text-xs text-orange-500 p-2 flex flex-row gap-2">
                                            {product.tags.flatMap(tag => tag.split(/,\s*/)).map((tag,index)=>(
                                                <Link href={`/tags/${tag}`} key={`${product._id} - ${index}`}>
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
            <div>
            <h2 className="flex justify-center p-4 font-bold">Categories:</h2>
                <ul className="flex flex-row m-auto">
                    {tagsArray.map(tag =>(
                    <li className="p-2" key={tag}>
                        <Link href={`/tags/${tag}`}>
                            <span className="text-sm text-orange-500 hover:underline cursor-pointer">
                                {tag}
                            </span>
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div>
                <DialogModal
                    dialogRef={dialogRef}
                    clickClose={closeModal}
                    modalDisplay={modalDisplay}
                    rankingIndex={rankingIndex}
                    setUpVote={setUpVoteProduct}
                    displayUpVote={displayUpVote}
                />
            </div>
        </div>
    )
}


