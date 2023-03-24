import React, { ReactNode, useEffect, useState } from "react"
import { DownOutlined, SmileOutlined } from "@ant-design/icons"
import { Dropdown, Space, Checkbox, Divider, Button, Radio } from "antd"
import { Icon } from "./Icon"
import PropTypes from "prop-types"
import { CheckboxValueType } from "antd/es/checkbox/Group"
import Text from "./Text"

interface DropdownProps {
  items: { key: string; value: string }[] | any
  onSelect?: (selected: any[]|any) => void
  placeholder?: string
  width?: number
  fullWidth?: boolean
  FooterComponent?: ReactNode | null
  type?: "checkbox" | "radio" | "none"
  footerClickExitEvent?: boolean
  defaultValue?: any
  defaultValues?: any
  keyAttribute?: string
  valueAttribute?: string
  withSlectAll?: boolean
}

const SelectDropdown = ({
  items = [],
  onSelect,
  placeholder = "",
  width = 280,
  fullWidth = false,
  FooterComponent = null,
  type = "checkbox",
  footerClickExitEvent = true,
  defaultValue = null,
  defaultValues = [],
  keyAttribute = "key",
  valueAttribute = "value",
  withSlectAll = false,
}: DropdownProps) => {
  type itemType = {
    key: string
    value: string
  }
  type onChangeFun = (val: CheckboxValueType[]) => void

  const [slectedValues, setslectedValues] = useState<itemType[] | any>(
    defaultValues
  )
  const [slectedValue, setslectedValue] = useState<any>(defaultValue)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onChange: onChangeFun = checkedValues => {
    let selected: itemType[] | any = items.filter((it: itemType | any) =>
      checkedValues.includes(it[keyAttribute])
    )
    setslectedValues(selected)
    onSelect && onSelect(selected)
  }
  const onChangeRadio = (e: any) => {
    let id = e.target.value
    const val = items.filter(i => i[keyAttribute] == id)[0]
    setslectedValue(val)
    onSelect && onSelect(val)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!!defaultValue) {
      //check types if array of object or array of ids
      if (typeof defaultValue === "string") {
        setslectedValue(items.find(o => o[keyAttribute] == defaultValue))
      } else {
        setslectedValue(defaultValue)
      }
    }
    if (!!defaultValues.length) {
      if (typeof defaultValues[0] === "string") {
        setslectedValues(
            items.filter(o => defaultValues.includes(o[keyAttribute]))
        )
      } else {
        setslectedValues(defaultValues)
      }
    }else{
      if(!!slectedValues.length) {
        setslectedValues([])
      }
    }
  }, [defaultValue, defaultValues])

  const [allSelected, setallSelected] = useState(false)
  const handleSelectAll = e => {
    let selected = []
    setallSelected(e.target.checked)
    if (e.target.checked) {
      selected = items
    } else {
      selected = []
    }
    setslectedValues(selected)
    onSelect && onSelect(selected)
  }
  return (
    <Dropdown
      open={isOpen}
      trigger={["click"]}
      onOpenChange={flag => setIsOpen(flag)}
      dropdownRender={menu => (
        <>
          {type === "checkbox" && (
            <>
              <Checkbox.Group
                onChange={onChange}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                defaultValue={slectedValues.map(i => i[keyAttribute])}
                value={slectedValues.map(i => i[keyAttribute])}
              >
                {items.map(item => (
                  <Checkbox disabled={allSelected} value={item[keyAttribute]}>
                    {item[valueAttribute]}
                  </Checkbox>
                ))}
              </Checkbox.Group>
              {withSlectAll && (
                <Checkbox className="tous" onChange={handleSelectAll}>
                  Tous
                </Checkbox>
              )}
            </>
          )}
          {type === "radio" && (
            <Radio.Group
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onChange={onChangeRadio}
              value={slectedValue ? slectedValue[keyAttribute] : ""}
            >
              {items.map(item => (
                <Radio value={item[keyAttribute]}>{item[valueAttribute]}</Radio>
              ))}
            </Radio.Group>
          )}
          {type === "none" && (
            <Radio.Group
              className="none"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onChange={onChangeRadio}
              value={slectedValue}
            >
              {items.map(item => (
                <Radio value={item[keyAttribute]}>{item[valueAttribute]}</Radio>
              ))}
            </Radio.Group>
          )}

          {
            <>
              <Divider style={{ margin: 0 }} />
              <Space
                style={{ padding: 8 }}
                onClick={() => footerClickExitEvent && setIsOpen(false)}
              >
                {FooterComponent}
              </Space>
            </>
          }
        </>
      )}
    >
      <div
        className="cursor-pointer bg-white rounded-lg px-4 py-3 flex justify-between items-center border-2 border-gray-200 h-10 hover:border-violet-bohr"
        style={!fullWidth ? { width } : {}}
        onClick={() => setIsOpen(!isOpen)}
      >
        {type === "checkbox" ? (
          slectedValues.length ? (
            <span className="flex w-full justify-between items-center pr-3">
              <span
                style={{
                  maxWidth: "95%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  overflowWrap: "break-word",
                  flexWrap: "nowrap",
                  whiteSpace: "nowrap",
                }}
              >
                {slectedValues.map(i => " " + i[valueAttribute]).toString()}
              </span>
              <span
                className="text-violet-bohr text-sm rounded text-center pt-1 w-6 h-6"
                style={{ background: "#EDE7FD" }}
              >
                {slectedValues.length}
              </span>
            </span>
          ) : (
            <Text type="14-600" className="text-gray-6f">
              {placeholder}{" "}
            </Text>
          )
        ) : slectedValue ? (
          <span className="text-sm">{slectedValue[valueAttribute]} </span>
        ) : (
          <Text type="14-600" className="text-gray-6f">
            {placeholder}{" "}
          </Text>
        )}

        <Icon name="arrow-down-sm" />
      </div>
    </Dropdown>
  )
}

SelectDropdown.propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  FooterComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  type: PropTypes.oneOf(["checkbox", "radio", "none"]),
  footerClickExitEvent: PropTypes.bool,
}

export default SelectDropdown
