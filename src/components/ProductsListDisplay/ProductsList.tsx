'use client'

import ProdArrayProps from '@/types/ProdArrayProps'
import Link from 'next/link'
import { SignedOut, SignedIn, SignInButton } from '@clerk/nextjs'

interface ListProps {
  productsArray: ProdArrayProps[]
  openModal: (value: string) => void
  setSelectedLi: (value: string) => void
  setRankingIndex: (value: number) => void
  setUpVoteProduct: (value: { product: string }) => void
  displayUpVote: (value: string) => void
}

export default function ProductsList({
  productsArray,
  openModal,
  setSelectedLi,
  setRankingIndex,
  setUpVoteProduct,
  displayUpVote,
}: ListProps) {
  
  return (
    <ul className="flex flex-col text-center items-center">
      {productsArray
        .sort((productA, productB) => productB.upVotes - productA.upVotes)
        .map((product) => (
          <div
            id={product.productName}
            key={product._id}
            className="p-5 border-gray-400 w-3/5"
          >
            <li
              onClick={() => {
                openModal(product.productName)
                setSelectedLi(product._id)
                setRankingIndex(productsArray.indexOf(product) + 1)
              }}
              key={product._id}
              className="flex flex-col justify-center cursor-pointer border-solid border-2 shadow-md rounded-lg hover:shadow-lg hover:bg-gray-100"
            >
              <h2 className="font-bold p-2">{product.productName}</h2>
              <div className="flex flex-row justify-between gap-4 items-center ml-5 mr-5 ">
                <p className="text-sm">About - {product.summDesc}</p>
                <Link
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                  href={product.productUrl}
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
                      <span>{product.upVotes}</span>
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <input type="hidden" name="product" value={product._id} />
                  <button
                    onClick={(event) => {
                      event.stopPropagation()
                      setUpVoteProduct({
                        product: product._id,
                      })
                      displayUpVote(product._id)
                    }}
                    className="px-2 border-solid border-2 border-gray-200 rounded-md"
                    type="button"
                  >
                    <img
                      className="h-5 w-5 p-0"
                      src="/upArrow.png"
                      alt="upVote"
                    />
                    <span className="text-orangeText">{product.upVotes}</span>
                  </button>
                </SignedIn>
              </div>
              <div className="text-xs text-orangeText p-2 flex flex-row gap-2">
                {product.tags
                  .flatMap((tag) => tag.split(/,\s*/))
                  .map((item, index) => (
                    <Link
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                      key={`${product._id}-${index}`}
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
  )
}
