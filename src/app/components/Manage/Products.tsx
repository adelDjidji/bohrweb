import React, { lazy, useEffect, useState, Suspense } from "react"
import { Icon } from "../Icon"
import Layout from "../Layout"
import UserTable from "../UserTable"
import { IconNames } from "../Icon"
// import ModalUser from "../components/UserTable/ModalUser"
import Seo from "../../../components/seo"
import { RootStateOrAny, useSelector } from "react-redux"
import ProductTable from "../ProductTable"

const ModalUser = lazy(()=>import('../UserTable/ModalUser'))

export default function Users() {


  return (

    <Suspense fallback = { <div> Please Wait... </div> } >

      <ProductTable/>

    </Suspense>
  )
}
