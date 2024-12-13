'use client'

import { useContextWrap } from '@/contexts/ContextWrap'
import { SignedIn, SignedOut, SignInButton, useSession } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProdArrayProps from '@/types/ProdArrayProps'
import DialogModal from '@/components/DialogModal/DialogModal'
import ProductsList from '@/components/ProductsListDisplay/ProductsList'
import Categories from '@/components/Categories/Categories'

export default function TagPage() {
  const { tag } = useParams<{ tag: string }>()
  const decodedTag = { decoded: decodeURIComponent(tag) }
  const {
    modalDisplay,
    setUpVoteProduct,
    dialogRef,
    setDialogRef,
    selectedLi,
    setSelectedLi,
    rankingIndex,
    setRankingIndex,
    tagsArray,
  } = useContextWrap()

  const [selectedTagArray, setSelectedTagArray] = useState<ProdArrayProps[]>()
  const { session } = useSession()
  const apiUrl = process.env.API_URL

  useEffect(() => {
    if (tagsArray.length === 0) {
      console.log('Tags ainda não carregadas')
    } else {
      console.log('Tags carregadas do contexto:', tagsArray)
    }
  }, [tagsArray])

  useEffect(() => {
    async function getProductsWithTag() {
      try {
        const response = await axios.post(
          `${apiUrl}/getAll`,
          decodedTag
        )
        const products: ProdArrayProps[] = response.data.products
        if (products) {
          setSelectedTagArray(products)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getProductsWithTag()
  }, [])

  useEffect(() => {
    function getRef() {
      const dialogRef = selectedTagArray?.find(
        (product) => product._id === selectedLi
      )
      if (dialogRef) {
        setDialogRef(dialogRef)
      }
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

      setSelectedTagArray((current) =>
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
        setSelectedTagArray((current) =>
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
    modalDisplay?.current?.showModal()
  }

  function closeModal() {
    modalDisplay?.current?.close()
  }

  return (
    <div className="flex flex-row ">
      <div className="w-9/12">
        <h1 className="flex justify-center p-4 font-bold">
          {decodedTag.decoded} products:{' '}
        </h1>
        {selectedTagArray && (
          <ProductsList
            productsArray={selectedTagArray}
            openModal={openModal}
            setSelectedLi={setSelectedLi}
            setRankingIndex={setRankingIndex}
            setUpVoteProduct={setUpVoteProduct}
            voteUp={voteUp}
          />
        )}
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
  )
}
