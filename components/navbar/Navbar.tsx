'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CiDark, CiHeart, CiUser } from 'react-icons/ci'
import { IoLanguageOutline } from 'react-icons/io5'
import { PiShoppingCartLight } from 'react-icons/pi'
import { Search } from '@/services/search'

type SearchResult = {
  id?: string | number
  name?: string
  title?: string
  slug?: string
  image?: { url?: string }
  pricing?: {
    on_sale?: boolean
    sale_price?: { formatted?: string }
    regular_price?: { formatted?: string }
  }
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(urlQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isNavigatingToSearch, setIsNavigatingToSearch] = useState(false)

  useEffect(() => {
    setQuery(urlQuery)
    setIsNavigatingToSearch(false)
  }, [urlQuery])

  useEffect(() => {
    setIsNavigatingToSearch(false)
  }, [pathname])

  useEffect(() => {
    const searchTerm = query.trim()
    let isCurrentSearch = true
    const controller = new AbortController()

    if (searchTerm.length < 2) {
      setResults([])
      setHasSearched(false)
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    const timeout = window.setTimeout(async () => {
      try {
        const response = await Search(searchTerm, controller.signal)
        if (isCurrentSearch) {
          setResults(Array.isArray(response?.data) ? response.data : [])
          setHasSearched(true)
        }
      } catch {
        if (isCurrentSearch) {
          setResults([])
          setHasSearched(true)
        }
      } finally {
        if (isCurrentSearch) setIsSearching(false)
      }
    }, 150)

    return () => {
      isCurrentSearch = false
      window.clearTimeout(timeout)
      controller.abort()
    }
  }, [query])

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const searchTerm = query.trim()
    if (searchTerm.length < 2) return

    setResults([])
    setHasSearched(false)
    setIsNavigatingToSearch(true)
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div>
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/image/Eldokan-logo.webp" alt="Logo image" width={150} height={150} />
        </Link>

        <form onSubmit={handleSearchSubmit} className="w-[33.33%] relative">
          <input
            type="search"
            placeholder="Search products"
            aria-label="Search products"
            aria-expanded={query.trim() !== ''}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="border-gray-300 border p-2 rounded-2xl w-full"
          />
          <button type="submit" className="border rounded-2xl p-2 absolute right-0 bg-[#F5E7C6] border-[#F5E7C6] text-[#222222]">
            Search
          </button>

          {query.trim() !== '' && pathname !== '/search' && !isNavigatingToSearch && (
            <div className="absolute z-10 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-lg border bg-white shadow-md">
              {query.trim().length < 2 ? (
                <p className="p-3 text-sm text-gray-500">Type at least 2 characters to search.</p>
              ) : isSearching ? (
                <p className="p-3 text-sm text-gray-500">Searching products...</p>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((result, index) => {
                    const name = result.name ?? result.title ?? 'Product'
                    const price = result.pricing?.on_sale
                      ? result.pricing.sale_price?.formatted
                      : result.pricing?.regular_price?.formatted

                    return (
                      <li key={result.id ?? result.slug ?? index} className="border-b last:border-0">
                        {result.id ? (
                          <Link
                            href={`/product/${result.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50"
                            onClick={() => setQuery('')}
                          >
                            {result.image?.url && (
                              <Image src={result.image.url} alt="" width={48} height={48} className="h-12 w-12 rounded object-cover" />
                            )}
                            <span className="min-w-0 flex-1 truncate">{name}</span>
                            {price && <span className="text-sm text-gray-600">{price}</span>}
                          </Link>
                        ) : (
                          <span className="block p-3">{name}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              ) : hasSearched ? (
                <p className="p-3 text-sm text-gray-500">No matching products found.</p>
              ) : null}
            </div>
          )}
        </form>

        <div className="flex gap-5 text-xl">
          <button type="button" aria-label="Change language"><IoLanguageOutline /></button>
          <button type="button" aria-label="Toggle dark mode"><CiDark /></button>
          <button type="button" aria-label="Favorites"><CiHeart /></button>
          <button type="button" aria-label="Shopping cart"><PiShoppingCartLight /></button>
          <button type="button" aria-label="Account"><CiUser /></button>
        </div>
      </nav>
    </div>
  )
}
