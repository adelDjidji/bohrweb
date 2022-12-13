import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"
import FooterImage from "../components/FooterImage"

const keyBenefits = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title="Bohr energie" />

      {/* hero */}
      <section className="relative bg-hero-benefits bg-cover h-580p flex flex-col justify-center mt-20 md:mt-0 bg-left--53/100-top-41/100">
        
        <div className="w-2/3 ml-24">

          <h1 className="text-white md:text-5xl text-2xl font-semibold">
            {t("keyBenefits.hero.l1")}
          </h1>
          <p className="text-white md:mt-12 w-2/3"> 
            {t("keyBenefits.section1.p0")}
            <br/>
            {t("keyBenefits.section1.p1")}
          </p>
          
        </div>
        
      </section>
      
      {/* section 1 */}
      <section className="container mx-auto flex md:flex-row flex-col mt-0 p-8 items-center lg:max-w-full xl:px-40">
        
        <div className="flex md:flex-row flex-col justify-center md:mt-16 px-10 md:px-auto m-auto">
          
          <div className="md:w-1/2 ml-8" >
            
            <h2 className="text-black md:text-4xl">
              <strong>{t("keyBenefits.section1.h1")}</strong>
            </h2>
            <p className="text-gray-6f mt-12 mr-12"> 
              {t("keyBenefits.section1.p2")}
            </p>

          </div>
          
          <div className="md:w-1/2 lg:flex lg:justify-left">
            <img
                src="/images/technologie.svg"
                alt="Diagramme-technologique"
                width={500}
                className="md:mt-0 md:ml-24"
              />
          </div>

        </div>
 
      </section>

      {/* section 3 */}
      <section className="bg-gray-bg">
        <div className="flex md:flex-row flex-col">

          <div className="w-2/3 mx-16">

            <h2 className="text-2xl md:text-4xl md:mt-24 mr-24 p-10 sm:p-auto ">
                {t("keyBenefits.section2.h0")}
            </h2>
            <h2 className="ml-10 ">
                {t("keyBenefits.section2.h2")}
            </h2>
            <p className="text-gray-6f px-10 md:mb-0 mb-10 mr-24">
              {t("keyBenefits.section2.p1")}
            </p>
            <h2 className="ml-10 md:mt-12">
                {t("keyBenefits.section2.h3")}
            </h2>
            <p className="text-gray-6f px-10 md:mb-0 mb-10 mr-24">
              {t("keyBenefits.section2.p2")}
            </p>
            <h2 className="ml-10 md:mt-12">
                {t("keyBenefits.section2.h4")}
            </h2>
            <p className="text-gray-6f px-10 md:mb-0 mb-10 mr-24">
              {t("keyBenefits.section2.p3")}
            </p>

          </div>

          <div className="w-1/3">

            <img  src="/images/image 25.png"
                  alt="Technologie"
                  width={650}
                  className="md:my-24"
                />

          </div> 
        </div>
      </section> 
      
      {/* section 4 */}
      <section className="bg-violet-bohr-bis">
          
        <div className="flex flex-col items-center">
          <h2 className="text-white text-center text-2xl md:text-3xl md:my-12 p-10 w-1/2 sm:p-auto">
              <strong>{t("keyBenefits.section2.h1")}</strong>
          </h2>
        </div>
        
        <div className="text-white flex md:flex-row flex-col items-center content-center mx-48">
          <div className="w-3/4">
            <div className="flex md:flex-row flex-col">
              <div className="bg-violet-bohr-claire flex md:flex-row flex-col content-center justify-center items-center place-content-center w-1/3 m-4 rounded-lg" >
                <img
                  className="my-8 mx-4 md:w-18 md:h-9"
                  src="./images/photo.svg"
                  alt="Solaire"
                />
                <h1 className="text-sm mr-4">
                  Prévisions meteo
                </h1>            
              </div>

              <div className="bg-violet-bohr-obs w-1/3 m-4 rounded-lg" >
                <h1 className="text-sm text-center m-6">
                  Prévisions de production des actifs & des conditions de marché
                </h1>
              </div>

              <div className="bg-violet-bohr-obs text-sm w-1/3 m-4 rounded-lg" >
                <h1 className="text-sm text-center m-6">
                Optimisation de la valeuria des strategies de marché
                </h1>
              </div>
            </div>
            
            <div className="flex md:flex-row flex-col">
              
              <div className="bg-violet-bohr-claire flex md:flex-row flex-col content-center justify-center items-center place-content-center w-1/3 m-4 rounded-lg" >
                <img
                  className="my-8 mx-4 md:w-16 md:h-7"
                  src="./images/hydro.svg"
                  alt="Hydro"
                />
                <h1 className="text-sm mr-4">
                  Moyens de productions
                </h1>            
              </div>
              <div className="bg-violet-bohr-obs m-4 w-1/3 rounded-lg">
                <h1 className="text-sm text-center m-6">
                  Connexion et modélisation du portefeuille d'actifs
                </h1>
              </div>
              <div className="bg-violet-bohr-obs m-4 w-1/3 rounded-lg">
                <h1 className="text-sm text-center m-6">
                  Gestion du dispatching et du pilotage
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-white text-black w-1/4 mx-4 rounded-lg">
            <h1 className="text-violet-bohr-dark text-sm text-center m-6">
              Accès aux marchés
            </h1>
            <div className="grid place-items-center my-8">
              <img
                  className="md:w-34 md:h-14"
                  src="./images/logo_epex.png"
                  alt="Epex Spot"
                />
              <img
                className="mt-4 md:w-22 md:h-4"
                src="./images/logo_eex.png"
                alt="EEX"
              />
            </div>
          </div>
        </div>
        
      </section> 

      <section className="py-12">
        <FooterImage/>
      </section>         
     
    </Layout>
  )
}

export default keyBenefits
