import React, { lazy, useEffect, useState, Suspense } from "react"
import { Icon } from "../Icon"
import Layout from "../Layout"
import UserTable from "../UserTable"
import { IconNames } from "../Icon"
// import ModalUser from "../components/UserTable/ModalUser"
import Seo from "../../../components/seo"
import { RootStateOrAny, useSelector } from "react-redux"

const ModalUser = lazy(()=>import('../UserTable/ModalUser'))

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

      <UserTable handleEdit={handleEditUser} />
      <ModalUser isEditing={true} data={selecteduser} open={modalUserOpen} onClose={() => setModalUserOpen(false)} />
      <ModalUser isEditing={false} open={modalUserOpen2} onClose={() => setModalUserOpen2(false)} />

    </Suspense>
  )
}
