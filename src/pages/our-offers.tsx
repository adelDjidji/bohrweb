import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"

const openSolutions = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title="Bohr energie" />
      {/* hero */}
      <section className="bg-hero-solutions bg-no-repeat bg-cover md:h-410p h-370p flex flex-col justify-center mt-20 md:mt-0 bg-left--53/100-top-41/100">
        <h1 className="text-white md:text-6xl text-3xl md:ml-48 ml-10 font-semibold max-w-400 md:mb-5 pt-26 md:pt-0">
          {t("openSolutions.hero.l1")}
          <br />
          {t("openSolutions.hero.l2")}
          <br />
          {t("openSolutions.hero.l3")}
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
          <div>
            <strong className="text-2xl md:text-3xl md:max-w-xs mb-7 block">
              {t("openSolutions.section1.text")}
            </strong>
            <h2 className="text-2xl md:text-3xl md:max-w-xs block">
              {t("openSolutions.section1.h2")}
            </h2>
          </div>
        </div>
        <div
          className="flex-1"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <p className="md:max-w-md">{t("openSolutions.section1.p")}</p>
          <Link
            to="/contactus"
            className="text-center block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-28 mt-10 text-sm"
          >
            {t("openSolutions.section1.button")}
          </Link>
        </div>
      </section>

      <Divider />
      {/* section2 */}
      <section className="container md:mt-20 p-8 text-gray-4a mx-auto">
        <div
          className="flex md:flex-row flex-col justify-center mr-7 md:mb-20 mb-5"
          data-sal="slide-right"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex mr-7">
            <img
              src="/images/clavier.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
          <div className="flex-auto flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
              <strong>{t("openSolutions.section2.h3img1")}</strong>
            </h3>
            <p className="max-w-sm text-gray-4a">
              <strong className="block mb-5">
                {t("openSolutions.section2.pimg1")}
              </strong>
              <ul className="list-disc pl-8">
                <li>{t("openSolutions.section2.li1img1")}</li>
                <li>{t("openSolutions.section2.li2img1")}</li>
                <li>{t("openSolutions.section2.li3img1")}</li>
                <li>{t("openSolutions.section2.li4img1")}</li>
                <li>{t("openSolutions.section2.li5img1")}</li>
              </ul>

              <Link
                to="/"
                className="text-orange-ff7 underline mt-5 block hover:opacity-80"
              >
                {t("openSolutions.section2.link")}
              </Link>
            </p>
          </div>
        </div>

        <div
          className="flex md:flex-row flex-col justify-center mr-7 md:mb-20 mb-5"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex mr-7">
            <img
              src="/images/variable_price.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
          <div className="flex-auto flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
              <strong>{t("openSolutions.section2.h3img2")}</strong>
            </h3>
            <p className="max-w-sm text-gray-4a">
              <strong className="block mb-5">
                {t("openSolutions.section2.pimg2")}
              </strong>
              <ul className="list-disc pl-8">
                <li>{t("openSolutions.section2.li1img2")}</li>
                <li>{t("openSolutions.section2.li2img2")}</li>
                <li>{t("openSolutions.section2.li3img2")}</li>
                <li>{t("openSolutions.section2.li4img2")}</li>
                <li>{t("openSolutions.section2.li5img2")}</li>
              </ul>

              <Link
                to="/"
                className="text-orange-ff7 underline mt-5 block hover:opacity-80"
              >
                {t("openSolutions.section2.link")}
              </Link>
            </p>
          </div>
        </div>

        <div
          className="flex md:flex-row flex-col justify-center mr-7 md:mb-20 mb-5"
          data-sal="slide-right"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div className="flex-auto justify-end flex mr-7">
            <img
              src="/images/bourse.jpg"
              alt="SELLO"
              className="md:max-w-md max-w-full"
            />
          </div>
          <div className="flex-auto flex flex-col justify-center">
            <h3 className="text-2xl md:text-4xl mb-5 text-orange-ff7">
              <strong>{t("openSolutions.section2.h3img3")}</strong>
            </h3>
            <p className="max-w-sm text-gray-4a">
              <strong className="block mb-5">
                {t("openSolutions.section2.pimg3")}
              </strong>
              <ul className="list-disc pl-8">
                <li>{t("openSolutions.section2.li1img3")}</li>
                <li>{t("openSolutions.section2.li2img3")}</li>
                <li>{t("openSolutions.section2.li3img3")}</li>
                <li>{t("openSolutions.section2.li4img3")}</li>
              </ul>

              <Link
                to="/"
                className="text-orange-ff7 underline mt-5 block hover:opacity-80"
              >
                {t("openSolutions.section2.link")}
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Divider />
      {/* section3 */}

      <Divider />
      {/* section5 */}
      <section className="container mx-auto flex md:flex-row flex-col md:mt-20 p-8 text-gray-4a">
        <div
          className="flex-1 mb-10 flex flex-col items-center"
          data-sal="slide-right"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <div>
            <strong className="text-2xl md:text-3xl md:max-w-xs mb-7 block">
              {t("openSolutions.section5.text")}
            </strong>
            <h2 className="text-2xl md:text-3xl md:max-w-xs block">
              {t("openSolutions.section5.h2")}
            </h2>
          </div>
        </div>
        <div
          className="flex-1 mb-10"
          data-sal="slide-left"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          <p className="max-w-md">{t("openSolutions.section5.p")}</p>
          <Link
            to="/contactus"
            className="text-center block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-28 mt-10 text-sm"
          >
            {t("openSolutions.section5.button")}
          </Link>
        </div>
      </section>
      {/* section6 */}
      <section className="container mx-auto mb-20 text-gray-222">
        <div className="grid md:grid-cols-3 grid-cols-1">
          <div className="text-center mx-auto max-w-xs mb-3">
            <img src="/images/1.jpg" alt="1" className="mb-5 max-w-xs" />
            <h3 className="mb-3">
              <strong>{t("openSolutions.section6.h3img1")}</strong>
            </h3>
            <p>{t("openSolutions.section6.pimg1")}</p>
          </div>
          <div className="text-center mx-auto">
            <img src="/images/2.jpg" alt="2" className="mb-5" />
            <h3 className="mb-3">
              <strong>{t("openSolutions.section6.h3img2")}</strong>
            </h3>
            <p>{t("openSolutions.section6.pimg2")}</p>
          </div>
          <div className="text-center mx-auto max-w-xs mb-3">
            <img src="/images/3.jpg" alt="3" className="mb-5 max-w-xs" />
            <h3 className="mb-3">
              <strong>{t("openSolutions.section6.h3img3")}</strong>
            </h3>
            <p>{t("openSolutions.section6.pimg3")}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="text-center mx-auto max-w-xs mb-3">
            <img src="/images/4.jpg" alt="4" className="mb-5 max-w-xs" />
            <h3 className="mb-3">
              <strong>{t("openSolutions.section6.h3img4")}</strong>
            </h3>
            <p>{t("openSolutions.section6.pimg4")}.</p>
          </div>
          <div className="text-center mx-auto max-w-xs mb-3">
            <img src="/images/5.jpg" alt="5" className="mb-5 max-w-xs" />
            <h3 className="mb-3">
              <strong>{t("openSolutions.section6.h3img5")}</strong>
            </h3>
            <p>{t("openSolutions.section6.pimg5")}</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default openSolutions
