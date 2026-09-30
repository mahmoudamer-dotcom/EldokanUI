import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import { Search } from '@/services/search'

type SearchProduct = {
  id?: string | number
  name?: string
  title?: string
  image?: { url?: string }
  pricing?: {
    on_sale?: boolean
    sale_price?: { formatted?: string }
    regular_price?: { formatted?: string }
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const params = await searchParams
  const query = Array.isArray(params.q) ? params.q[0] ?? '' : params.q ?? ''
  const searchTerm = query.trim()
  const response = searchTerm.length >= 2 ? await Search(searchTerm) : { data: [] }
  const products: SearchProduct[] = Array.isArray(response?.data) ? response.data : []

  return (
    <>
      <main className="container mx-auto min-h-screen px-4 py-6 mb-10">
        <Navbar />
        <section className="mt-8 ">
          <h1 className="text-2xl font-semibold">Search results for &quot;{searchTerm}&quot;</h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} {products.length === 1 ? 'product' : 'products'} found
          </p>

          {products.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((product, index) => {
                const name = product.name ?? product.title ?? 'Product'
                const price = product.pricing?.on_sale
                  ? product.pricing.sale_price?.formatted
                  : product.pricing?.regular_price?.formatted

                return (
                  <article key={product.id ?? index} className="overflow-hidden rounded-lg border bg-white">
                    {product.id ? (
                      <Link href={`/product/${product.id}`} className="block">
                        {product.image?.url ? (
                          <Image
                            src={product.image.url}
                            alt={name}
                            width={500}
                            height={500}
                            className="aspect-square w-full object-cover"
                          />
                        ) : (
                          <div className="aspect-square bg-gray-100" aria-label="No product image" />
                        )}
                        <div className="space-y-2 p-3">
                          <h2 className="line-clamp-2 font-medium">{name}</h2>
                          {price && <p className="text-primary">{price}</p>}
                        </div>
                      </Link>
                    ) : (
                      <div className="p-3">{name}</div>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="mt-8 rounded-lg border p-6 text-center text-gray-600">
              {searchTerm.length < 2
                ? 'Enter at least 2 characters to search for products.'
                : 'No matching products found.'}
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
