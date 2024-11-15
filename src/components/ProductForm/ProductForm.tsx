export default function ProductForm(){

    return (
        <>
                <h2>
                    Add a new product to the site's products list:
                </h2>
                <form >
                    <label htmlFor="productName">
                        Product name:
                    </label>
                    <input id="productName" type="text"/>
                    <label htmlFor="description">
                        Product description:
                    </label>
                    <input id="description" type="text"/>
                    <label htmlFor="productUrl">
                        The URL to your product's webpage:
                    </label>
                    <input id="productUrl" type="text"/>
                    <label htmlFor="tags">
                        Your product's tags/categories
                    </label>
                    <input id="tags" type="text"/>
                    <button type="submit">
                        Add new product
                    </button>
                </form>      
        </>
    )
}