import { CloseCircleFilled } from '@components/icons/CloseCircleFilled'
import { ReactNode, ChangeEventHandler, useCallback, useState } from 'react'
import { stopPropagation } from 'utils/stopPropogation'

export const Input = ({
  name,
  label,
  value,
  disabled,
  onChange,
  onCancel,
}: {
  name: string
  label: ReactNode
  value?: string
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  onCancel?: VoidFunction
}) => {
  const [_input, _setInput] = useState<string>('')
  const input = value ?? _input

  const handleInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      _setInput(e.target.value)
      onChange?.(e)
    },
    [onChange]
  )
  return (
    <div className="relative">
      <input
        type="text"
        id={name}
        className="border-1 peer block w-full appearance-none rounded-t-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
        value={input}
        placeholder=" "
        disabled={disabled}
        onChange={handleInput}
      />
      <label
        htmlFor={name}
        className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-800 dark:text-gray-400 peer-focus:dark:text-blue-500"
      >
        {label}
      </label>
      {onCancel && !!input.length && (
        <CloseCircleFilled
          className="absolute top-1/2 right-0 mr-3 w-5 -translate-y-1/2 -translate-x-1/2 transform cursor-pointer fill-white"
          onClick={stopPropagation(onCancel)}
        />
      )}
    </div>
  )
}
