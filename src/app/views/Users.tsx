import React, { useState } from "react"
import { Icon } from "../components/Icon"
import Layout from "../components/Layout"
import UserTable from "../components/UserTable"
import { IconNames } from "../components/Icon"
import ModalUser from "../components/UserTable/ModalUser"
import Seo from "../../components/seo"
export default function Users() {
  const [modalUserOpen, setModalUserOpen] = useState(false)

  return (
    <Layout>
      <Seo title="Bohr Energie | Gestion utilisateur" />
      <Layout.Header>
        <h1 className="font-semibold text-3xl leading-11 mb-0">
          Gestion utilisateur
        </h1>
        <button
          className="bg-violet-bohr text-white flex items-center justify-center py-2.5 px-4 rounded-lg"
          type="button"
          onClick={() => setModalUserOpen(true)}
        >
          <Icon name={IconNames.plusCircle} />
          <span className="ml-2.5">Ajouter un utilisateur</span>
        </button>
      </Layout.Header>
      <UserTable />
      <ModalUser open={modalUserOpen} onClose={() => setModalUserOpen(false)} />
    </Layout>
  )
}
