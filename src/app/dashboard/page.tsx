'use client'

import { SignedIn, SignedOut, useSession } from '@clerk/clerk-react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProdArrayProps from '@/types/ProdArrayProps'
import { useContextWrap } from '@/contexts/ContextWrap'
import DashboardProductsList from '@/components/ProductsListsDisplays/DashboardPL'
import DialogModal from '@/components/Modals/DialogModal'
import Categories from '@/components/Categories/Categories'
import Unauthorized from '@/components/UnauthorizedLayout/Unauthorized'
import DeleteModal from '@/components/Modals/DeleteModal'

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
    modalDelete,
  } = useContextWrap()
  const [isSessionLoaded, setIsSessionLoaded] = useState<boolean>(false)
  const [productsArray, setProductsArray] = useState<ProdArrayProps[]>()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    async function getDashboard() {
      if (session) {
        setIsSessionLoaded(true)
      }
      try {
        if (isSessionLoaded) {
          const token = await session?.getToken()
          const response = await axios.get(`${apiUrl}/dashboard`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const products: ProdArrayProps[] = response.data.products
          const tagsFetch: string[] = products.flatMap((product) =>
            product.tags.flatMap((tag) => tag.split(/,\s*/))
          )
          setProductsArray(products)
          const uniqueTags = [...new Set(tagsFetch)]
          setTagsArray(uniqueTags)
          setProductsArray(products)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getDashboard()
  }, [session, isSessionLoaded])

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
      const response = await axios.post(`${apiUrl}/upVote`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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

  function openModal(product: string) {
    console.log(product)
    modalDisplay.current?.showModal()
  }

  function openDeleteModal(product: string) {
    console.log(product)
    modalDelete.current?.showModal()
  }

  function closeModal() {
    modalDisplay.current?.close()
  }

  function closeDeleteModal() {
    modalDelete.current?.close()
  }

  async function DeleteProduct(productId?: string) {
    const toBeDeleted = productsArray?.find(
      (products) => products._id === productId
    )

    if (toBeDeleted) {
      try {
        const deletedId = {
          productId,
        }
        const response = axios.post(`${apiUrl}/deleteProduct`, deletedId)
      } catch (error) {
        console.log(error)
      }
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
      const response = await axios.post(`${apiUrl}/upVote`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

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

  return (
    <>
      <SignedOut>
        <Unauthorized />
      </SignedOut>
      <SignedIn>
        <>
          <div className="flex flex-col sm:flex-row ">
            <div className="w-full sm:w-9/12">
              <h1 className="flex justify-center p-4 font-bold">
                Your products:
              </h1>
              {productsArray && (
                <DashboardProductsList
                  openDeleteModal={openDeleteModal}
                  productsArray={productsArray}
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
            <div>
              <DeleteModal
                dialogRef={dialogRef}
                clickClose={closeDeleteModal}
                modalDelete={modalDelete}
                deleteReq={DeleteProduct}
              />
            </div>
          </div>
        </>
      </SignedIn>
    </>
  )
}
