import { Avatar, Drawer } from "antd"
import Text from "../Text"
import { Icon } from "../Icon"

import { stringToHexColor, successNotification } from "../../utils"
import moment from "moment"

interface ModalProps {
  onClose?: () => void
  open: boolean
  data?: any
}
const ModalEvent = ({
  onClose = undefined,
  open = false,
  data = null,
}: ModalProps) => {
  const site = data?.name || "site"
  return (
    <>
      <Drawer
        className="user-drawer"
        width={window.innerWidth > 1181 ? 465 : "100vw"}
        title={
          <div>
            <div className="mb-4">
              <Avatar
                gap={9}
                style={{
                  backgroundColor: stringToHexColor(site),
                  color: "white",
                  marginRight: 9,
                }}
                size={40}
              >
                {site.slice(0, 2)}
              </Avatar>
              <Text type="16-600">{site}</Text>
            </div>

            <h1 className="font-semibold text-3xl leading-11 ">
              {data?.comment}
            </h1>
          </div>
        }
        closeIcon={<Icon name="close" />}
        bodyStyle={{ padding: 40, paddingTop: 0 }}
        headerStyle={{ border: "none", padding: "45px 45px 0px 40px" }}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <div className="flex mt-8 flex-wrap gap-y-8">
          <div className="w-full md:w-1/2">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Date de création
            </Text>{" "}
            <br />
            <Text type="16-500">
              {moment(data?.creation_date).format("DD MMM YYYY à HH:mm")}
            </Text>
          </div>
          <div className="w-full md:w-1/2">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Date de modification
            </Text>{" "}
            <br />
            <Text type="16-500">
              {moment(data?.modification_date).format("DD MMM YYYY à HH:mm")}
            </Text>
          </div>
          <div className="w-full md:w-1/2">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Date de début
            </Text>{" "}
            <br />
            <Text type="16-500">
              {moment(data?.start_date).format("DD MMM YYYY à HH:mm")}
            </Text>
          </div>
          <div className="w-full md:w-1/2">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Date de fin
            </Text>{" "}
            <br />
            <Text type="16-500">
              {moment(data?.end_date).format("DD MMM YYYY à HH:mm")}
            </Text>
          </div>
          <div className="w-full md:w-1/2">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Puissance installé
            </Text>{" "}
            <br />
            <Text type="16-500">{data?.installed_power} Kwh</Text>
          </div>
          <div className="w-full md:w-1/2">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Puissance après outage
            </Text>{" "}
            <br />
            <Text type="16-500">{data?.remaining_power} Kwh</Text>
          </div>
          <div className="w-full">
            <Text style={{ color: "#9A9CBA" }} type="14-500">
              Commenaire
            </Text>{" "}
            <br />
            <Text type="16-500">{data?.comment}</Text>
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default ModalEvent
