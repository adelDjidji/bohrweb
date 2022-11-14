import { useTranslation } from "react-i18next"
import Seo from "../components/seo"
import Layout from "../components/Layout"
import Divider from "../components/Divider"
import ContactUs from "../components/ContactUs"
import { Link } from "gatsby"
import { useState } from "react"
import CookieConsent from "react-cookie-consent"
import "tw-elements"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
     // text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      // The axis for this scale is determined from the first letter of the id as `'x'`
      // It is recommended to specify `position` and / or `axis` explicitly.
      // type: 'time',
    //   time: {
    //     displayFormats: {
    //         quarter: 'MMM YYYY'
    //     }
    // }
    // ticks: {
    //   // Include a dollar sign in the ticks
    //   callback: function(value, index, ticks) {
    //     let d = new Date(value)
    //       return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes();
    //   }
    // }
    },
    y: {
        ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
                return '€' + value;
            }
        }
    }
}
}

const IndexPage = () => {
  const { t } = useTranslation()
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [toggle3, setToggle3] = useState(false)
  const [toggle4, setToggle4] = useState(false)
  const handleReadMore1 = () => setToggle1(!toggle1)
  const handleReadMore2 = () => setToggle2(!toggle2)
  const handleReadMore3 = () => setToggle3(!toggle3)
  const handleReadMore4 = () => setToggle4(!toggle4)

  var labels:any=[]
  const file = {} //require("./graphique-dayahead.json")
  var mx=0
  const borderColors=['rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)']
  var datasets = Object.values(file).map((it: any, idx: number) => {
    if(it.length>mx){
      labels = it.map((i: any) => {
        let d = new Date(i.start_time)
        if(d.getHours()==1) return ""
        return d.getDate()+'/'+d.getMonth()+1+'/'+d.getFullYear()//+' '+d.getHours()+':'+d.getMinutes();
      });
      mx=it.length
    }
    return {
      label: Object.keys(it[0])[1],
      data: it.map((i: any) => Object.values(i)[1]),
      borderColor: borderColors[idx],
      borderWidth: 1,
      //backgroundColor: "rgba(53, 162, 235, 0.5)",
    }
  })
  const data = {
    labels,
    datasets
  }
  console.log(data)
  const now = Date.now()
  const today = new Date()

  var start = new Date(today)
  start.setUTCHours(10, 0, 0, 0)

  const data_contract_response: any = {
    "Marché Spot (K€)": 0.07848,
    "Contrat H01 (K€)": 0.0842,
    "Contrat H07 (K€)": 0.09762,
    "Contrat H016 (K€)": 0.19538,
  }
  const data_table_dayahead = {
    Date: "2022/11/06",
    "Spot Base": 107.689583333333,
    "Spot Pointe": 107.996666666667,
  }

  const data_table_futures = [
    {
      Année: "2023",
      "Cal Base": 496.04,
      "Cal Pointe": 845.61,
    },
    {
      Année: "2024",
      "Cal Base": 280,
      "Cal Pointe": 413.09,
    },
    {
      Année: "2025",
      "Cal Base": 190.35,
      "Cal Pointe": 293.03,
    },
    {
      Année: "2026",
      "Cal Base": 152.18,
      "Cal Pointe": 257.08,
    },
    {
      Année: "2027",
      "Cal Base": 142.71,
      "Cal Pointe": null,
    },
    {
      Année: "2028",
      "Cal Base": 128.47,
      "Cal Pointe": null,
    },
  ]
  return (
    <Layout>
      <Seo title="Bohr energie" />

      {/* Banner */}
      <section className="mx-auto mb-20 sm:mt-0 mt-20">
        <Divider />
        <div
          id="carouselExampleCaptions"
          className="carousel slide relative w-screen"
          data-bs-pause={"hover"}
          data-bs-ride="carousel"
          data-bs-interval="10000"
        >
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner relative overflow-hidden md:pt-0 sm:pt-20 pt-0">
            <div className="carousel-item active relative float-left w-full">
              <img
                src="./images/hydro1_bannier.jpg"
                className="block w-full"
                alt="Hydraulique"
              />
              <div className="carousel-caption hidden md:block absolute text-center">
                <h5 className="text-2xl md:mt-48">{t("index.hero.c1")}</h5>
                <p>{t("index.hero.p1_0")}</p>
                <p>{t("index.hero.p1_1")}</p>
              </div>
            </div>

            <div className="carousel-item relative float-left w-full">
              <img
                src="./images/windFarm_banner1.jpg"
                className="block w-full"
                alt="WindFarm"
              />

              <div className="carousel-caption hidden md:block absolute text-center ">
                <h5 className="text-2xl md:mt-48">{t("index.hero.c2")}</h5>
                <p>{t("index.hero.p1_0")}</p>
                <p>{t("index.hero.p1_1")}</p>
              </div>
            </div>

            <div className="carousel-item relative float-left w-full">
              <img
                src="./images/solarPanel2_banner.jpg"
                className="block w-full"
                alt="Photovoltaique"
              />
              <div className="carousel-caption hidden md:block absolute text-center">
                <h5 className="text-2xl md:mt-48">{t("index.hero.c3")}</h5>
                <p>{t("index.hero.p1_0")}</p>
                <p>{t("index.hero.p1_1")}</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon inline-block bg-no-repeat"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

          <div className="carousel-caption absolute text-center sm:top-1/4 top-0 md:top-1/2 sm:w-2/3 w-full sm:left-auto left-0 flex md:block items-center justify-center">
            <h1 className="bg-black bg-opacity-0 text-white divide-x-2 md:text-5xl sm:text-2xl xs:text-xl text-md md:-ml-0 ml-0 md:-mt-32 -mt-0 font-semibold sm:mt-0 -mt-10 xs:leading-none leading-4">
              {t("index.hero.l1")}
              <br />
              {t("index.hero.l2")}
              <br />
              {t("index.hero.l3")}
              <br />
              {t("index.hero.l4")}
            </h1>
          </div>

          <div className="carousel-caption absolute text-center">
            <h1 className="text-white md:leading-tight md:text-3xl sm:text-2xl xs:text-lg text-sm md:-ml-0 ml-0 md:-mt-48 -mt-0 max-w-400 md:mb-5 pt-26 md:pt-0">
              {t("index.hero.h1")}
            </h1>
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="mt-20 text-gray-4a">
        <div className="w-screen text-center">
          <h3 className="relative md:text-1xl text-1xl">
            {t("index.section1.h1")}
          </h3>

          <div className="flex sm:flex-row flex-col justify-between mx-5 md:mx-20 lg:max-w-md lg:mx-auto lg:my-10 my-5 gap-5">
            {Object.keys(data_contract_response).map(key => (
              <div>
                <p>{key}</p>
                <h1 className="text-4xl mt-3">{data_contract_response[key]}</h1>
              </div>
            ))}
          </div>
          <h3 className="relative md:text-1xl text-1xl  md:mt-8 sm:mx-0 m-10">
            {t("index.section1.h2")}
          </h3>
          <Link
            to="/our-services"
            className="block text-white text-center bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-40 md:mt-4 mx-auto"
          >
            {t("index.section1.button")}
          </Link>
        </div>

        <div className="w-screen flex sm:flex-row flex-col justify-center md:mt-16">
          <div className="sm:w-3/5 h-300">
            <Line options={options} data={data} />
          </div>
          {/* <iframe className="w-full" src={"https://market.ctyanalytics.eu/d-solo/YamW_Pw7z/public?orgId=2&from=1641013200000&to=" + now + "&theme=light&panelId=2"} 
                      //width="650" 
                      height="300" 
                      frameborder="0">          
            </iframe> */}

          <div className="sm:w-2/5 h-300 text-center">
            <h3 className="relative md:text-1xl text-1xl md:ml-12 md:mt-0 sm:m-5">
              {t("index.section1.h3")}
            </h3>

            <div>
              <table className="table w-full">
                <thead className="bg-blue-100 h-10">
                  <tr>
                    <th>Date</th>
                    <th>Spot Base</th>
                    <th>Spot Pointe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-9 border-b border-gray-100">
                    <td>{data_table_dayahead["Date"]}</td>
                    <td>{data_table_dayahead["Spot Base"].toFixed(2)}</td>
                    <td>{data_table_dayahead["Spot Pointe"].toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <iframe src={"https://market.ctyanalytics.eu/d-solo/YamW_Pw7z/public?orgId=2&from=" + start.valueOf() + "&to=" + start.valueOf() + "&theme=light&panelId=11"} 
                      className="mx-auto sm:ml-0 md:ml-24 md:mt-4"
                      //width="450" 
                      height="100" 
                      frameborder="0">
              </iframe> */}

            <h3 className="relative md:text-1xl text-1xl md:ml-12 md:mt-4">
              {t("index.section1.h4")}
            </h3>

            <table className="table w-full">
              <thead className="bg-blue-100 h-10">
                <tr>
                  <th>Année</th>
                  <th>Cal Base</th>
                  <th>Cal Pointe</th>
                </tr>
              </thead>
              <tbody>
                {data_table_futures.map(item => (
                  <tr className="h-9 border-b border-gray-100">
                    <td>{item["Année"]}</td>
                    <td>{item["Cal Base"]}</td>
                    <td>{item["Cal Pointe"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <iframe src="https://market.ctyanalytics.eu/d-solo/YamW_Pw7z/public?orgId=2&from=1654156645111&to=1654178245111&theme=light&panelId=10" 
                      className="mx-auto sm:ml-0 md:ml-24 md:mt-4"
                      //width="450" 
                      height="200" 
                      frameborder="0"></iframe> */}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="container mx-auto mb-20">
        <Divider />
        <div className="flex md:flex-row flex-col md:p-8 p-2 md:justify-center">
          <h2 className="lg:w-1/3 text-2xl md:text-6xl mt-20 mb-10 text-gray-4a md:text-left text-center">
            <strong>{t("index.section2.h2")}</strong>
          </h2>
          <h3 className="lg:w-2/3 text-1xl md:text-justify md:ml-0 sm:ml-0 md:mt-20 md:text-1xl text-center md:p-0 p-3">
            {t("index.section2.h3")}
          </h3>
        </div>

        <div className="flex md:flex-row flex-col md:p-8 p-2 md:justify-center">
          <h2 className="text-2xl md:text-5xl text-gray-4a text-center">
            {" "}
            <strong>{t("index.section2.h4")}</strong>
          </h2>
        </div>

        <div className="flex md:flex-row flex-col mt-6 md:p-8 p-2 md:justify-center">
          <div
            className="flex-1 md:max-w-md md:mx-4 lg:my-0 my-10"
            data-sal="slide-right"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              src="./images/PRODUCTOS.jpg"
              alt="Products"
              width={300}
              className="md:ml-0 m-auto"
            />
            <h2 className="text-center text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("index.section2.h2Product1")}</strong>
            </h2>
            <p className="text-center text-gray-222">
              {t("index.section2.pProduct1")}
            </p>
          </div>

          <div className="md:max-w-xs">
            <img
              src="./images/plus.png"
              alt="plus"
              width={80}
              className="md:mt-12 mx-auto"
            />
          </div>

          <div
            className="flex-1 md:max-w-md md:mx-4 lg:my-0 my-10"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              src="./images/GREEN.jpg"
              alt="Environment"
              width={300}
              className="md:mt-14 md:ml-4 mx-auto"
            />
            <h2 className="text-center text-2xl my-8 text-gray-4a md:text-3xl md:mt-10">
              <strong>{t("index.section2.h2Product2")}</strong>
            </h2>
            <p className="text-center text-gray-222">
              {t("index.section2.pProduct2")}
            </p>
          </div>

          <div className="md:max-w-md">
            <img
              src="./images/plus.png"
              alt="plus"
              width={80}
              className="md:mt-12 mx-auto"
            />
          </div>

          <div
            className="flex-1 md:max-w-md md:mx-4 lg:my-0 my-10"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              src="./images/SERVICIOS.jpg"
              alt="Services"
              width={300}
              className="md:ml-0 mt-0 mx-auto"
            />
            <h2 className="text-center text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("index.section2.h2Product3")}</strong>
            </h2>
            <p className="text-center text-gray-222">
              {t("index.section2.pProduct3")}
            </p>
          </div>
        </div>

        {/* <Link
          to="/contactus"
          className="block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-40 md:mt-12 mx-auto "
          data-sal="fade"
          data-sal-delay="300"
          data-sal-easing="ease-out"
        >
          {t("index.section2.button")}
        </Link> */}
      </section>

      {/* Section 3 */}
      <section className="container mx-auto mb-20">
        <Divider />

        <div className="flex md:flex-row flex-col md:p-8 p-2 md:justify-center">
          <h2 className="lg:w-1/3 text-2xl md:text-6xl md:ml-0 mt-20 md:mr-0  mb-10 text-gray-4a md:text-left text-center">
            <strong>{t("index.section3.h2")}</strong>
          </h2>
          <h3 className="lg:w-2/3 text-1xl md:text-justify md:ml-10 sm:ml-0 md:mt-20 md:mr-20 md:text-1xl text-center">
            {t("index.section3.h3")}
          </h3>
        </div>

        <div className="flex md:flex-row flex-col mt-6 md:p-8 p-2 md:justify-center">
          <div
            className="flex-1 md:max-w-md md:mx-4 lg:my-0 my-10"
            data-sal="slide-right"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              className="md:px-14 px-10"
              src="./images/DIGITAL.jpg"
              alt="Digital innovation"
            />
            <h2 className="text-center text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("index.section3.h2img1")}</strong>
            </h2>
            <p className="text-center text-gray-222 md:mb-20">
              {t("index.section3.pimg1")}
            </p>
          </div>

          <div
            className="flex-1 md:max-w-md md:mx-4 lg:my-0 my-10"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              className="md:px-14 px-10"
              src="./images/MONEY.jpg"
              alt="Fair rates"
            />
            <h2 className="text-center text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("index.section3.h2img2")}</strong>
            </h2>
            <p className="text-center text-gray-222">
              {t("index.section3.pimg2")}
            </p>
          </div>

          <div
            className="flex-1 md:max-w-md md:mx-4 lg:my-0 my-10"
            data-sal="slide-left"
            data-sal-delay="300"
            data-sal-easing="ease-out"
          >
            <img
              className="md:px-14 px-10"
              src="./images/ATTENTION.jpg"
              alt="Personalized attention"
            />
            <h2 className="text-center text-2xl my-8 text-gray-4a md:text-3xl">
              <strong>{t("index.section3.h2img3")}</strong>
            </h2>
            <p className="text-center text-gray-222 md:mb-20">
              {t("index.section3.pimg3")}
            </p>
          </div>
        </div>

        <Link
          to="/our-services"
          className="block text-white text-center bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-40 md:mt-0 mx-auto"
        >
          {t("index.section3.button")}
        </Link>

        <CookieConsent
          enableDeclineButton
          declineButtonText="Je refuse"
          flipButtons
          location="bottom"
          buttonText="J'accepte"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
          expires={150}
        >
          <p style={{ textAlign: "justify" }}>
            Afin d'améliorer nos services en continu et de vous proposer une
            expérience qualitative, nous et nos partenaires utilisons des
            cookies à des fins de mesure d’audience, de personnalisation des
            contenus et de publicité ciblée en ligne y compris de partenaires
            tiers. Nous utilisons également des cookies nécessaires au bon
            fonctionnement de notre site internet.{" "}
          </p>
        </CookieConsent>
      </section>
    </Layout>
  )
}

export default IndexPage
