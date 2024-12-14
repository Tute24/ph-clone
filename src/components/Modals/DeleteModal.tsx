import Link from 'next/link'
import { LegacyRef } from 'react'
import ProdArrayProps from '@/types/ProdArrayProps'

interface DeleteModalProps {
  clickClose: (value: any) => void
  deleteReq: (value?: string) => void
  dialogRef?: ProdArrayProps
  modalDelete: LegacyRef<HTMLDialogElement>
}

export default function DeleteModal({
  dialogRef,
  clickClose,
  modalDelete,
  deleteReq,
}: DeleteModalProps) {
  return (
    <dialog className="rounded-md sm:w-2/6" ref={modalDelete}>
      <div className="flex flex-row items-center justify-between py-2 sm:py-0 sm:px-7 sm:mt-5">
        <button
          className="rounded-full  py-2 px-3 border-none hover:text-orangeText hover:bg-gray-100"
          onClick={clickClose}
        >
          X
        </button>
      </div>
      <div className="px-2 sm:px-10 sm:py-3 flex justify-center flex-col items-center">
        <h2 className="font-bold text-sm sm:text-base py-2  ">
          Are you sure you want to delete{' '}
          <span className="text-darkerOrange">{dialogRef?.productName}</span>?
        </h2>
        <h2 className="font-bold">
          This action is permanent and cannot be undone.
        </h2>
        <button
          onClick={()=>{
            deleteReq(dialogRef?._id)
          }}
          className="bg-orange1 hover:bg-darkerOrange rounded-full text-white px-3 mt-3 mb-3 font-bold"
        >
          Delete
        </button>
      </div>
    </dialog>
  )
}
