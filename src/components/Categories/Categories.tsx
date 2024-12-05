import Link from 'next/link'

interface CategoriesProps {
  tagsArray: string[]
}

export default function Categories({ tagsArray }: CategoriesProps) {
  return (
    <>
      <h2 className="flex justify-center p-4 font-bold">Categories:</h2>
      <ul className="flex flex-col m-auto">
        {tagsArray.map((tag) => (
          <li className="p-2" key={tag}>
            <Link href={`/tags/${tag}`}>
              <span className="text-sm text-orangeText hover:underline cursor-pointer">
                {tag}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
