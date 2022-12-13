import React from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"


export default function Previsions() {

  return (
    <Layout isDashboard={true}>
      <Seo title="Bohr Energie | Prévisions" />
      <Layout.Header>
        <h1 style={{fontSize:40}} className="font-semibold text-3xl mb-0">
        Prévisions
        </h1>
      </Layout.Header>
      
    </Layout>
  )
}
