import axios from 'axios'
export interface WeatherData {
  feelsLike: number
  windSpeed: number
}

export const queryWeather = async ({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) => {
  const { data } = await axios.post('/api/weather', { latitude, longitude })
  return data
}
