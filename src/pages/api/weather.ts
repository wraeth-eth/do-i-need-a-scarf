// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { WeatherData } from 'utils/queryWeather'
import Cors from 'cors'
import { runMiddleware } from 'providers/middleware'

const cors = Cors({ methods: ['POST'] })

const KELVIN_TO_CELCIUS = 273.15

export default async function handler(req: NextApiRequest, res: NextApiResponse<WeatherData>) {
  await runMiddleware(req, res, cors)

  const WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${WEATHER_API_KEY}`
  const result = await fetch(url)
  const { current } = JSON.parse(await result.text())
  const feelsLike = parseFloat(current.feels_like) - KELVIN_TO_CELCIUS
  const windSpeed = parseFloat(current.wind_speed)

  res.status(200).json({ feelsLike, windSpeed })
}
