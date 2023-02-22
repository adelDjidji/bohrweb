import React, { lazy, useEffect, useState, Suspense } from "react"
import { Icon } from "../components/Icon"
import Layout from "../components/Layout"
import UserTable from "../components/UserTable"
import { IconNames } from "../components/Icon"
// import ModalUser from "../components/UserTable/ModalUser"
import Seo from "../../components/seo"
import { RootStateOrAny, useSelector } from "react-redux"

const ModalUser = lazy(()=>import('../components/UserTable/ModalUser'))

export default function Users() {
  const [modalUserOpen, setModalUserOpen] = useState(false)
  const [modalUserOpen2, setModalUserOpen2] = useState(false)
  const [selecteduser, setSelecteduser] = useState<any>()
  const { companies } = useSelector(
    (state: RootStateOrAny) => state.commun
  )

  const [editMode, seteditMode] = useState(false)
  const handleEditUser = (user:any)=>{
    seteditMode(true)
    const com = companies?.filter(c=>c.name==user.company)[0]
    setSelecteduser({...user, company:com.public_id, entreprise:com.name})
    setModalUserOpen(true)
  }


  return (

    <Suspense fallback = { <div> Please Wait... </div> } >
    <Layout>
      <Seo title="Bohr Energie | Gestion utilisateur" />
      <Layout.Header>
        <h1 className="font-semibold text-3xl leading-11 mb-0">
          Gestion utilisateur
        </h1>
        <button
          className="bg-violet-bohr text-white flex items-center justify-center py-2.5 px-4 rounded-lg"
          type="button"
          onClick={() => {
            setModalUserOpen2(true)}
          }
        >
          <Icon name={IconNames.plusCircle} />
          <span className="ml-2.5">Ajouter un utilisateur</span>
        </button>
      </Layout.Header>
      <UserTable handleEdit={handleEditUser} />
      <ModalUser isEditing={true} data={selecteduser} open={modalUserOpen} onClose={() => setModalUserOpen(false)} />
      <ModalUser isEditing={false} open={modalUserOpen2} onClose={() => setModalUserOpen2(false)} />
    </Layout>

    </Suspense>
  )
}
