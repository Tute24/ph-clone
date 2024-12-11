'use client'

import { useContextWrap } from '@/contexts/ContextWrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DialogModal from '@/components/DialogModal/DialogModal'
import ProdArrayProps from '@/types/ProdArrayProps'
import ProductsList from '@/components/ProductsListDisplay/ProductsList'
import Categories from '@/components/Categories/Categories'

export default function HomePage() {
  const {
    tagsArray,
    setTagsArray,
    upVoteProduct,
    setUpVoteProduct,
    modalDisplay,
    selectedLi,
    setSelectedLi,
    dialogRef,
    setDialogRef,
    rankingIndex,
    setRankingIndex
  } = useContextWrap()

  const [productsArray, setProductsArray] = useState<ProdArrayProps[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          'https://ph-clone.onrender.com/productsList'
        )
        if (response) {
          const productsData: ProdArrayProps[] = response.data.products
          const tagsFetch: string[] = productsData.flatMap((product) =>
            product.tags.flatMap((tag) => tag.split(/,\s*/))
          )
          setProductsArray(productsData)
          const uniqueTags = [...new Set(tagsFetch)]
          setTagsArray(uniqueTags)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    function getRef() {
      const dialogRef = productsArray.find(
        (reference) => reference._id === selectedLi
      )
      if (dialogRef) {
        setDialogRef(dialogRef)
      }
      console.log(dialogRef)
    }
    getRef()
  }, [selectedLi])
  
  function displayUpVote(productID?: string) {
    setProductsArray((current) =>
      current?.map((product) =>
        product._id === productID
          ? { ...product, upVotes: product.upVotes + 1 }
          : product
      )
    )
  }

  function displayUpVoteModal(productID?: string) {
    if(dialogRef && dialogRef._id===productID){
    setDialogRef({...dialogRef,
      upVotes: dialogRef.upVotes+1
    }
    )
    setProductsArray((current) =>
      current?.map((product) =>
        product._id === productID
          ? { ...product, upVotes: product.upVotes + 1 }
          : product
      )
    )
  }
  }

  function openModal(product: string) {
    console.log(product)
    modalDisplay.current?.showModal()
  }

  function closeModal() {
    modalDisplay.current?.close()
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row ">
        <div className=" sm:w-9/12">
          <h1 className="flex justify-center p-4 font-bold">Products:</h1>
           <ProductsList
            productsArray={productsArray}
            openModal={openModal}
            setSelectedLi={setSelectedLi}
            setRankingIndex={setRankingIndex}
            setUpVoteProduct={setUpVoteProduct}
            displayUpVote={displayUpVote}
          />
        </div>
        <div>
          <Categories
            tagsArray={tagsArray}
          />
        </div>
        <div>
          <DialogModal
            dialogRef={dialogRef}
            clickClose={closeModal}
            modalDisplay={modalDisplay}
            rankingIndex={rankingIndex}
            setUpVote={setUpVoteProduct}
            displayUpVote={displayUpVoteModal}
          />
        </div>
      </div>
    </>
  )
}
