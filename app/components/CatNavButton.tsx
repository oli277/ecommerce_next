"use client"

import {usePathname, useRouter, useSearchParams} from 'next/navigation'

export default function CatNavButton({cat, children}:{cat:string, children: React.ReactNode}){

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const isActive = searchParams.get('cat') === cat

    const handleSort = () =>{
        const urlSearchParams = new URLSearchParams(searchParams.toString())
        urlSearchParams.set('cat', cat)
        const url = `${pathname}?${urlSearchParams.toString()}`
        router.push(url)
    }

    return (
    <button
      onClick={handleSort}
      className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${isActive ? "border-orange-400 bg-orange-400 text-white hover:bg-orange-500" : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
    >
      {children}
    </button>

  )
}

export function AllButton({children}:{children: React.ReactNode}){
    
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const isActive = !searchParams.get('cat')

    const handleSort = () => {
        const urlSearchParams = new URLSearchParams(searchParams.toString())
        urlSearchParams.delete('cat')
        const url = `${pathname}?${urlSearchParams.toString()}`
        router.push(url)
    }

    return (
    <button
      onClick={handleSort}
      className={`cursor-pointer whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 ${isActive ? "border-orange-400 bg-orange-400 text-white hover:bg-orange-500" : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}
    >
      {children}
    </button>

  )
}