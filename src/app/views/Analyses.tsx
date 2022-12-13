import React from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"


export default function Analyses() {

  return (
    <Layout isDashboard={true}>
      <Seo title="Bohr Energie | Analyses" />
      <Layout.Header>
        <h1 style={{fontSize:40}} className="font-semibold text-3xl mb-0">
        Analyses
        </h1>
      </Layout.Header>
      
    </Layout>
  )
}
