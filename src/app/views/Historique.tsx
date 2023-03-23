import React from "react"
import Layout from "../components/Layout"
import Seo from "../../components/seo"
import { Calendar } from "../components/Historique/Calendar"


export default function Historique() {

  return (
    <Layout isDashboard={true} showSignlerArret showContactUs>
      <Seo title="Bohr Energie | Historique des arrêts" />
      <Layout.Header>
        <h1 style={{fontSize:40}} className="font-semibold text-3xl mb-8">
        Historique des arrêts
        </h1>
      </Layout.Header>
      <Calendar/>
    </Layout>
  )
}
