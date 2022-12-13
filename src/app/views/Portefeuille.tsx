import React from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"


export default function Portefeuille() {

  return (
    <Layout isDashboard={true}>
      <Seo title="Bohr Energie | Portefeuille" />
      <Layout.Header>
        <h1 style={{fontSize:40}} className="font-semibold text-3xl mb-0">
        Portefeuille
        </h1>
      </Layout.Header>
      
    </Layout>
  )
}
