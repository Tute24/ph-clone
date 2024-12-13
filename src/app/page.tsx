'use client'

import { useContextWrap } from '@/contexts/ContextWrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DialogModal from '@/components/DialogModal/DialogModal'
import ProdArrayProps from '@/types/ProdArrayProps'
import ProductsList from '@/components/ProductsListDisplay/ProductsList'
import Categories from '@/components/Categories/Categories'
import { useSession } from '@clerk/clerk-react'

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
  const { session } = useSession()
  const apiUrl = process.env.API_URL

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          `${apiUrl}/productsList`
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

  async function voteUp(productId: string) {
    const product = {
      product: productId,
    }
    if (!session) {
      console.log(`There's no active session!`)
      return
    }
    try {
      console.log(product)
      const token = await session?.getToken()
      console.log(token)
      const response = await axios.post(
        `${apiUrl}/upVote`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setProductsArray((current) =>
        current?.map((product) =>
          product._id === productId
            ? { ...product, upVotes: product.upVotes + 1 }
            : product
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function voteUpModal(productId: string) {
    const product = {
      product: productId,
    }
    if (!session) {
      console.log(`There's no active session!`)
      return
    }
    try {
      console.log(product)
      const token = await session?.getToken()
      console.log(token)
      const response = await axios.post(
        `${apiUrl}/upVote`,
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (dialogRef && dialogRef._id === productId) {
        setDialogRef({ ...dialogRef, upVotes: dialogRef.upVotes + 1 })
        setProductsArray((current) =>
          current?.map((product) =>
            product._id === productId
              ? { ...product, upVotes: product.upVotes + 1 }
              : product
          )
        )
      }
    } catch (error) {
      console.log(error)
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
            voteUp={voteUp}
          />
        </div>
        <div>
          <Categories tagsArray={tagsArray} />
        </div>
        <div>
          <DialogModal
            dialogRef={dialogRef}
            clickClose={closeModal}
            modalDisplay={modalDisplay}
            rankingIndex={rankingIndex}
            setUpVote={setUpVoteProduct}
            voteUp={voteUpModal}
          />
        </div>
      </div>
    </>
  )
}
