"use client"

import { cn } from "@/lib/utils";





export type country = {
  classname?: string | undefined
  home?: boolean
  name?: {
    common: string | null,
    official?: string
    nativeName?: {
      eng: {
        official: string,
        common: string
      }
      tsn: {
        official: string,
        common: string
      }


    },

  } | null,
  capital?: string | undefined,
  currencies?: {
    [code: string]: {
      name: string;
      symbol: string;
    }
  }

  region?: string | undefined,
  flags?: {
    alt: string;
    png: string;
    svg: string;
  } | undefined;
  subregion?: string | undefined,
  tld?: string[] | undefined,
  borders?: BorderCountry | undefined
  population?: number
  languages?: {
    name: string
  }
}


type BorderCountry = Pick<country, 'name'>[] | null;



function CountryCard({ classname, home, capital, flags, name, population, region, borders, currencies, subregion, tld, languages }: country) {
  const formatNumber = population !== undefined ?
    new Intl.NumberFormat("en-us").format(population)
    : "N/A"

  return (
    <div className={cn(home ? "shadow-md rounded-lg  lg:h-[300px] mb-3  border-accent overflow-scroll " : classname
    )}>
      <div >
        <img src={flags?.png} alt={flags?.alt} className="object-fill" />

      </div>
      <div className={cn(!home ? "lg:w-[70%] lg:grid grid-cols-2" : "")}>
        <div className="m-4">
          <h1 className='font-extrabold '>{name?.common}</h1>
          {!home && <p>Native name: {name?.nativeName?.tsn?.official}</p>}

          <p>Population:  {formatNumber} </p>
          <p>Region: {region} </p>
          {!home && <p>Sub region: {subregion}</p>}
          <p>Capital: {capital}</p>
        </div>

        {!home ?
          <div className="mt-10">

            <p>Top Level Domain: {tld?.[0]} </p>

            <p>Currencies : {
              currencies && Object.keys(currencies).length > 0
                ? Object.entries(currencies).map(([, { name, symbol }]) =>
                  `${name} (${symbol})`
                ).join(", ")
                : "N/A"
            }  </p>
            <p>
              Languages: {
                languages && Object.values(languages).join(", ")
              }
            </p>



          </div> : ""


        }
        {!home &&
          <section className="lg:col-span-2 lg:w-full lg:flex lg:gap-2 justify-center items-center">
            <h3 className="inline">Border Countries</h3>
            <div className="flex lg:flex-row gap-2 overflow-auto justify-end-safe items-center ">
              {
                borders?.map((border) => {
                  return (
                    <p className="shadow-sm  rounded-lg" key={crypto.randomUUID()}>
                      {border?.name?.common}
                    </p>
                  )
                })
              }
            </div>
          </section>

        }
      </div>
    </div>
  )
}

export default CountryCard


