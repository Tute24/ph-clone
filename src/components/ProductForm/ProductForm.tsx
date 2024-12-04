"use client"

import { useContextWrap } from "@/contexts/ContextWrap"

interface ProductFormsProps{
    productInfos:{
            productName: string,
            description: string,
            summDesc: string,
            productUrl: string,
            tags:string[]
    },
    onInputChange: (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=> void
    onSubmit: (e:React.FormEvent) => void
}

export default function ProductForm({
        productInfos,
        onInputChange,
        onSubmit
    }: 
        ProductFormsProps
    ){
    
    const {statusMessage,setStatusMessage} = useContextWrap()

    return (
        <div className="flex flex-col items-center p-4">
                <h2>
                    Add a new product to the site's products list:
                </h2>
                <form className="flex flex-col items-center w-3/5" onSubmit={onSubmit} >
                    <label htmlFor="productName">
                        Product name:
                    </label>
                    <input className="text-center w-full solid border-black border-2" id="productName" type="text" name="productName" value={productInfos.productName} onChange={onInputChange}/>
                    <label htmlFor="description">
                        Product description:
                    </label>
                    <textarea className="text-center text-sm w-full solid border-black border-2" id="description" name="description" value={productInfos.description} onChange={onInputChange}/>
                    <label htmlFor="productUrl">
                        The URL to your product's webpage:
                    </label>
                    <input className="text-center w-full solid border-black border-2" id="productUrl" type="text" name="productUrl" value={productInfos.productUrl} onChange={onInputChange}/>
                    <label htmlFor="tags">
                        Your product's tags/categories
                    </label>
                    <input className="text-center w-full solid border-black border-2 mb-3" id="tags" type="text" name="tags" value={productInfos.tags} onChange={onInputChange}/>
                    <button className="w-4/5 bg-orange-400 rounded-md" type="submit">
                        Add new product
                    </button>
                </form>      
                <span className="text-green-600 p-2">{statusMessage}</span>
        </div>
    )
}