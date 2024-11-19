import { SignedIn, SignedOut, SignIn, SignInButton, SignUp, SignUpButton, UserButton, UserProfile, useUser } from '@clerk/nextjs'
import { currentUser, User } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Header (){

    const user = await currentUser()
    const username = user?.firstName
    return (
        <>
            <nav className='flex flex-row items-center justify-between'>
                <Link href='/'><button type="button" className="p-2">Home Page</button></Link>
                <input type="text" className="solid border-black border-2" placeholder="Search right here"/>
                <Link href='/NewProduct'><button type="button" className="p-2">New Product</button></Link>
                <button type="button" className='p-2'>About</button>
                <SignedOut>
                    <SignInButton><button className='p-2'>Sign In!</button></SignInButton>
                    <SignUpButton><button className='p-2'>Register!</button></SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton><h2 className='p-2'>Welcome, {username}!</h2></UserButton>
                </SignedIn>
            </nav>
        </>
    )
}