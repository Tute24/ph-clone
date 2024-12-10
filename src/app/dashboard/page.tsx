'use client'

import { SignedIn, SignedOut, useSession } from '@clerk/clerk-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProdArrayProps from '@/types/ProdArrayProps'
import { useContextWrap } from '@/contexts/ContextWrap'
import ProductsList from '@/components/ProductsListDisplay/ProductsList'
import DialogModal from '@/components/DialogModal/DialogModal'
import Categories from '@/components/Categories/Categories'
import Unauthorized from '@/components/UnauthorizedLayout/Unauthorized'

export default function Dashboard() {
  const { session } = useSession()
  const {
    setSelectedLi,
    setRankingIndex,
    setUpVoteProduct,
    dialogRef,
    modalDisplay,
    rankingIndex,
    selectedLi,
    setDialogRef,
    tagsArray,
    setTagsArray,
  } = useContextWrap()
  const [isSeassionLoaded, setIsSessionLoaded] = useState<boolean>(false)
  const [productsArray, setProductsArray] = useState<ProdArrayProps[]>()

  useEffect(() => {
    async function getDashboard() {
      if (session) {
        setIsSessionLoaded(true)
      }
      try {
        if (isSeassionLoaded) {
          const token = await session?.getToken()
          const response = await axios.get(
            'https://ph-clone.onrender.com/dashboard',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          const products: ProdArrayProps[] = response.data.products
          const tagsFetch: string[] = products.flatMap((product) =>
            product.tags.flatMap((tag) => tag.split(/,\s*/))
          )
          setProductsArray(products)
          const uniqueTags = [...new Set(tagsFetch)]
          setTagsArray(uniqueTags)
          setProductsArray(products)
          console.log(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDashboard()
  }, [session, isSeassionLoaded])

  useEffect(() => {
    function getRef() {
      const dialogRef = productsArray?.find(
        (reference) => reference._id === selectedLi
      )
      if (dialogRef) {
        setDialogRef(dialogRef)
      }
      console.log(dialogRef)
    }
    getRef()
  }, [selectedLi])

  function openModal(product: string) {
    console.log(product)
    modalDisplay.current?.showModal()
  }

  function closeModal() {
    modalDisplay.current?.close()
  }

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

  return (
    <>
      <SignedOut>
        <Unauthorized/>
      </SignedOut>
      <SignedIn>
        <>
          <div className="flex flex-row ">
            <div className="w-9/12">
              <h1 className="flex justify-center p-4 font-bold">
                Your products:
              </h1>
              {productsArray && (
                <ProductsList
                  productsArray={productsArray}
                  openModal={openModal}
                  setSelectedLi={setSelectedLi}
                  setRankingIndex={setRankingIndex}
                  setUpVoteProduct={setUpVoteProduct}
                  displayUpVote={displayUpVote}
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
                displayUpVote={displayUpVoteModal}
              />
            </div>
          </div>
        </>
      </SignedIn>
    </>
  )
}
