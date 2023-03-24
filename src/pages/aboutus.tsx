import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"

const aboutus = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title="Bohr energie" />

      {/* hero */}
      <section className="bg-hero-aboutus bg-no-repeat bg-cover md:h-410p h-370p flex flex-col justify-center mt-20 md:mt-0 bg-left--53/100-top-41/100">
        <h1 className="text-white md:text-6xl text-3xl md:ml-48 ml-10 font-semibold max-w-400 md:mb-5 pt-26 md:pt-0">
          {t("aboutus.hero.l1")}
          <br />
          {t("aboutus.hero.l2")}
          <br />
          {t("aboutus.hero.l3")}
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
            {t("aboutus.section1.h2")}
          </h2>
          <strong className="text-2xl md:text-3xl md:max-w-xs">
            {t("aboutus.section1.text")}
          </strong>
          <img src="/images/SELLO.jpg" alt="SELLO" className="max-w-xs" />
        </div>
        
        <div
          className="flex-1"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <p className="md:max-w-md md:mt-10">{t("aboutus.section1.p")}</p>
          <Link
            to="/our-services"
            className="block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-52 mt-10 text-sm"
          >
            {t("aboutus.section1.button")}
          </Link>
        </div>
      </section>
      <Divider />

      {/* section2 */}
      <section
        className="container md:mt-20 p-8 text-gray-4a mx-auto"
        data-sal="fade"
        data-sal-delay="300"
        data-sal-easing="ease-out"
      >
        <h2 className="text-2xl md:text-3xl mb-5 text-center">
          <strong>{t("aboutus.section2.h2")}</strong>
        </h2>
        <p className="md:mt-10 text-center">{t("aboutus.section2.p")}</p>
      </section>

      <section className="container md:mt-20 p-8 text-gray-4a mx-auto">
        <div
          className="flex md:flex-row flex-col justify-center mr-7"
          data-sal="slide-right"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex">
            <img
              src="/images/MISION.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
          <div className="flex-auto flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
              <strong>{t("aboutus.section2.h3img1")}</strong>
            </h3>
            <p className="max-w-sm text-gray-4a">
              {t("aboutus.section2.pimg1")}
            </p>
          </div>
        </div>

        <div
          className="flex md:flex-row flex-col justify-center"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex items-center order-2">
            <p className="max-w-md text-gray-4a">
              <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
                <strong>{t("aboutus.section2.h3img2")}</strong>
              </h3>
              {t("aboutus.section2.pimg2")}
            </p>
          </div>
          <div className="flex-auto justify-start flex order-1 md:order-3">
            <img
              src="/images/VISION.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
        </div>

        <div
          className="flex md:flex-row flex-col justify-center mr-7"
          data-sal="slide-right"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex md:mr-10">
            <img
              src="/images/VALUES.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
          <div className="flex-auto flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
              <strong>{t("aboutus.section2.h3img3")}</strong>
            </h3>
            <p className="max-w-sm text-gray-4a">
              {t("aboutus.section2.pimg3")}

              <ul>
                <li>• {t("aboutus.section2.li1")} </li>
                <li>• {t("aboutus.section2.li2")} </li>
                <li>• {t("aboutus.section2.li3")} </li>
                <li>• {t("aboutus.section2.li4")}</li>
              </ul>
            </p>
          </div>
        </div>

        <div
          className="flex md:flex-row flex-col justify-center"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex items-center order-2">
            <p className="max-w-md text-gray-4a">
              <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
                <strong>{t("aboutus.section2.h3img4")} </strong>
              </h3>
              {t("aboutus.section2.pimg4")}
            </p>
          </div>
          <div className="flex-auto justify-start flex order-1 md:order-3">
            <img
              src="/images/PHILOSOPHY.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
        </div>
      </section>

      <div className="w-full">
        <Link
          to="/contactus"
          className="text-center block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-5 py-3 w-40 md:mt-16 mt-12 mx-auto mb-10"
          data-sal="fade"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          {t("aboutus.section2.button")}
        </Link>
      </div>
    </Layout>
  )
}
export default aboutus
