import { useContextWrap } from '@/contexts/ContextWrap'
import ClipLoader from "react-spinners/ClipLoader"

interface ProductFormsProps {
  productInfos: {
    productName: string
    description: string
    summDesc: string
    productUrl: string
    tags: string[]
  }
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function ProductForm({
  productInfos,
  onInputChange,
  onSubmit,
}: ProductFormsProps) {
  const { statusMessage, isLoading } = useContextWrap()

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl border border-gray-300 w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <h2 className='flex justify-center font-bold mb-3'>Add a new product to the site's products list:</h2>
        <form className="flex flex-col " onSubmit={onSubmit}>
        <div className='py-1'>
          <label htmlFor="productName" className='text-gray-600'>Product name:</label>
          <input
            className="text-center w-full solid border-gray-500 rounded-lg border-2"
            id="productName"
            type="text"
            name="productName"
            value={productInfos.productName}
            onChange={onInputChange}
          />
          </div>
          <div className='py-1'>
          <label htmlFor="description" className='text-gray-600'>Product description:</label>
          <textarea
            className="text-center  text-sm w-full solid border-gray-500 rounded-lg border-2"
            id="description"
            name="description"
            rows={4}
            value={productInfos.description}
            onChange={onInputChange}
          />
          </div>
          <div className='py-1'>
          <label htmlFor="productUrl" className='text-gray-600'>The URL to your product's webpage:</label>
          <input
            className="text-center w-full solid border-gray-500 rounded-lg border-2"
            id="productUrl"
            type="text"
            name="productUrl"
            value={productInfos.productUrl}
            onChange={onInputChange}
          />
          </div>
          <div className='py-1'>
          <label htmlFor="tags" className='text-gray-600'>Your product's tags/categories</label>
          <input
            className="text-center w-full solid border-gray-500 rounded-lg border-2 mb-3"
            id="tags"
            type="text"
            name="tags"
            value={productInfos.tags}
            onChange={onInputChange}
          />
          </div>
          <button
            className="text-sm w-3/5 sm:text-base sm:w-3/5 bg-orange1 font-bold rounded-full px-2 flex justify-center m-auto py-2 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading? <ClipLoader color='#FFFFFF' size={25}/>: `Add new product`}
          </button>
        </form>
        <span className="text-green-600 p-2 font-bold flex justify-center">{statusMessage}</span>
      </div>
    </div>
  )
}
