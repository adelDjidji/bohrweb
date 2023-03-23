import React, { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { Modal, Tabs } from "antd"
import { Icon, IconNames } from "../components/Icon"
import Sites from "../components/Manage/Sites"
import AddSite from "../components/Manage/AddSite"
import UserTable from "../components/UserTable"
import ModalUser from "../components/UserTable/ModalUser"
import FacturesTable from "../components/Manage/Factures"
import ContractsTable from "../components/Manage/Contracts"
import { RootStateOrAny, useSelector } from "react-redux"

export default function Gestion() {
  const [modalSiteOpen, setmodalSiteOpen] = useState(false)
  const [modalUserOpen, setmodalUserOpen] = useState(false)
  const [modalUserOpen2, setmodalUserOpen2] = useState(false)
  const [selecteduser, setSelecteduser] = useState()
  const { companies } = useSelector(
    (state: RootStateOrAny) => state.commun
  )
  const handleCloseModal = () => {
    setmodalSiteOpen(false)
  }
  
  const [activeTab, setactiveTab] = useState("1")

  const ActionButton = () => {
    const actionFunction = () => {
      activeTab == "4" && setmodalSiteOpen(true)
      activeTab == "1" && setmodalUserOpen2(true)
    }
    if (activeTab == "4" || activeTab == "1")
      return (
        <button
          className="bg-violet-bohr text-white flex items-center justify-center py-2.5 px-4 rounded-lg"
          type="button"
          onClick={actionFunction}
        >
          <Icon name={IconNames.plusCircle} />
          <span className="ml-2.5">
            {activeTab == "4" && "Ajouter un site de production"}
            {activeTab == "1" && "Ajouter un utilisateur"}
          </span>
        </button>
      )
    else return null
  }
  const handleEditUser = (user:any)=>{
    const com = companies?.filter(c=>c.name==user.company)[0]
    setSelecteduser({...user, company:com.public_id, entreprise:com.name})
    setmodalUserOpen(true)
  }
  

  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Gestion" />
      <Layout.Header>
        <h1 style={{ fontSize: 40 }} className="font-semibold text-3xl mb-0">
          Gestion
        </h1>
      </Layout.Header>
      <Tabs
        activeKey={activeTab}
        onChange={key => setactiveTab(key)}
        defaultActiveKey="1"
        items={[
          {
            label: `Utilisateurs`,
            key: "1",
            children: <UserTable isGestion={true} showExport={false} enabledFilters={['site']} handleEdit={handleEditUser} />,
          },
          {
            label: `Factures`,
            key: "2",
            children: <FacturesTable/>,
          },
          {
            label: `Contracts`,
            key: "3",
            children: <ContractsTable/>,
          },
          {
            label: `Sites`,
            key: "4",
            children: <Sites />,
          },
        ]}
        tabBarExtraContent={<ActionButton />}
      />
      <Modal
        className="modal-fullscreen rounded-none h-full w-full p-0 m-0 all-Campton"
        open={modalSiteOpen}
        onCancel={handleCloseModal}
        bodyStyle={{ minHeight: "100vh" }}
        width="100%"
        footer={null}
      >
        {
          modalSiteOpen && <AddSite open={modalSiteOpen} closeModal={handleCloseModal} />
        }
      </Modal>
      
      <ModalUser isEditing={true} isGestion={true} data={selecteduser} open={modalUserOpen} onClose={() => setmodalUserOpen(false)} />
      <ModalUser isEditing={false} isGestion={true} open={modalUserOpen2} onClose={() => setmodalUserOpen2(false)} />
    </Layout>
  )
}
