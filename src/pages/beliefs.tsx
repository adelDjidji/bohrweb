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
      <section className="bg-hero-beliefs bg-cover h-580p flex flex-col justify-center mt-20 md:mt-0 bg-left--53/100-top-41/100">
        
        <div  className="w-2/3 ml-24">

          <h1 className="text-white md:text-5xl text-2xl font-semibold">
            {t("beliefs.hero.l1")}
          </h1>
          <p className="text-white text-xl md:mt-12 w-2/3"> 
            {t("beliefs.section1.p1")}
          </p>
          
        </div>
        
      </section>

      {/* section1 */}
      <section className="flex md:flex-row flex-col md:mt-20 p-8">
        
        <div className="flex-1 mb-10 flex flex-col w-3/5 ml-16" >
          <h2 className="text-black text-2xl md:text-4xl mb-7 w-3/4 ">
            {t("beliefs.section1.h2")}
          </h2>
          <p className="text-gray-6f mr-24">{t("beliefs.section1.p2")}</p>
        </div>

        <div className="md:w-2/5">
          <img
              src="/images/VALUES.jpg"
              alt="Values"
              width={350}
              className="-mt-8"
          />
        </div>

      </section>
   
      {/* section2 */}
      <section className="md:mt-12 p-8">
        <h2 className="text-3xl md:text-3xl mb-5 ml-16">
            <strong>{t("beliefs.section3.h2")}</strong>
        </h2>
        <div className="flex flex-col items-center content-center">

          <div  className="flex md:flex-row flex-col items-center md:mt-12" >

            <figure className="text-center sm:w-1/4 content-center">
              <img
                  src="/images/julien_haure.png"
                  alt="CEO"
                  width={190}
                  className="inline-grid rounded-full md:m-3"
              />
              <figcaption className=""><strong>Julien Haure</strong></figcaption>
              <figcaption className="text-violet-bohr">CEO</figcaption>
              <figcaption className="text-gray-6f text-sm m-3 w-2/3">
                <q><i>Chez Bohr on n'a pas de pétrole mais on a des idées.</i></q>
              </figcaption>
            </figure>

            <figure className="text-center sm:w-1/4">
              <img
                src="/images/luis_urday.png"
                alt="CTO"
                width={170}
                className="inline-grid rounded-full md:m-3"
              />
                            
              <figcaption className=""><strong>Luis Urday</strong></figcaption>
              <figcaption className="text-violet-bohr">CTO</figcaption>
              <figcaption className="text-gray-6f text-sm m-3 w-2/3">
                <q><i>Algorithme: c'est le mot que j'utilise quand je ne veux pas expliquer ce que j'ai fait.</i></q>
              </figcaption>
            </figure>

            <figure className="text-center sm:w-1/4">
              <img
                  src="/images/julien_chollet.png"
                  alt="CFO"
                  width={200}
                  className="inline-grid md:m-3 rounded-full"
                />
              <figcaption className=""><strong>Julien Chollet</strong></figcaption>
              <figcaption className="text-violet-bohr">CFO</figcaption>
              <figcaption className="text-gray-6f text-sm m-3 w-2/3">
                <q><i>Mon émission préférée: les chiffres et les lettres.</i></q>
              </figcaption>
            </figure>
            
            <figure className="text-center sm:w-1/4">
              <img
              src="/images/jp_mader.png"
              alt="Advisor"
              width={155}
              className="inline-grid md:m-3"
              />
              <figcaption className=""><strong>Jean-Pierre Mader</strong></figcaption>
              <figcaption className="text-violet-bohr">Senior Advisor</figcaption>
              <figcaption className="text-gray-6f text-sm m-3 w-2/3">
                <q><i>Chez Bohr, vous savez que vous vendez plus cher.</i></q>
              </figcaption>
            </figure>
    
          </div>
        </div>

      </section>

      {/* section3 */}
      <section className="bg-violet-bohr-bis md:mt-20 p-8 mx-auto">
        
        {/* Title */}
        <div className="text-white">
          <h2 className="text-2xl md:text-3xl mb-5 ml-16">
            <strong>{t("aboutus.section2.h2")}</strong>
          </h2>
        </div>
        
        {/* Cards */}
        <div className="flex md:flex-row flex-col">
          <div className="bg-violet-bohr-dark justify-center w-1/3 mx-4">
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
              <p className="mx-8">
                {t("aboutus.section2.pimg1")}
              </p>
            </div>
          </div>

          <div className="bg-violet-bohr-dark justify-center w-1/3 mx-4">
            <div className="flex-auto justify-center flex my-8">
              <img
                src="/images/bigfeuille.png"
                alt="Feuille"
                className="md:max-w-md max-w-full"
              />
            </div>

            <div className="text-white flex-auto flex flex-col justify-center">
              
              <h3 className=" text-center text-2xl md:text-3xl mb-5">
                <strong>{t("aboutus.section2.h3img2")}</strong>
              </h3>
              <p className="mx-8">
                {t("aboutus.section2.pimg2")}
              </p>
            </div>
            
          </div>

          <div className="bg-violet-bohr-dark justify-center w-1/3 mx-4" >
            <div className="flex-auto justify-center flex my-8">
              <img
                src="/images/lampe.png"
                alt="Lampe"
                className="md:max-w-md max-w-full"
              />
            </div>
            <div className="text-white flex-auto flex flex-col justify-center">
              <h3 className=" text-center text-2xl md:text-3xl mb-5 text-orange-ff7">
                <strong>{t("aboutus.section2.h3img3")}</strong>
              </h3>
              <p className="mx-8">
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
        </div>
        
        {/* Vision */}
        <div className="flex justify-center mt-24" >
          <div className="text-white flex-auto flex w-3/4 ">
            
            <h3 className="text-2xl md:text-4xl mb-5 ">
              <strong>{t("aboutus.section2.h3img4")} </strong>
            </h3>
            <p className=" mx-12 mr-12">
              {t("aboutus.section2.pimg4")}
            </p>
          </div>
          <div className="flex-auto flex order-1 md:order-3">
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
