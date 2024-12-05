'use client'

import { useContextWrap } from "@/contexts/ContextWrap"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import axios from "axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProdArrayProps from "@/types/ProdArrayProps"
import DialogModal from "@/components/DialogModal/DialogModal"
import ProductsList from "@/components/ProductsListDisplay/ProductsList"

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
                const response = await axios.post('https://ph-clone.onrender.com/getAll',decodedTag)
                const products = response.data.products
                if(products){
                setSelectedTagArray(products)  }             
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

function openModal(product: string){
    modalDisplay?.current?.showModal()
}

function closeModal(){
    modalDisplay?.current?.close()
}

    return(
        <div className="flex flex-row ">
            
            <div className="w-9/12">
                <h1 className="flex justify-center p-4 font-bold">{decodedTag.decoded} products: </h1>
                {selectedTagArray && <ProductsList
                    productsArray={selectedTagArray}
                    openModal={openModal}
                    setSelectedLi={setSelectedLi}
                    setRankingIndex={setRankingIndex}
                    setUpVoteProduct={setUpVoteProduct}
                    displayUpVote={displayUpVote}
                />}
                
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


