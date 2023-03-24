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
      <section className="flex bg-hero-benefits bg-cover h-520p">
        
        <div className="md:w-2/3 sm:w-full w-full md:ml-24 sm:ml-24 ml-4 md:mt-12 sm:mt-12 mt-0">

          <h1 className="text-white font-semibold md:text-5xl text-3xl mt-24 ">
            {t("keyBenefits.hero.l1")}
          </h1>
          <p className="text-white md:text-xl sm:text-xl text-base md:mt-12 sm:mt-12 mt-12 md:w-2/3 sm:w-2/3 w-full"> 
            {t("keyBenefits.section1.p0")}
            <br/>
            {t("keyBenefits.section1.p1")}
          </p>
          
        </div>
        
      </section>
      
      {/* section 1 */}
      <section className="mx-auto flex md:flex-row flex-col mt-0 p-8 items-center xl:px-32 lg:px-32 ">
        
        <div className="flex md:flex-row sm:flex-row flex-col justify-center md:mt-16 sm:mt-16 md:px-auto sm:px-auto md:m-auto sm:m-auto">
          
          <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-1/2 w-full xl:-ml-12 lg:-ml-44 md:ml-16 sm:ml-16 ml-0 md:mt-12" >
            
            <h2 className="text-black md:text-4xl sm:text-3xl text-2xl">
              <strong>{t("keyBenefits.section1.h1")}</strong>
            </h2>
            <p className="text-gray-6f mt-12 md:mr-12 sm:mr-12 mr-0"> 
              {t("keyBenefits.section1.p2")}
            </p>

          </div>
          
          <div className="xl:w-1/2 lg:w-1/2  md:w-1/2 sm:w-1/2 w-full lg:flex lg:justify-left my-4">
            <img
                src="/images/technologie.svg"
                alt="Diagramme-technologique"
                className="md:mt-0 sm:mt-0 md:mb-0 sm:mb-12 mt-12 md:ml-12 sm:ml-12 ml-0 md:mr-20 sm:mr-20 md:w-full sm:w-4/5"
              />
          </div>

        </div>
 
      </section>

      {/* section 3 */}
      <section className="bg-gray-bg">

        <h2 className="text-black md:w-1/2 sm:w-1/2 w-full md:text-4xl sm:text-3xl text-2xl md:mt-24 sm:mr-24 mr-0 md:ml-16 sm:ml-16 ml-0 md:p-10 sm:p-auto p-8">
          <strong>{t("keyBenefits.section2.h0")}</strong>
        </h2>

        <div className="flex md:flex-row sm:flex-row flex-col">
          
          <div className="md:w-2/3 sm:w-2/3 w-full md:mx-16 sm:mx-16 mx-0 md:order-0 sm:order-0 order-1">

            <h2 className="md:ml-10 sm:ml-8 ml-8 md:mt-0 sm:mt-0 mt-8">
                {t("keyBenefits.section2.h2")}
            </h2>
            <p className="text-gray-6f md:px-10 px-8 md:mb-0 mb-10 md:mr-24 sm:mr-24 mr-0">
              {t("keyBenefits.section2.p1")}
            </p>
            <h2 className="md:ml-10 sm:ml-8 ml-8 md:mt-12">
                {t("keyBenefits.section2.h3")}
            </h2>
            <p className="text-gray-6f md:px-10 px-8 md:mb-0 mb-10 md:mr-24 sm:mr-24 mr-0">
              {t("keyBenefits.section2.p2")}
            </p>
            <h2 className="md:ml-10 sm:ml-8 ml-8 md:mt-12">
                {t("keyBenefits.section2.h4")}
            </h2>
            <p className="text-gray-6f md:px-10 px-8 md:mb-0 mb-10 md:mr-24 sm:mr-24 mr-0">
              {t("keyBenefits.section2.p3")}
            </p>

          </div>

          <div className="flex md:w-1/3 sm:w-1/3 md:-mt-64 sm:-mt-44 w-full md:order-1 sm:order-1 order-0">

            <img  src="/images/image 25.png"
                  alt="Technologie"
                  className="md:my-24 md:ml-0 sm:ml-0 ml-4 "
                />

          </div> 
        </div>
      </section> 
      
      {/* section 4 */}
      <section className="bg-violet-bohr-bis">
          
        <h2 className="text-white md:w-1/2 sm:w-1/2 w-full md:text-4xl sm:text-3xl text-2xl md:mt-0 sm:mr-24 mr-0 md:ml-16 sm:ml-16 ml-0 md:p-10 sm:p-auto p-8">
            <strong>{t("keyBenefits.section2.h1")}</strong>
        </h2>

        <div className="text-white flex md:flex-row sm:flex-row flex-col items-center content-center md:mx-48 sm:mx-48 mx-0">
          <div className="flex md:flex-row sm:flex-row flex-col">
            {/* First */}
            <div className="flex md:flex-col sm:flex-col flex-row md:mx-2 sm:mx-2 m-0 md:w-1/4 sm:w-1/4 w-full md:mb-8 sm:mb-8">

              <div className="bg-violet-bohr-claire flex md:flex-row sm:flex-row flex-col content-center justify-center items-center place-content-center md:w-full sm:w-full w-full md:my-4 sm:my-4 m-4 rounded-lg md:h-1/2 sm:h-1/2 " >
                <img
                  className="my-8 mx-4 md:w-18 md:h-9"
                  src="./images/photo.svg"
                  alt="Solaire"
                />
                <h1 className="text-center text-sm md:mr-4 sm:mr-4 mr-0">
                  Prévisions meteo
                </h1>            
              </div>

              <div className="bg-violet-bohr-claire flex md:flex-row sm:flex-row flex-col content-center justify-center items-center place-content-center md:w-full sm:w-full w-full md:my-4 sm:my-4 m-4 rounded-lg md:h-1/2 sm:h-1/2 " >
                <img
                  className="my-8 mx-4 md:w-16 md:h-7 w-12"
                  src="./images/hydro.svg"
                  alt="Hydro"
                />
                <h1 className="text-center text-sm md:mr-4 sm:mr-4 mr-0">
                  Moyens de productions
                </h1>            
              </div>

            </div>
            
            {/* Second */}
            <div className="flex md:flex-col sm:flex-col flex-row md:w-1/4 sm:w-1/4 md:mx-2 sm:mx-2 md:mb-8 sm:mb-8">
          
              <div className="bg-violet-bohr-obs w-full md:my-4 sm:my-4 m-4 md:h-1/2 sm:h-1/2 rounded-lg">
                <h1 className="text-sm text-center m-6">
                  Prévisions de production des actifs & des conditions de marché
                </h1>
              </div>

              <div className="bg-violet-bohr-obs w-full md:my-0 sm:my-0 m-4 md:h-1/2 sm:h-1/2 rounded-lg" >
                <h1 className="text-sm text-center m-6">
                  Connexion et modélisation du portefeuille d'actifs
                </h1>
              </div>

            </div>
            
            {/* Third */}
            <div className="flex md:flex-col sm:flex-col flex-row md:w-1/4 sm:w-1/4 md:mx-2 sm:mx-2 md:mb-8 sm:mb-8">

              <div className="bg-violet-bohr-obs m-4 rounded-lg w-full md:h-1/2 sm:h-1/2">
                <h1 className="text-sm text-center m-6">
                  Optimisation de la valeur via des strategies de marché
                </h1>
              </div>

              <div className="bg-violet-bohr-obs m-4 rounded-lg w-full md:h-1/2 sm:h-1/2">
                <h1 className="text-sm text-center m-6">
                  Gestion du dispatching et du pilotage
                </h1>
              </div>

            </div>

            {/* Fourth */}
            <div className="bg-white text-black md:w-1/4 sm:w-1/4 w-full rounded-lg md:ml-8 sm:ml-6 mx-auto my-4 md:mb-8 sm:mb-8mb-4">
              <h1 className="text-violet-bohr-dark text-sm text-center m-6">
                Accès aux marchés
              </h1>
              <div className="flex md:flex-col sm:flex-col flex-row my-8 content-center justify-center items-center place-content-center">
                <img
                    className="xl:w-34 xl:h-14 lg:w-34 lg:h-14 md:w-34 md:h-14 w-24 h-14 md:ml-0 sm:ml-0 ml-4"
                    src="./images/logo_epex.png"
                    alt="Epex Spot"
                />
                <img
                  className="my-4 xl:w-22 xl:h-4 lg:w-22 lg:h-4 md:w-22 md:h-4 w-20 h-6 md:ml-0 sm:ml-0 ml-4"
                  src="./images/logo_eex.png"
                  alt="EEX"
                />
              </div>
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
