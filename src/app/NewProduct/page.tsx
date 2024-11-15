import ProductForm from "@/components/ProductForm/ProductForm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";


export default async function NewProduct(){
    return(
        <>
            <SignedIn>
                <ProductForm/>
            </SignedIn>
            <SignedOut>
                <h2>
                    You must be logged in to add a new product.
                </h2>
                <SignInButton>
                    <button type="button">
                        Log in
                    </button>
                </SignInButton>
            </SignedOut>
        </>
    )
}