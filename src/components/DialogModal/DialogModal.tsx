'use client'

import Link from 'next/link'
import { LegacyRef } from 'react'
import ProdArrayProps from '@/types/ProdArrayProps'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

interface DialogProps {
  clickClose: (value: any) => void
  
  rankingIndex: any
  dialogRef?: ProdArrayProps
  modalDisplay: LegacyRef<HTMLDialogElement>
  setUpVote: (value: { product?: string }) => void
  voteUp:(value:string) => void
}

export default function DialogModal({
  dialogRef,
  clickClose,
  modalDisplay,
  rankingIndex,
  setUpVote,
  voteUp
}: DialogProps) {
  return (
    <dialog className="rounded-md sm:w-3/6" ref={modalDisplay}>
      <div className="flex flex-row items-center justify-between py-2 sm:py-0 sm:px-7 sm:mt-5">
        <button
          className="rounded-full  py-2 px-3 border-none hover:text-orangeText hover:bg-gray-100"
          onClick={clickClose}
        >
          X
        </button>

        <h3 className="text-vibrantBlue px-7">
          # <span className=" text-4xl sm:text-6xl font-bold ">{rankingIndex}</span>
        </h3>
      </div>
      <div className="px-2 sm:px-10 sm:py-5">
        <h2 className="font-bold text-sm sm:text-base  ">
          {dialogRef?.productName}
        </h2>
        <div className="flex flex-col sm:flex-row items-center">
          <div>
            <span className="text-gray-500 text-xs sm:text-base">
              {dialogRef?.summDesc}
            </span>
          </div>
          <div className="flex flex-row justify-center py-2 gap-10 px-6">
            <button className="border-gray-700 border-solid rounded-md">
              <a
                className="font-semibold text-xs sm:text-sm hover:text-orange1 hover:underline"
                target="blank"
                href={dialogRef?.productUrl}
              >
                Visit
              </a>
            </button>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={clickClose}
                  className="flex flex-row justify-between text-xs py-2 px-6  sm:py-3 sm:px-8 text-white font-bold gap-3 bg-orange1 rounded-md sm:text-sm items-center hover:bg-darkerOrange"
                >
                  <img
                    className="h-3 w-3 sm:h-5 sm:w-5 p-0 -ml-2  "
                    src="/upArrow.png"
                    alt="upVote"
                  />
                  <p>UPVOTE</p>
                  <span className='text-xs sm:text-base'>{dialogRef?.upVotes}</span>
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => {
                  setUpVote({
                    product: dialogRef?._id,
                  })
                  {dialogRef?._id && voteUp(dialogRef?._id)}
                }}
                className="flex flex-row justify-between text-xs py-2 px-5  sm:py-3 sm:px-8 text-white font-bold gap-3 bg-orange1 rounded-md sm:text-sm"
              >
                <img className="h-3 w-3 sm:h-5 sm:w-5 p-0 -ml-2 " src="/upArrow.png" alt="upVote" />
                <p className='text-xs sm:text-base -mr-2'>UPVOTE</p>
                <span className='text-xs sm:text-base'>{dialogRef?.upVotes}</span>
              </button>
            </SignedIn>
          </div>
        </div>
        <div className="flex flex-col py-3">
          <h3 className="text-xs sm:text-base mb-1 sm:mb-0">More:</h3>
          <span className=" text-xs sm:text-sm">{dialogRef?.description}</span>
          <div className="flex flex-row py-3 text-sm text-gray-500 items-center">
            <p className="text-xs sm:text-base">Launched in</p>
            <ul className="flex flex-row gap-2 px-3 text-xs sm:text-base">
              {dialogRef?.tags.flatMap((tag) =>
                tag.split(/,\s*/).map((item, index) => (
                  <li
                    className="bg-gray-300 rounded-2xl px-2 py-1 text-gray-600 font-semibold hover:text-darkerOrange "
                    key={`${index}-${item}`}
                  >
                    <Link href={`/tags/${item}`}>{item}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </dialog>
  )
}
