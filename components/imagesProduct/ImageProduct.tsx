'use client'
import { useEffect, useState } from 'react'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

type ProductImage = { url: string }
type ProductData = { images: ProductImage[] }

export default function ImageProduct({
  data,
  selectedIndex,
  onSelectIndex,
}: {
  data: ProductData
  selectedIndex: number
  onSelectIndex: (index: number) => void
}) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    api?.scrollTo(selectedIndex)
  }, [api, selectedIndex])

  useEffect(() => {
    if (!api) return

    const updateSelectedIndex = () => onSelectIndex(api.selectedScrollSnap())
    api.on('select', updateSelectedIndex)
    return () => {
      api.off('select', updateSelectedIndex)
    }
  }, [api, onSelectIndex])

  return (
    <Carousel
      className="w-full"
      setApi={setApi}
    >
      <CarouselContent>
        {data.images.map((item, index) => (
          <CarouselItem key={`${item.url}-${index}`}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={item.url}
                    width={700}
                    height={700}
                    alt={`Product image ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-2 '/>
      <CarouselNext className='absolute right-2'/>
    </Carousel>
  )
}
