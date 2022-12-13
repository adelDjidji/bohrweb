import { useTranslation } from "react-i18next"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"

const beOurClient = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title="Bohr energie" />
      {/* hero */}
      <section className="bg-hero-customer bg-no-repeat bg-cover h-410p flex flex-col justify-center mt-20 md:mt-0 bg-left--53/100-top-41/100">
        <h1 className="text-white md:text-6xl text-3xl md:ml-48 ml-10 font-semibold max-w-400 md:mb-5 pt-26 md:pt-0">
          {t("beOurClient.hero.l1")}
          <br />
          {t("beOurClient.hero.l2")}
          <br />
          {t("beOurClient.hero.l3")}
        </h1>
      </section>
      {/* section1 */}
      <section className="container mx-auto flex md:flex-row flex-col md:mt-20 p-8 text-gray-4a">
        <div
          className="flex-1 mb-10 flex flex-col items-center"
          data-sal="slide-right"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <h2 className="text-2xl md:text-3xl md:max-w-xs mb-7">
            {t("beOurClient.section1.h2")}
          </h2>
        </div>
        <div
          className="flex-1"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <p className="md:max-w-md">{t("beOurClient.section1.p")}</p>
          <a
            href="#"
            className="block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-52 mt-10 text-sm"
          >
            {t("beOurClient.section1.button")}
          </a>
        </div>
      </section>
      <Divider />
      <section>
        <div className="flex md:flex-row flex-col mt-6 md:p-8 p-2 md:justify-center">
          <div
            className="flex-1 md:max-w-md md:mx-4"
            data-sal="slide-right"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              src="./images/residential-complexes.jpg"
              alt="PRODUCTOS"
              className="brightness-140"
            />
            <h2 className="text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("beOurClient.section2.h2img1")}</strong>
            </h2>
            <p className="text-gray-222 mb-5">
              <span className="block mb-2">
                {t("beOurClient.section2.spanimg1")}
              </span>{" "}
              {t("beOurClient.section2.pimg1")}
            </p>
          </div>

          <div
            className="flex-1 md:max-w-md md:mx-4"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img src="./images/Independent_Businesses_c.jpg" alt="SERVICIOS" />
            <h2 className="text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("beOurClient.section2.h2img2")}</strong>
            </h2>
            <p className="text-gray-222">
              <span className="block mb-2">
                {t("beOurClient.section2.spanimg2")}
              </span>{" "}
              {t("beOurClient.section2.pimg2")}
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col mt-6 md:p-8 p-2 md:justify-center">
          <div
            className="flex-1 md:max-w-md md:mx-4"
            data-sal="slide-right"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img src="./images/wifi-small-business_c.jpg" alt="PRODUCTOS" />
            <h2 className="text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("beOurClient.section2.h2img3")}</strong>
            </h2>
            <p className="text-gray-222 mb-5">
              <span className="block mb-2">
                {t("beOurClient.section2.spanimg3")}
              </span>{" "}
              {t("beOurClient.section2.pimg3")}
            </p>
          </div>

          <div
            className="flex-1 md:max-w-md md:mx-4"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img src="./images/Industrial_Complexes_c.jpg" alt="SERVICIOS" />
            <h2 className="text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("beOurClient.section2.h2img4")}</strong>
            </h2>
            <p className="text-gray-222">
              <span className="block mb-2">
                {t("beOurClient.section2.spanimg4")}
              </span>
              {t("beOurClient.section2.pimg4")}
            </p>
          </div>
        </div>
      </section>

      <div className="w-full">
        <a
          href="#"
          className="text-center block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-5 py-3 px-4 w-40 md:mt-16 mt-12 mx-auto mb-10"
          data-sal="fade"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          {t("beOurClient.section2.button")}
        </a>
      </div>
    </Layout>
  )
}

export default beOurClient
