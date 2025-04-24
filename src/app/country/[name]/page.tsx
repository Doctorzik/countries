"use client"

import CountryCard from '@/components/country-card'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { country } from "@/components/country-card"
import CountryCardSkeleton from '@/components/countryCardSkeleton'
import { ArrowBigLeft } from 'lucide-react'

function CountryPage() {
  const router = useRouter();
  const { name } = useParams()

  const [country, setCountry] = useState<country | null>(null)
  const [borders, setBorders] = useState<country[] | null>(null)
  const { isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {

      const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,currencies,region,flags,subregion,tld,borders,population,languages`)
      const data = await response.json()

      const bordersPromises = data[0]?.borders.map(async (borders: string) => {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${borders}?fields=name`)
        const data = await response.json()
        return data
      })

      const borders = await Promise.all(bordersPromises)
      setBorders(borders)
      setCountry(data[0])

      return data

    }
  })

  return (
    < >
      <button className='shadow-md border-4  w-[80px] mb-[20px] flex hover:skew-6' onClick={() => router.push("/")}>
        <ArrowBigLeft  className='w-5 h-5'/>
        Back</button>

      {isLoading ?
        <CountryCardSkeleton /> :
        <CountryCard home={false} {...country} borders={borders} classname='flex flex-col lg:flex-row gap-6' />
      }



    </>

  )
}

export default CountryPage