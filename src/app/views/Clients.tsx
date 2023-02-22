import React, { useState } from "react"
import Layout from "../components/Layout"
import Clients from "../components/Clients"
import Seo from "../../components/seo"
export default function Users() {
  return (
    <Layout>
      <Seo title="Bohr Energie | Espace client" />
      <Layout.Header>
        <h1 className="font-semibold text-3xl leading-11 mb-0">
          Espace Client
        </h1>
      </Layout.Header>
      <Clients />
    </Layout>
  )
}
