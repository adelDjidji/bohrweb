import { StayPrimaryPortraitSharp } from "@material-ui/icons"
import { useEffect, useState } from "react"

const Input = props => {
  var className = props.extraStyle
  const [inputValue, setinputValue] = useState(props.value)
  useEffect(() => {
    !!props.value && setinputValue(props.value)
  }, [props.value])
  
  const extraProps = props.register ? {...props.register(props.id)} :  props
  className +=
    " border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
  return (
    <>
      {props.label && (
        <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
          {props.label}
        </label>
      )}
      <input {...extraProps} value={inputValue} className={className} height={props.height ?? 40} width={props.width} />
    </>
  )
}

export default Input
