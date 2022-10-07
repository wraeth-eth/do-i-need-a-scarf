import { Button } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {
  ChangeEventHandler,
  EventHandler,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import styles from '../styles/Home.module.css'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { ExternalLink } from '@components/ExternalLink'
import { Twitter } from '@components/icons/Twitter'
import { queryWeather, WeatherData } from 'utils/queryWeather'
import { GitHub } from '@components/icons/GitHub'

const FloatingInput = ({
  name,
  label,
  disabled,
  onChange,
}: {
  name: string
  label: ReactNode
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        className="border-1 peer block w-full appearance-none rounded-t-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
        placeholder=" "
        disabled={disabled}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-800 dark:text-gray-400 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>
    </div>
  )
}

const Home: NextPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: {}, debounce: 500 })

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
      console.log('📍 Coordinates: ', { lat, lng })
      console.log('📍 Loading Data for: ', { lat, lng })
      const data = await queryWeather({ latitude: lat, longitude: lng })
      console.log('🌡 Data loaded: ', { data })
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

  console.log(weatherData)
  return (
    <>
      <main>
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8">
          <h1 className="capitalize">Do I need a scarf</h1>
          <div ref={ref}>
            <div className="px-4 pt-6 sm:px-0">
              <FloatingInput name="test" label="Address" disabled={!ready} onChange={handleInput} />
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
