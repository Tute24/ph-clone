"use client"
import { useContextWrap } from "@/contexts/ContextWrap"

export default function ProductForm(){

    const {productInfos, setProductInfos} = useContextWrap()

    function handleInputChange(e:any){
        setProductInfos(
            {
                ...productInfos,
            [e.target.name] : e.target.value
            }
        )
    }

    function handleSubmit(e:any){
        e.preventDefault()
        console.log(productInfos)
    }

    return (
        <div >
                <h2>
                    Add a new product to the site's products list:
                </h2>
                <form className="flex flex-col w-2/5" onSubmit={handleSubmit} >
                    <label htmlFor="productName">
                        Product name:
                    </label>
                    <input className="solid border-black border-2" id="productName" type="text" name="productName" value={productInfos.productName} onChange={handleInputChange}/>
                    <label htmlFor="description">
                        Product description:
                    </label>
                    <input className="solid border-black border-2" id="description" type="text" name="description" value={productInfos.description} onChange={handleInputChange}/>
                    <label htmlFor="productUrl">
                        The URL to your product's webpage:
                    </label>
                    <input className="solid border-black border-2" id="productUrl" type="text" name="productUrl" value={productInfos.productUrl} onChange={handleInputChange}/>
                    <label htmlFor="tags">
                        Your product's tags/categories
                    </label>
                    <input className="solid border-black border-2 mb-1" id="tags" type="text" name="tags" value={productInfos.tags} onChange={handleInputChange}/>
                    <button className="bg-orange-400 " type="submit">
                        Add new product
                    </button>
                </form>      
        </div>
    )
}