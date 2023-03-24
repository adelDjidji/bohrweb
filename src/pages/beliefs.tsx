import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"
import FooterImage from "../components/FooterImage"

const beliefs = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Seo title="Bohr energie" />
          
      {/* hero */}
      <section className="bg-hero-beliefs bg-cover h-520p flex">
        
        <div  className="md:w-2/3 sm:w-full w-full md:ml-24 sm:ml-24 ml-4 md:mt-12 sm:mt-12 mt-0">

          <h1 className="text-white font-semibold md:text-5xl text-3xl mt-24 ">
            {t("beliefs.hero.l1")}
          </h1>
          <p className="text-white md:text-xl sm:text-xl text-base md:mt-12 sm:mt-12 mt-12 md:w-2/3 sm:w-2/3 w-full"> 
            {t("beliefs.section1.p1")}
          </p>
          
        </div>
        
      </section>

      {/* section1 */}
      <section className="flex md:flex-row sm:flex-row flex-col md:mt-20 sm:mt-20 p-8">
        
        <div className="flex-1 mb-10 flex flex-col md:w-3/5 sm:w-3/5 w-full md:ml-16 sm:ml-16 ml-0 md:order-1 sm:order-1 order-2" >
          <h2 className="text-black md:text-4xl sm:text-4xl text-3xl md:mb-7 sm:mb-7 mb-7 md:mt-0 sm:mt-0 mt-12 md:w-3/4 sm:w-3/4 w-full">
            <strong>{t("beliefs.section1.h2")}</strong>
          </h2>
          <p className="text-gray-6f md:mr-24 sm:mr-24 mr-0">{t("beliefs.section1.p2")}</p>
        </div>

        <div className="md:w-2/5 sm:w-2/5 md:order-2 sm:order-2 order-1">
          <img
              src="/images/VALUES.jpg"
              alt="Values"
              width={350}
              className="md:-mt-8 sm:-mt-8 mt-0"
          />
        </div>

      </section>
   
      {/* section2 */}
      <section className="md:mt-12 p-8">

        <h2 className="md:text-4xl sm:text-4xl text-3xl mb-5 md:ml-16 sm:ml-16 ml-0">
            <strong>{t("beliefs.section3.h2")}</strong>
        </h2>
        <div className="flex flex-col items-center content-center">

          <div  className="flex md:flex-row sm:flex-row flex-col items-center md:mt-12" >
            <div className="flex flex-row items-center">
              <figure className="flex flex-col text-center sm:w-1/2 items-center ">
                <img
                    src="/images/julien_haure.png"
                    alt="CEO"
                    className="inline-grid rounded-full md:m-3 md:w-44 sm:w-44 w-32"
                />
                <figcaption className=""><strong>Julien Haure</strong></figcaption>
                <figcaption className="text-violet-bohr">CEO</figcaption>
                <figcaption className="text-gray-6f md:text-sm sm:text-sm text-xs md:w-2/3 sm:w-2/3 w-full ">
                  <q><i>Chez Bohr on n'a pas de pétrole mais on a des idées.</i></q>
                </figcaption>
              </figure>

              <figure className="flex flex-col text-center sm:w-1/2 items-center md:mt-2 sm:mt-2 mt-4">
                <img
                  src="/images/luis_urday.png"
                  alt="CTO"
                  className="inline-grid rounded-full md:m-3 md:w-40 sm:w-40 w-28"
                />
                              
                <figcaption className=""><strong>Luis Urday</strong></figcaption>
                <figcaption className="text-violet-bohr">CTO</figcaption>
                <figcaption className="text-gray-6f md:text-sm sm:text-sm text-xs md:w-2/3 sm:w-2/3 w-3/4">
                  <q><i>Algorithme: c'est le mot que j'utilise quand je ne veux pas expliquer ce que j'ai fait.</i></q>
                </figcaption>
              </figure>
            </div>
            
            <div className="flex flex-row items-center">
              <figure className="flex flex-col text-center sm:w-1/2 items-center md:mt-6 sm:mt-6 mt-0">
                <img
                  src="/images/julien_chollet.png"
                  alt="CFO"
                  className="inline-grid rounded-full md:mt-0 sm:mt-0 mt-4 md:m-3 md:w-44 sm:w-44 w-32"
                />
                <figcaption className=""><strong>Julien Chollet</strong></figcaption>
                <figcaption className="text-violet-bohr">CFO</figcaption>
                <figcaption className="text-gray-6f md:text-sm sm:text-sm text-xs md:m-3 sm:m-3 md:w-2/3 sm:w-2/3  w-full">
                  <q><i>Mon émission préférée: les chiffres et les lettres.</i></q>
                </figcaption>
              </figure>
              
              <figure className="flex flex-col text-center sm:w-1/2 items-center ">
                <img
                  src="/images/jp_mader.png"
                  alt="Advisor"
                  className="inline-grid rounded-full md:mt-0 sm:mt-0 mt-4 md:m-3 md:w-40 sm:w-40 w-28"
                />
                <figcaption className=""><strong>Jean-Pierre Mader</strong></figcaption>
                <figcaption className="text-violet-bohr">Senior Advisor</figcaption>
                <figcaption className="text-gray-6f md:text-sm sm:text-sm text-xs md:m-3 sm:m-3 md:w-2/3 sm:w-2/3  w-3/4">
                  <q><i>Chez Bohr, vous savez que vous vendez plus cher.</i></q>
                </figcaption>
              </figure>
            </div>
            
          </div>
        </div>

      </section>

      {/* section3 */}
      <section className="bg-violet-bohr-bis md:mt-20 md:p-8 sm:p-8 py-8">
        
        {/* Title */}
        <div className="text-white">
          <h2 className=" md:text-4xl  md:text-4xl text-3xl mb-5 md:ml-16 sm:ml-16 ml-8">
            <strong>{t("aboutus.section2.h2")}</strong>
          </h2>
          <p className="md:ml-16 sm:ml-16 ml-8 mb-8 md:mr-0 sm:mr-0 mr-8">
            {t("aboutus.section2.p")}
          </p>
        </div>
        
        {/* Cards */}
        <div className="flex md:flex-row sm:flex-row flex-col md:mr-0 sm:mr-0 mr-8">
          <div className="bg-violet-bohr-dark justify-center md:w-1/3 sm:w-1/3 w-full md:mx-4 sm:mx-4 m-4">
            
            <div className="flex-auto justify-center flex my-8">
              <img
                src="/images/biggear.png"
                alt="Gear"
                className="md:max-w-md max-w-full"
              />
            </div>

            <div className="text-white flex-auto flex flex-col justify-center">
              <h3 className="text-center text-xl md:text-3xl mb-5">
                <strong>{t("aboutus.section2.h3img1")}</strong>
              </h3>
              <p className="text-sm mx-8 mb-12">
                {t("aboutus.section2.pimg1")}
              </p>
            </div>

          </div>

          <div className="bg-violet-bohr-dark justify-center md:w-1/3 sm:w-1/3 w-full md:mx-4 sm:mx-4 m-4">
            <div className="flex-auto justify-center flex my-8">
              <img
                src="/images/bigfeuille.png"
                alt="Feuille"
                className="md:max-w-md max-w-full"
              />
            </div>

            <div className="text-white flex-auto flex flex-col justify-center">
              
              <h3 className=" text-center text-2xl md:text-3xl mb-5">
                <strong>{t("aboutus.section2.h3img3")} </strong>
              </h3>
              <p className="text-sm  mx-8 mb-12">
                {t("aboutus.section2.pimg3")}
                <br/>
                <br/>
                <ul>
                  <li>• {t("aboutus.section2.li1")} </li>
                  <li>• {t("aboutus.section2.li2")} </li>
                  <li>• {t("aboutus.section2.li3")} </li>
                  <li>• {t("aboutus.section2.li4")}</li>
                </ul>
              </p>
            </div>
            
          </div>

          <div className="bg-violet-bohr-dark justify-center md:w-1/3 sm:w-1/3 w-full md:mx-4 sm:mx-4 m-4" >
            
            <div className="flex-auto justify-center flex my-8">
              <img
                src="/images/lampe.png"
                alt="Lampe"
                className="md:max-w-md max-w-full"
              />
            </div>

            <div className="text-white flex-auto flex flex-col justify-center">
              <h3 className=" text-center text-2xl md:text-3xl mb-5 text-orange-ff7">
                <strong>{t("aboutus.section2.h3img4")}</strong>
              </h3>
              <p className="text-sm mx-8  mb-12">
                {t("aboutus.section2.pimg4")}

              </p>
            </div>

          </div>
        </div>
        
        {/* Vision */}
        <div className="flex md:flex-row sm:flex-row flex-col justify-center md:mt-24 sm:mt-24 mt-8" >
          <div className="text-white flex flex-col md:w-3/4 sm:w-3/4 w-full">
            <h3 className="md:text-xl sm:text-xl text-xl md:mb-5 sm:mb-5 mb-4 md:ml-16 sm:ml-16 ml-8">
              {t("aboutus.section2.h3img2")}
            </h3>
            <p className="md:text-3xl sm:text-3xl text-3xl mx-12 mr-12 md:ml-16 sm:ml-16 ml-8">
              {t("aboutus.section2.pimg2")}
            </p>
          </div>
          <div className="flex-auto flex md:order-3 sm:order-3 order-1 md:mt-0 sm:mt-0 mt-8 place-content-end md:mr-12 sm:mr-12 mr-4">
            <img
              src="/images/Vector3.svg"
              alt="vector3"
              width={50}
              className=""
            />
            <img
              src="/images/Vector2.svg"
              alt="vector2"
              width={50}
              className="ml-2"
            />
            <img
              src="/images/Vector1.svg"
              alt="vector1"
              width={50}
              className="ml-2"
            />
          </div>
        </div>
      </section>
      
      <FooterImage/>
    </Layout>
  )
}

export default beliefs
