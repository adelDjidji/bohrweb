import { DatePicker } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import { Icon } from "./Icon"

type Iprops = {
  showHours?:boolean;
  format?:string;
  onChange?:any;
  onDateChange?:any;
  defaultValue?:string
}
export const DateSelector = ({showHours=true, format= 'YYYY/MM/DD', onChange, onDateChange, defaultValue}:Iprops) => {
    const [pickerOpen, setpickerOpen] = useState(false)
    const [hour, sethour] = useState('00')
    const [minutes, setminutes] = useState('00')
    const [isFooterClicked, setisFooterClicked] = useState(false)
    const dateChange = (d) => {
      setpickerOpen(false)
      setisFooterClicked(false)
      onChange && onChange(dayjs(d).format(format))
      onDateChange && onDateChange(d)
    }
    
    const customFormat = (value) => showHours ? `${value.format('YYYY/MM/DD')} ${hour}:${minutes}` : value.format(format) ;
  
    const handleChangeHour = (e)=>{
      sethour(e.target.value)
      setisFooterClicked(false)
    }
    const handleChangeMinutes = (e)=>{
      setminutes(e.target.value)
      setisFooterClicked(false)
    }
    return (
      <DatePicker
        inputReadOnly={true}
        showToday={false}
        open={pickerOpen}
        placement='bottomLeft'
        onClick={() => setpickerOpen(!pickerOpen)}
        onOpenChange={op => {
          !isFooterClicked && pickerOpen && setpickerOpen(op)
        }}
        className="h-10 w-full border-2 border-gray-200 hover:border-violet-bohr "
        onChange={dateChange}
        // onSelect={}
        suffixIcon={<Icon name="calendar" />}
        format={customFormat}
        renderExtraFooter={() => showHours &&(
          <div
            onMouseDown={e => {
              setisFooterClicked(true)
              e.stopPropagation()
            }}
            className="flex items-center gap-2.5 justify-center mt-4 mb-4"
          >
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Heure
              </label>
              <input
                type="number"
                placeholder="00"
                maxLength={2}
                max={23}
                className="h-10	w-14 text-center font-semibold border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey text-sm rounded-lg focus:ring-primary-600  block p-2.5"
                onChange={handleChangeHour}
              />
            </div>
            <span className="mt-5">:</span>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-900">
                Minute
              </label>
              <input
                type="number"
                placeholder="00"
                max={59}
                maxLength={2}
                onChange={handleChangeMinutes}
                className="h-10 w-14 text-center font-semibold border-2 border-gray-200 hover:border-violet-bohr  text-dark-grey text-sm rounded-lg focus:ring-primary-600  block p-2.5"
              />
            </div>
          </div>
        )}
        defaultValue={dayjs(defaultValue)}
      />
    )
  }