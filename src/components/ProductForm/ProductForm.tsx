"use client"
interface ProductFormsProps{
    productInfos:{
            productName: string,
            description: string,
            productUrl: string,
            tags:string[]
    },
    onInputChange: (e:any)=> void
    onSubmit: (e:any) => void
}

export default function ProductForm({
        productInfos,
        onInputChange,
        onSubmit
    }: 
        ProductFormsProps
    )

    {
    
    return (
        <div >
                <h2>
                    Add a new product to the site's products list:
                </h2>
                <form className="flex flex-col w-2/5" onSubmit={onSubmit} >
                    <label htmlFor="productName">
                        Product name:
                    </label>
                    <input className="solid border-black border-2" id="productName" type="text" name="productName" value={productInfos.productName} onChange={onInputChange}/>
                    <label htmlFor="description">
                        Product description:
                    </label>
                    <input className="solid border-black border-2" id="description" type="text" name="description" value={productInfos.description} onChange={onInputChange}/>
                    <label htmlFor="productUrl">
                        The URL to your product's webpage:
                    </label>
                    <input className="solid border-black border-2" id="productUrl" type="text" name="productUrl" value={productInfos.productUrl} onChange={onInputChange}/>
                    <label htmlFor="tags">
                        Your product's tags/categories
                    </label>
                    <input className="solid border-black border-2 mb-1" id="tags" type="text" name="tags" value={productInfos.tags} onChange={onInputChange}/>
                    <button className="bg-orange-400 " type="submit">
                        Add new product
                    </button>
                </form>      
        </div>
    )
}