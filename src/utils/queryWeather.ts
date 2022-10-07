import axios from 'axios'
import { WeatherData } from 'types'

export const queryWeather = async ({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) => {
  const { data } = await axios.post('/api/weather', { latitude, longitude })
  return data as WeatherData
}
