import { EventHandler, SyntheticEvent } from 'react'

export const stopPropagation =
  <E extends SyntheticEvent<any, Event>>(fn: EventHandler<E> | undefined) =>
  (e: E) => {
    e.stopPropagation()
    return fn?.(e)
  }
