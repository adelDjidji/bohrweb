import React, { ReactNode, useState } from "react"
import { DownOutlined, SmileOutlined } from "@ant-design/icons"
import { Dropdown, Space, Checkbox, Divider, Button, Radio } from "antd"
import { Icon } from "./Icon"
import PropTypes from "prop-types"
import { CheckboxValueType } from "antd/es/checkbox/Group"

type itemType = {
  key: string
  value: string
}
type onChangeFun = (val: CheckboxValueType[]) => void

const defaultItems: itemType[] = [
  {
    key: "1",
    value: "test1",
  },
  {
    key: "2",
    value: "test2",
  },
  {
    key: "3",
    value: "test3",
  },
  {
    key: "4",
    value: "test4",
  },
]

interface DropdownProps {
  items: { key: string; value: string }[]
  onSelect: (selected: any[]) => void
  placeholder?: string
  width?: number
  FooterComponent?: ReactNode | null
  type?: "checkbox" | "radio" | 'none'
  footerClickExitEvent?: boolean
}

const SelectDropdown = ({
  items = defaultItems,
  onSelect,
  placeholder = "",
  width = 230,
  FooterComponent = null,
  type = "checkbox",
  footerClickExitEvent = true,
}: DropdownProps) => {
  const [slectedValues, setslectedValues] = useState<itemType[]>([])
  const [slectedValue, setslectedValue] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onChange: onChangeFun = checkedValues => {
    let selected: itemType[] = items.filter((it: itemType) =>
      checkedValues.includes(it.key)
    )
    setslectedValues(selected)
    onSelect && onSelect(selected)
    console.log(onSelect)
  }
  const onChangeRadio = (e: any) => {
    let val = e.target.value
    console.log(val)
    setslectedValue(val)
    onSelect && onSelect(val)
    setIsOpen(false)
  }

  return (
    <Dropdown
      open={isOpen}
      trigger={["click"]}
      onOpenChange={flag => setIsOpen(flag)}
      dropdownRender={menu => (
        <>
          {type === "checkbox" && (
            <Checkbox.Group
              onChange={onChange}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {items.map(item => (
                <Checkbox value={item.key}>{item.value}</Checkbox>
              ))}
            </Checkbox.Group>
          )}
          {type === "radio" && (
            <Radio.Group
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onChange={onChangeRadio}
              value={slectedValue}
            >
              {items.map(item => (
                <Radio value={item.key}>{item.value}</Radio>
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
                <Radio value={item.key}>{item.value}</Radio>
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
        className="cursor-pointer rounded-lg px-4 py-3 flex justify-between items-center"
        style={{ border: "2px solid #E5E3ED", height: 40, width }}
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
                {slectedValues.map(i => " " + i.value).toString()}
              </span>
              <span
                className="text-violet-bohr text-sm rounded text-center pt-1 w-6 h-6"
                style={{ background: "#EDE7FD" }}
              >
                {slectedValues.length}
              </span>
            </span>
          ) : (
            <span className="text-gray-6f">{placeholder} </span>
          )
        ) : slectedValue ? (
          <span className="text-sm">{slectedValue} </span>
        ) : (
          <span className="text-gray-6f">{placeholder} </span>
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
  type: PropTypes.oneOf(["checkbox", "radio"]),
  footerClickExitEvent: PropTypes.bool,
}

export default SelectDropdown
