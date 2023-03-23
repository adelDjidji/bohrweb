import { notification } from "antd"
import { Icon } from "../components/Icon"


export function successNotification(message: string, description = "") {
  notification.success({
    message,
    description,
    placement: "topRight",
    duration: 4,
    className: "test-notif",
    // icon: <Icon name="success-icon" />,
    style: {
      padding: "16px 19px 10px 19px",
      transform: "scale(0.8)",
      right: "-10%",
    },
  })
}

// open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir=“/tmp/chrome_dev_test” --disable-web-security
export function errorNotification(message: string, description = "") {
  notification.error({
    message,
    description,
    placement: "topRight",
    duration: 4,
    className: "test-notif",
    // icon: <Icon name="success-icon" />,
    style: {
      padding: "16px 19px 10px 19px",
      transform: "scale(0.8)",
      right: "-10%",
    },
  })
}


// random color
export function stringToHexColor(string: string) {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  let color = "#"
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    color += ("00" + value.toString(16)).substr(-2)
  }
  return color
}