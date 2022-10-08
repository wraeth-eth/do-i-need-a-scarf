import { Input } from '@components/Input'
import { useWeather } from 'hooks/useWeather'
import { ChangeEventHandler, useCallback, useState } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { queryWeather } from 'utils/queryWeather'

export const AddressInput = () => {
  const [input, setInput] = useState<string>('')
  const { setWeather, setLoading } = useWeather()
  const {
    ready,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: {}, debounce: 200 })

  const ref = useOnclickOutside(() => {
    clearSuggestions()
  })

  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setWeather(undefined) // Clear state
      setInput(e.target.value)
      setValue(e.target.value)
    },
    [setValue, setWeather]
  )

  const handleCancel: VoidFunction = useCallback(() => {
    clearSuggestions()
    setInput('')
    setValue('')
    setWeather(undefined)
  }, [clearSuggestions, setValue, setWeather])

  const handleSelect =
    ({ description }: { description: string }) =>
    async () => {
      setInput(description)
      setValue(description, false)
      clearSuggestions()
      setLoading(true)

      const results = await getGeocode({ address: description })
      const { lat, lng } = getLatLng(results[0])
      console.info('📍 Coordinates: ', { lat, lng })
      const data = await queryWeather({ latitude: lat, longitude: lng })
      console.info('🌡 Data loaded: ', { ...data })
      setWeather(data)
      setLoading(false)
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li className="py-1 first:pt-0 last:pb-0" key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div ref={ref} onClick={() => setExpanded(!expanded)}>
      <Input
        name="scarfInput"
        label="Address"
        disabled={!ready}
        value={input}
        onChange={handleInput}
        onCancel={handleCancel}
      />
      <ul
        className={`origin-top  transform rounded-b-lg bg-gray-500 px-4 pt-2 pb-4 transition duration-300 ease-scarf ${
          status === 'OK' ? 'scale-y-100' : 'scale-y-0'
        }`}
      >
        {renderSuggestions()}
      </ul>
    </div>
  )
}
