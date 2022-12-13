import React, { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { Tabs } from "antd"
import { Icon, IconNames } from "../components/Icon"
import Sites from "../components/Manage/Sites"

export default function Gestion() {
  const [modalSiteOpen, setmodalSiteOpen] = useState(false)
  return (
    <Layout isDashboard={true}>
      <Seo title="Bohr Energie | Gestion" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Gestion
        </h1>
      </Layout.Header>
      <Tabs
        defaultActiveKey="4"
        items={[
          {
            label: `Utilisateurs`,
            key: "1",
            children: `Content of Tab Pane 1`,
          },
          {
            label: `Factures`,
            key: "2",
            children: `Content of Tab Pane 2`,
          },
          {
            label: `Contracts`,
            key: "3",
            children: `Content of Tab Pane 3`,
          },
          {
            label: `Sites`,
            key: "4",
            children: <Sites/>,
          },
        ]}
        tabBarExtraContent={<button
          className="bg-violet-bohr text-white flex items-center justify-center py-2.5 px-4 rounded-lg"
          type="button"
          onClick={() => setmodalSiteOpen(true)}
        >
          <Icon name={IconNames.plusCircle} />
          <span className="ml-2.5">Ajouter un site de production</span>
        </button>}
      />
    </Layout>
  )
}
