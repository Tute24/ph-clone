import { SignInButton } from '@clerk/nextjs'

export default function Unauthorized() {
  return (
    <>
    <div className='flex flex-wrap sm:justify-center'>
      <div className=" p-3 items-center">
        <p className='p-3 text-center'>You must be <span className='text-darkerOrange'>logged in</span> to access this content.</p>
        <div className='flex justify-center'>
        <SignInButton>
          <button className="px-5 py-2 bg-orange1 text-white font-bold rounded-3xl hover:bg-darkerOrange">
            Log In
          </button>
        </SignInButton>
        </div>
      </div>
    </div>
    </>
  )
}
