'use client'

import { useContextWrap } from '@/contexts/ContextWrap'
import { SignedOut, SignInButton } from '@clerk/clerk-react'
import { SignedIn } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface ProdArrayProps {
  _id: string
  description: string
  summDesc: string
  productName: string
  productUrl: string
  tags: string[]
  upVotes: number
}

export default function HomePage() {
  const { tagsArray, setTagsArray } = useContextWrap()
  const { upVoteProduct, setUpVoteProduct } = useContextWrap()
  const [productsArray, setProductsArray] = useState<ProdArrayProps[]>([])
  const modalDisplay = useRef<HTMLDialogElement>(null)
  const [selectedLi, setSelectedLi] = useState<string>('')
  const [dialogRef, setDialogRef] = useState<ProdArrayProps>()
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
      setDialogRef(dialogRef)
      console.log(dialogRef)
    }
    getRef()
  }, [selectedLi])

  function openModal() {
    
    {
      modalDisplay.current?.showModal()
    }
  }

  function closeModel() {
    modalDisplay.current?.close()
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
                      setSelectedLi(e._id);
                      setRankingIndex(productsArray.indexOf(e)+1)
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
                            e.upVotes++
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
            {tagsArray.map((e) => (
              <li className="p-2" key={e}>
                <Link href={`/tags/${e}`}>
                  <span className="text-sm text-orangeText hover:underline cursor-pointer">
                    {e}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>

          <dialog  className="rounded-md w-full sm:w-3/6" ref={modalDisplay}>
            <div className='flex flex-row items-center justify-between px-7 mt-5'>
            <button
              className="rounded-full  py-2 px-3 border-none hover:text-orangeText hover:bg-gray-100"
              onClick={closeModel}
            >
              X
            </button>
            
            <h3 className='text-vibrantBlue px-7'># <span className='text-6xl font-bold '>{rankingIndex}</span></h3>
            </div>
            <div className='px-10 py-5'>
            <h2 className="font-bold ">{dialogRef?.productName}</h2>
            <div className="flex flex-row items-center">
              <div>
                <span className="text-gray-500 text-sm sm:text-base">{dialogRef?.summDesc}</span>
              </div>
              <div className="flex flex-row gap-10 px-6">
                <button className="border-gray-700 border-solid rounded-md">
                  <a
                    className="font-semibold text-sm hover:text-orange1 hover:underline"
                    target="blank"
                    href={dialogRef?.productUrl}
                  >
                    Visit
                  </a>
                </button>
                <button className="flex flex-row justify-between py-3 px-8 text-white font-bold gap-3 bg-orange1 rounded-md text-sm">
                  <img
                    className="h-5 w-5 p-0 "
                    src="/upArrow.png"
                    alt="upVote"
                  />
                  <p>UPVOTE</p>
                  <span>{dialogRef?.upVotes}</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col py-3">
              <h3 className="">More:</h3>
              <span className="text-sm">{dialogRef?.description}</span>
            <div className='flex flex-row py-3 text-sm text-gray-500 items-center'>
              <p>Launched in</p>
              <ul className='flex flex-row gap-2 px-3'>
                {dialogRef?.tags.flatMap((tag) =>
                  tag.split(/,\s*/).map((item, index) => (
                    <li className='bg-gray-300 rounded-2xl px-2 py-1 text-gray-600 font-semibold ' key={`${index}-${item}`}>
                      <Link href={`/tags/${item}`}>{item}</Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
            </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  )
}
