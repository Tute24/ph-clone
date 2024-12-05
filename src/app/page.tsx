'use client'

import { useContextWrap } from '@/contexts/ContextWrap'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DialogModal from '@/components/DialogModal/DialogModal'
import ProdArrayProps from '@/types/ProdArrayProps'
import ProductsList from '@/components/ProductsListDisplay/ProductsList'

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
    setRankingIndex,
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
          const tagsFetch: string[] = productsData.flatMap((e) =>
            e.tags.flatMap((tag) => tag.split(/,\s*/))
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
    const isThere = productsArray.find((product) => product._id === productID)
    if (isThere && isThere.upVotes) {
      isThere.upVotes++
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
      <div className="flex flex-row ">
        <div className="w-9/12">
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
          <h2 className="flex justify-center p-4 font-bold">Categories:</h2>
          <ul className="flex flex-col m-auto">
            {tagsArray.map((tag) => (
              <li className="p-2" key={tag}>
                <Link href={`/tags/${tag}`}>
                  <span className="text-sm text-orangeText hover:underline cursor-pointer">
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
    </>
  )
}
