import { WeatherContext } from 'contexts'
import { useContext } from 'react'

export const useWeather = () => {
  return useContext(WeatherContext)
}
