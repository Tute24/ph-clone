'use client'
import axios from 'axios'
import {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import ProdArrayProps from '@/types/ProdArrayProps'

interface ContextWrapProps {
  productInfos: {
    productName: string
    description: string
    summDesc: string
    productUrl: string
    tags: string[]
  }
  setProductInfos: (value: {
    productName: string
    description: string
    summDesc: string
    productUrl: string
    tags: string[]
  }) => void
  statusMessage: string
  setStatusMessage: (value: string) => void
  tagsArray: string[]
  setTagsArray: (value: string[]) => void
  upVoteProduct: {
    product?: string
  }
  setUpVoteProduct: (value: { product?: string }) => void
  modalDisplay: RefObject<HTMLDialogElement>
  selectedLi: string
  setSelectedLi: (value: string) => void
  dialogRef?: ProdArrayProps
  setDialogRef: (value: ProdArrayProps) => void
  rankingIndex: any
  setRankingIndex: (value:any) => void
  isLoading: boolean
  setIsLoading: (value:boolean)=> void,
}

const ContextWrap = createContext<ContextWrapProps | undefined>(undefined)

export function ContextWrapProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [productInfos, setProductInfos] = useState<{
    productName: string
    description: string
    summDesc: string
    productUrl: string
    tags: string[]
  }>({
    productName: '',
    description: '',
    summDesc: '',
    productUrl: '',
    tags: [],
  })
  const [statusMessage, setStatusMessage] = useState<string>('')
  const modalDisplay = useRef<HTMLDialogElement>(null)
  const [tagsArray, setTagsArray] = useState<string[]>([])
  const [upVoteProduct, setUpVoteProduct] = useState<{
    product?: string
  }>({
    product: '',
  })
  const [selectedLi,setSelectedLi] = useState<string>('')
  const [dialogRef,setDialogRef]= useState<ProdArrayProps>()
  const [rankingIndex,setRankingIndex] = useState(0)
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const storagedTags = localStorage.getItem('tags')

    if (storagedTags) {
      setTagsArray(storagedTags.split(','))
    }
  }, [])

  useEffect(() => {
    if (tagsArray.length > 0) {
      localStorage.setItem('tags', tagsArray.join(','))
    }
  }, [tagsArray])

  useEffect(() => {
    async function voteUp() {
      console.log(upVoteProduct)
      try { 
        const response = await axios.post(
          'https://ph-clone.onrender.com/upVote',
          upVoteProduct
        )
      } catch (error) {
        console.log(error)
      }
    }
    voteUp()
  }, [upVoteProduct])

  return (
    <ContextWrap.Provider
      value={{
        productInfos,
        setProductInfos,
        statusMessage,
        setStatusMessage,
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
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ContextWrap.Provider>
  )
}

export function useContextWrap() {
  const wrapContext = useContext(ContextWrap)

  if (!wrapContext) {
    throw new Error('Context Error')
  }

  return wrapContext
}
