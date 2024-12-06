import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, SignUpButton, UserButton, UserProfile, useUser } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Header (){

    const user = await currentUser()
    const username = user?.firstName
    return (
        <>
        <div className='py-4'>
            <nav className=' flex flex-row items-center justify-evenly w-full'>
                <div className='flex items-center'>
                <Link href='/'><button type="button" className="px-5"><img
                        className="h-10 w-10 p-0 "
                        src="/product-hunt.png"
                        alt="logo"
                      /></button></Link>
                <input  type="text" className="solid border-gray-100 bg-gray-100 border-2 ml-5 rounded-3xl h-10 text-center" placeholder="Search right here"/>
                </div>
                <div className='font-semibold'>
                <Link href='/NewProduct'><button type="button" className="p-2 hover:text-orange1">New Product</button></Link>
                <Link href='/dashboard'><button type="button" className="p-2 hover:text-orange1">Dashboard</button></Link>
                <button type="button" className='p-2 hover:text-orange1'>About</button>
                </div>
                <div className=''>
                <SignedOut>
                    <SignUpButton><button className=' font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5'>Register</button></SignUpButton>
                    <SignInButton><button className='px-5 py-2 bg-orange1 text-white font-bold rounded-3xl'>Sign In</button></SignInButton>
                </SignedOut>
                <SignedIn>
                    <h2 >Welcome, {username}!</h2>
                    <UserButton></UserButton>
                </SignedIn>
                </div>
            </nav>
            <hr className='mt-5 border-2 border-gray-100'/>
        </div>
        </>
    )
}