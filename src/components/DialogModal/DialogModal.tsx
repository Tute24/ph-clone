'use client'

import Link from "next/link"
import { LegacyRef } from "react"
import ProdArrayProps from "@/types/ProdArrayProps"
import { SignedIn } from "@clerk/nextjs"

interface DialogProps {
    clickClose: (value:any) => void
    displayUpVote: (value?: string | undefined) => void
    rankingIndex: any
    dialogRef?:ProdArrayProps
    modalDisplay: LegacyRef<HTMLDialogElement>
    setUpVote: (value:{
        product?: string
    }) => void
}

export default function DialogModal({
    dialogRef,
    clickClose,
    modalDisplay,
    rankingIndex,
    setUpVote,
    displayUpVote
}: DialogProps){
    return (
        <dialog className="rounded-md w-full sm:w-3/6" ref={modalDisplay}>
            <div className="flex flex-row items-center justify-between px-7 mt-5">
              <button
                className="rounded-full  py-2 px-3 border-none hover:text-orangeText hover:bg-gray-100"
                onClick={clickClose}
              >
                X
              </button>

              <h3 className="text-vibrantBlue px-7">
                # <span className="text-6xl font-bold ">{rankingIndex}</span>
              </h3>
            </div>
            <div className="px-10 py-5">
              <h2 className="font-bold ">{dialogRef?.productName}</h2>
              <div className="flex flex-row items-center">
                <div>
                  <span className="text-gray-500 text-sm sm:text-base">
                    {dialogRef?.summDesc}
                  </span>
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
                  <SignedIn>
                  <button onClick={()=>{
                    setUpVote({
                        product: dialogRef?._id
                    })
                    displayUpVote(dialogRef?._id)
                  }} className="flex flex-row justify-between py-3 px-8 text-white font-bold gap-3 bg-orange1 rounded-md text-sm">
                    <img
                      className="h-5 w-5 p-0 "
                      src="/upArrow.png"
                      alt="upVote"
                    />
                    <p>UPVOTE</p>
                    <span>{dialogRef?.upVotes}</span>
                  </button>
                  </SignedIn>
                </div>
              </div>
              <div className="flex flex-col py-3">
                <h3 className="">More:</h3>
                <span className="text-sm">{dialogRef?.description}</span>
                <div className="flex flex-row py-3 text-sm text-gray-500 items-center">
                  <p>Launched in</p>
                  <ul className="flex flex-row gap-2 px-3">
                    {dialogRef?.tags.flatMap((tag) =>
                      tag.split(/,\s*/).map((item, index) => (
                        <li
                          className="bg-gray-300 rounded-2xl px-2 py-1 text-gray-600 font-semibold "
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