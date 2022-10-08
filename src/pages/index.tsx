import type { NextPage } from 'next'
import usePlacesAutocomplete from 'use-places-autocomplete'
import { Spin } from '@components/icons'
import { AddressInput } from '@components/AddressInput'
import { useState } from 'react'
import { WeatherData } from 'types'
import { WeatherContext } from 'contexts'

const Home: NextPage = () => {
  const [weather, setWeather] = useState<WeatherData>()
  const [resultLoading, setResultLoading] = useState<boolean>(false)
  const { ready } = usePlacesAutocomplete({ requestOptions: {}, debounce: 300 })

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin />
      </div>
    )
  }

  return (
    <WeatherContext.Provider
      value={{ weather, setWeather, loading: resultLoading, setLoading: setResultLoading }}
    >
      <main>
        <div className="mx-auto max-w-2xl py-6 px-6">
          <h1 className="text-xl capitalize">Do I need a scarf</h1>
          <div className="px-4 pt-6 md:px-0">
            <AddressInput />
          </div>
          <div className="pt-10">
            {resultLoading ? (
              <Spin />
            ) : weather ? (
              weather.feelsLike < 12 ? (
                'Absolutely - you should wear a scarf'
              ) : (
                'No, you should be okay'
              )
            ) : null}
          </div>
        </div>
      </main>
    </WeatherContext.Provider>
  )
}

export default Home
