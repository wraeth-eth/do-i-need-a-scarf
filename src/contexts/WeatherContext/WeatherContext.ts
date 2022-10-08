import { createContext } from 'react'
import { SetStateFn, WeatherData } from 'types'
import { ctxNotSetFn } from 'utils/ctxNotSetFn'

interface _Context {
  weather: WeatherData | undefined
  setWeather: SetStateFn<WeatherData | undefined>
  loading: boolean
  setLoading: SetStateFn<boolean>
}

export const WeatherContext = createContext<_Context>({
  weather: undefined,
  setWeather: ctxNotSetFn('WeatherContext'),
  loading: false,
  setLoading: ctxNotSetFn('WeatherContext'),
})
