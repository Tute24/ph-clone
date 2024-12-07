import Link from 'next/link'

interface CategoriesProps {
  tagsArray: string[]
}

export default function Categories({ tagsArray }: CategoriesProps) {
  return (
    <>
      <h2 className="flex justify-center p-4 font-bold">Categories:</h2>
      <div className='p-2 sm:p-0'>
      <ul className="flex flex-wrap p-2 sm:p-0 gap-2 text-xs sm:flex-col sm:m-auto sm:text-base border-solid border-gray-200 border-2 rounded-md sm:border-none">
        {tagsArray.map((tag) => (
          <li className="px-1 sm:p-2" key={tag}>
            <Link href={`/tags/${tag}`}>
              <span className="text-sm text-orangeText hover:underline cursor-pointer">
                {tag}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}
