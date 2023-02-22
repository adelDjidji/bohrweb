import React, { useState } from "react"
import Text from "./Text"
import { Icon } from "./Icon"
import { Modal } from "antd"

const Card = props => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const CardBody = ({voirPlus=false}) => (
    <div
      className="bg-white rounded-lg p-6 "
      style={{ boxShadow: "6px 6px 54px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex justify-between mb-5 flex-wrap">
        <div className="flex gap-2.5 items-center">
          <Text type="16-600">{props.title}</Text>
          <Icon
            className="cursor-pointer"
            title={props.tooltip || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            titleTrigger='click'
            name="info"
          />
        </div>
        {props.voirPlus && voirPlus && (
          <label onClick={()=>setIsModalOpen(true)} className="cursor-pointer text-sm font-semibold text-violet-bohr">
            Voir plus
          </label>
        )}
        {props.headerRight}
      </div>
      <div className={props.bodyClassName}>{props.children}</div>
    </div>
  )
  return (
    <div className={"p-2.5 " + props.className}>
      <CardBody voirPlus={true} />
      <Modal
        centered
        footer={null}
        title=""
        open={isModalOpen}
        width='100%'
        onCancel={() => setIsModalOpen(false)}
      >
        {props.details}
      </Modal>
    </div>
  )
}
Card.Header = () => {
  return <div></div>
}

export default Card
