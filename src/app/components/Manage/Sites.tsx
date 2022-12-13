import React, { useState } from "react"
import { SettingOutlined } from "@ant-design/icons"
import { Collapse, Col, Row } from "antd"
import Text from "../Text"
import { Icon } from "../Icon"

const { Panel } = Collapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
const Sites = () => {
  const onChange = key => {
    console.log(key)
  }
  const genExtra = () => (
    <Icon
      name="edit"
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation()
      }}
    />
  )

  const PanelHeader = () => (
    <Row className="px-6 py-5 mb-2 rounded bg-white flex items-center">
      <Col xs={24} sm={12} md={6} lg={4}>
        <Text type="16-600">Acme</Text>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Text className="text-gray-6f" type="12-500">
          Entreprises
        </Text>
        <Text className="block" type="14-500">
          6
        </Text>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Text className="text-gray-6f" type="12-500">
          Sites
        </Text>
        <Text className="block" type="14-500">
          6
        </Text>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Text className="text-gray-6f" type="12-500">
          Utilisateurs
        </Text>
        <Text className="block" type="14-500">
          9
        </Text>
      </Col>
      <Col xs={24} sm={12} md={6} lg={3}>
        <Text className="text-gray-6f" type="12-500">
          Gain totaux vendus
        </Text>
        <Text className="block" type="14-500">
          250 000€
        </Text>
      </Col>
      <Col xs={24} sm={12} md={6} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Volume totaux vendus
        </Text>
        <Text className="block" type="14-500">
          250 Kwh
        </Text>
      </Col>
      <Col xs={24} sm={12} md={6} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Portefeuille
        </Text>
        <Text className="block" type="14-500">
          250 362€
        </Text>
      </Col>
    </Row>
  )
  return (
    <>
      <Collapse
        defaultActiveKey={["1"]}
        onChange={onChange}
        expandIconPosition="end"
        ghost
      >
        <Panel header={<PanelHeader />} key="1" extra={genExtra()}>
          <div>{text}</div>
        </Panel>
        <Panel header="This is panel header 2" key="2" extra={genExtra()}>
          <div>{text}</div>
        </Panel>
        <Panel header="This is panel header 3" key="3" extra={genExtra()}>
          <div>{text}</div>
        </Panel>
      </Collapse>
    </>
  )
}
export default Sites
