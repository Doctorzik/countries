"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import Filter from "@/components/filter";
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import CountryCard, { country } from './country-card';
import CountryCardSkeleton from './countryCardSkeleton';




function Country() {

  const getCountries = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,flags,subregion,tld,borders,population`)
    const data = await response.json()

    return data
  }


  const [countries, setCountries] = useState<[country] | null>(null)

  const [item, setItem] = useState("")
  const [value, setValue] = useState("")

  const region = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  const handleChildDate = (data: string) => {
    setItem(data)
  }

  const { isLoading, } = useQuery({
    queryKey: [value, item],
    queryFn: async () => {
      const data = await getCountries()
      setCountries(data)
      return data
    },
  }
  )

  const displayedCountries = countries?.filter((country: country) => {

    const matchedSearch = country?.name?.common?.toLowerCase().includes(value.toLowerCase())
    const regions = item === "" || country?.region === item
    return matchedSearch && regions
  })

  console.log(displayedCountries)
  return (
    <div>
      <div className='flex flex-col lg:flex-row m-4 justify-between'  >
        <Input onChange={(e) => setValue(e.target.value)} placeholder="Search for a country" className='lg:w-[400px]' />
        <Filter setSelectedItem={handleChildDate} regions={region} />
      </div>

      <div className='lg:grid grid-cols-4 lg:gap-12'>
        {isLoading ?
          <CountryCardSkeleton />
          : displayedCountries?.length === 0 ? <p>No such country in Region</p> : displayedCountries?.map((country: country) => {

            return (
              <Link key={crypto.randomUUID()} href={`/country/${country?.name?.common}`}>
                <CountryCard {...country} home={true} />
              </Link>
            )

          })}
      </div>
    </div>
  )
}

export default Country