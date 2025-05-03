"use client"

import React, { useState } from 'react'
import { Input } from './ui/input'
import Filter from "@/components/filter"
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import CountryCard, { country } from './country-card'
import CountryCardSkeleton from './countryCardSkeleton'



function Country() {

  const [item, setItem] = useState("")       // Region selected
  const [value, setValue] = useState("")     // Search input

  const region = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  const handleChildDate = (data: string) => {
    setItem(data)
  }

  // Fetch all countries once
  const { isLoading, data: countries } = useQuery<country[]>({
    queryKey: ['countries'], // no need for value/item in query key
    queryFn: async () => {
      const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,capital,currencies,region,flags,subregion,tld,borders,population`)
      return response.json()
    }
  })

  const displayedCountries = countries?.filter((country: country) => {
    const matchedSearch = country?.name?.common?.toLowerCase().includes(value.toLowerCase())

    // If there's a search term, ignore region filter
    if (value.trim() !== "") {
      return matchedSearch
    }

    // If there's no search term, apply region filter
    const matchesRegion = item === "" || country?.region === item
    return matchedSearch && matchesRegion
  }) || []


  return (
    <div>
      <div className='flex flex-col lg:flex-row m-4 justify-between'>
        <Input
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for a country"
          className='lg:w-[400px]'
        />
        <Filter setSelectedItem={handleChildDate} regions={region} />
      </div>

      <div className='lg:grid grid-cols-4 lg:gap-12'>
        {isLoading ? (
          <CountryCardSkeleton />
        ) : (
          displayedCountries.length === 0 ? (
            <p>No such country in Region</p>
          ) : (
            displayedCountries.map((country: country) => (
              <Link key={country?.name?.common} href={`/country/${country?.name?.common}`}>
                < CountryCard {...country} home={true} />


              </Link>

            ))
          )
        )}
      </div>
    </div>
  )
}

export default Country
