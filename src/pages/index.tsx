import type { NextPage } from 'next'
import { ChangeEventHandler, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { queryWeather, WeatherData } from 'utils/queryWeather'
import { Input } from '@components/Input'
import { Footer } from '@components/Footer'

const Home: NextPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: {}, debounce: 300, callbackName: 'initMap' })

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
              <Input name="scarfInput" label="Address" disabled={!ready} onChange={handleInput} />
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
      <Footer />
    </>
  )
}

export default Home
