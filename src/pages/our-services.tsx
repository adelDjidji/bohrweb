import { useTranslation } from "react-i18next"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"
import ContactUs from "../components/ContactUs"
import { Link } from "gatsby"

const openSolutions = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title="Bohr energie" />

      {/* hero */}
      <section className="flex bg-hero-customer bg-cover h-410p">
        
        <div className="md:w-2/3 sm:w-full w-full md:ml-24 sm:ml-8 ml-4 md:mt-0 sm:mt-0 mt-0">

          <h1 className="text-white font-semibold md:text-5xl text-3xl mt-24 ">
            {t("beOurClient.hero.l1")}
          </h1>
          <p className="text-white md:text-xl sm:text-xl text-base md:mt-12 sm:mt-12 mt-12 md:w-2/3 sm:w-2/3 w-full"> 
            {t("contactUs.section1.text")}
          </p>
          
        </div>
        
      </section>

      {/* section2 */}
      <section className="md:mx-auto flex md:flex-row flex-col md:p-8 justify-center">
        <ContactUs />
      </section>
      
      {/* section3 */}
      <section className="justify-center">

          <div className="w-screen md:h-96 sm:h-96 h-screen flex md:justify-center sm:justify-center">
            
            <div className="absolute bg-white rounded-lg md:mt-6 sm:mt-6 mt-24 m-4">
              <h2 className="text-center text-black text-xl ml-8">
                <strong>{t("contactUs.hero.l2")}</strong>
              </h2>

              <p className="text-black text-base ml-4 md:mt-4 sm:mt-4 mt-4 mx-4">
                <b>Tel:</b> 08 05 03 38 00
                <br />
                <b>Mail:</b> contact@bohr-energie.fr
                <br />
                <b>Address:</b> 55 Av. Louis Breguet, 31400 Toulouse
              </p>
            </div>

            <iframe
              src="https://maps.google.com/maps?q=55%Av%20Louis%20Breguet&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="flex w-full h-full"
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
          
      </section>
      
    </Layout>
  )
}

export default openSolutions
