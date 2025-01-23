export default function AboutPage() {
    return (
        <div className="flex flex-col items-center ">
            <div className="text-center border-solid border-2 border-gray-100 rounded-2xl m-auto py-5 px-5 w-3/4 sm:w-2/5 flex flex-col hover:border-orangeText hover:shadow-md">
            <h1 className="py-3 font-bold text-lg">About the project</h1>
            <h3 className="text-justify">This portfolio project is a mock of the Product Hunt website, created for learning purposes. 
                While it doesn't include all the features of the original, it includes key functionalities that make it a usable "product showroom". 
                The code is written in TypeScript, with separate front-end and back-end implementations.
                The project was made with technologies like Next.JS, Express, Tailwind and Clerk.</h3>
            <h3 className="py-3 font-bold text-lg ">Key Features:</h3>
            <ul className="text-justify">
                <li className="py-2"><span className="font-bold text-orangeText">Homepage:</span> Shows registered products ordered by upvotes. Each product is displayed in a card with a summary, tags, and an upvote button. Clicking opens a modal with full details and a website link. A sidebar lists tags for filtering products.</li>
                <li className="py-2"><span className="font-bold text-orangeText">The Dashboard page:</span> The page where the logged in user can see all of the products he has registered in the website. He can also delete the product there. This page is only shown if the user is logged in;</li>
                <li className="py-2"><span className="font-bold text-orangeText">The New Product page:</span> A page where the user can register a product. This page is only shown if the user is logged in;</li>
                <li className="py-2"><span className="font-bold text-orangeText">The about page:</span> It's a simple page that explains the purpose of the application and the technologies used;</li>
                <li className="py-2"><span className="font-bold text-orangeText">The Sign In and Sign Up</span> pages are managed by Clerk;</li>
            </ul>
            </div>
        </div>
    )
}