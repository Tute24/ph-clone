'use client'

import { useContextWrap } from '@/contexts/ContextWrap'
import { SignedOut, SignInButton } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import DialogModal from '@/components/DialogModal/DialogModal'
import ProdArrayProps from '@/types/ProdArrayProps'
import { ClerkApp } from '@clerk/remix'

export default function HomePage() {
  const { tagsArray, setTagsArray } = useContextWrap()
  const { upVoteProduct, setUpVoteProduct } = useContextWrap()
  const {modalDisplay} = useContextWrap()
  const {selectedLi, setSelectedLi} = useContextWrap()
  const {dialogRef,setDialogRef} = useContextWrap()
  const [productsArray, setProductsArray] = useState<ProdArrayProps[]>([])
  const [rankingIndex, setRankingIndex] = useState(0)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/productsList')
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
      if(dialogRef){
      setDialogRef(dialogRef)}
      console.log(dialogRef)
    }
    getRef()
  }, [selectedLi])

  function displayUpVote(productID?: string){
    const isThere = productsArray.find((product) => product._id === productID)
    if(isThere && isThere.upVotes){
      isThere.upVotes++
    }
  }

  function openModal() {
      modalDisplay?.current?.showModal()
  }

  function closeModal() {
    modalDisplay?.current?.close()
  }

  return (
    <>
      <div className="flex flex-row ">
        <div className="w-9/12">
          <h1 className="flex justify-center p-4 font-bold">Products:</h1>
          <ul className="flex flex-col text-center items-center">
            {productsArray
              .sort((a, b) => b.upVotes - a.upVotes)
              .map((e) => (
                <div
                  id={e.productName}
                  key={e._id}
                  className="p-5 border-gray-400 w-3/5"
                >
                  <li
                    onClick={() => {
                      openModal()
                      setSelectedLi(e._id)
                      setRankingIndex(productsArray.indexOf(e) + 1)
                    }}
                    key={e._id}
                    className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
                  >
                    <h2 className="font-bold p-2">{e.productName}</h2>
                    <div className="flex flex-row justify-between gap-4 items-center ml-5 mr-5 ">
                      <p className="text-sm">About - {e.summDesc}</p>
                      <Link
                        onClick={(event) => {
                          event.stopPropagation()
                        }}
                        href={e.productUrl}
                        target="blank"
                        className="  text-orangeText hover:underline "
                      >
                        Official Website
                      </Link>
                      <SignedOut>
                        <SignInButton mode="modal">
                          <button
                            onClick={(event) => {
                              event.stopPropagation()
                            }}
                            className="px-2 border-solid border-2 border-gray-200 rounded-md"
                            type="button"
                          >
                            <img
                              className="h-5 w-5 p-0"
                              src="/upArrow.png"
                              alt="upVote"
                            />
                            <span>{e.upVotes}</span>
                          </button>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <input type="hidden" name="product" value={e._id} />
                        <button
                          onClick={(event) => {
                            event.stopPropagation()
                            setUpVoteProduct({
                              product: e._id,
                            })
                            displayUpVote(e._id)
                          }}
                          className="px-2 border-solid border-2 border-gray-200 rounded-md"
                          type="button"
                        >
                          <img
                            className="h-5 w-5 p-0"
                            src="/upArrow.png"
                            alt="upVote"
                          />
                          <span className="text-orangeText">{e.upVotes}</span>
                        </button>
                      </SignedIn>
                    </div>
                    <div className="text-xs text-orangeText p-2 flex flex-row gap-2">
                      {e.tags
                        .flatMap((tag) => tag.split(/,\s*/))
                        .map((item, index) => (
                          <Link
                            onClick={(event) => {
                              event.stopPropagation()
                            }}
                            key={`${e._id}-${index}`}
                            href={`/tags/${item}`}
                          >
                            <span className="hover:underline cursor-pointer">
                              {item}
                            </span>
                          </Link>
                        ))}
                    </div>
                  </li>
                </div>
              ))}
          </ul>
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


