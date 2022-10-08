import { Input } from '@components/Input'
import { useWeather } from 'hooks/useWeather'
import { ChangeEventHandler, useCallback, useState } from 'react'
import useOnclickOutside from 'react-cool-onclickoutside'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { queryWeather } from 'utils/queryWeather'

export const AddressInput = () => {
  const [input, setInput] = useState<string>('')
  const { setWeather } = useWeather()
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
      setInput(e.target.value)
      setValue(e.target.value)
    },
    [setValue]
  )

  const handleCancel: VoidFunction = useCallback(() => {
    clearSuggestions()
    setInput('')
    setValue('')
  }, [clearSuggestions, setValue])

  const handleSelect =
    ({ description }: { description: string }) =>
    async () => {
      setInput(description)
      setValue(description, false)
      clearSuggestions()

      const results = await getGeocode({ address: description })
      const { lat, lng } = getLatLng(results[0])
      console.info('📍 Coordinates: ', { lat, lng })
      const data = await queryWeather({ latitude: lat, longitude: lng })
      console.info('🌡 Data loaded: ', { ...data })
      setWeather(data)
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
    <div ref={ref}>
      <Input
        name="scarfInput"
        label="Address"
        disabled={!ready}
        value={input}
        onChange={handleInput}
        onCancel={handleCancel}
      />
      {status === 'OK' && <ul className="rounded-b-lg bg-gray-500 py-1">{renderSuggestions()}</ul>}
    </div>
  )
}
