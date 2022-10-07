import type { NextPage } from 'next'
import { ChangeEventHandler, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { ExternalLink } from '@components/ExternalLink'
import { Twitter } from '@components/icons/Twitter'
import { queryWeather, WeatherData } from 'utils/queryWeather'
import { GitHub } from '@components/icons/GitHub'
import { Input } from '@components/Input'

const Home: NextPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: {}, debounce: 500, callbackName: 'initMap' })

  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }: { description: string }) =>
    async () => {
      setValue(description, false)
      clearSuggestions()
      const results = await getGeocode({ address: description })
      const { lat, lng } = getLatLng(results[0])
      console.info('📍 Coordinates: ', { lat, lng })
      const data = await queryWeather({ latitude: lat, longitude: lng })
      console.info('🌡 Data loaded: ', { ...data })
      setWeatherData(data)
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li className="px-2.5 py-0.5" key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <>
      <main>
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
          <h1 className="capitalize">Do I need a scarf</h1>
          <div ref={ref}>
            <div className="px-4 pt-6 sm:px-0">
              <Input name="address" label="Address" disabled={!ready} onChange={handleInput} />
            </div>
            {status === 'OK' && (
              <ul className="rounded-b-lg bg-gray-500 py-1">{renderSuggestions()}</ul>
            )}
          </div>
          <div className="pt-10">
            {weatherData
              ? weatherData.feelsLike < 12
                ? 'Absolutely - you should wear a scarf'
                : 'No, you should be okay'
              : null}
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 flex w-screen justify-center p-2">
        <div className="flex flex-col gap-4 text-center">
          <div className="flex gap-3">
            <ExternalLink href="https://github.com/wraeth-eth/do-i-need-a-scarf">
              <GitHub className="w-6 fill-white" />
            </ExternalLink>
            <ExternalLink href="https://twitter.com/lachmcculloch">
              <Twitter className="w-6 fill-white" />
            </ExternalLink>
          </div>
          2022
        </div>
      </footer>
    </>
  )
}

export default Home
