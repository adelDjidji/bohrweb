import { useTranslation } from "react-i18next";
import Seo from "../components/seo";
import Layout from "../components/Layout";
import Divider from "../components/Divider";
import ContactUs from "../components/ContactUs";
import FooterImage from "../components/FooterImage"
import { Link } from "gatsby";
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";
import "tw-elements";
import jsonData from "./graphique-dayahead.json";
import { LineChart, IndexChart } from "./lineCharFunc";
import Spiner from "../components/spiner"

const IndexPage = () => {
  const { t } = useTranslation();

  // line chart related all data here..
  const [loadingChart, setloadingChart] = useState(false);

  const data_contract_response_sample: any = {
    "Marché Spot": 0,
    "Contrat H01": 0,
    "Contrat H07 ": 0,
    "Contrat H016": 0,
  };
  const data_table_dayahead_sample = {
    Date: "2022/11/06",
    "Spot Base": 0,
    "Spot Pointe": 0,
  };

  const data_table_futures_sample = [
    {
      Année: "2023",
      "Cal Base": 0,
      "Cal Pointe": 0,
    },
    {
      Année: "2024",
      "Cal Base": 0,
      "Cal Pointe": 0,
    },
    {
      Année: "2025",
      "Cal Base": 0,
      "Cal Pointe": 0,
    },
    {
      Année: "2026",
      "Cal Base": 0,
      "Cal Pointe": 0,
    },
    {
      Année: "2027",
      "Cal Base": 0,
      "Cal Pointe": null,
    },
    {
      Année: "2028",
      "Cal Base": 0,
      "Cal Pointe": null,
    },
  ];
  const [data_contract_response, setData_contract] = useState(
    data_contract_response_sample
  );
  const [data_table_dayahead, setData_table_dayahead] = useState(
    data_table_dayahead_sample
  );
  const [data_table_futures, set_data_table_futures] = useState(
    data_table_futures_sample
  );

  const [loading_comparison, setLoadingComp] = useState(false);
  const [loading_graph, setLoadingGraph] = useState(false);
  const [loading_tableahead, setLoadingTableahead] = useState(false);
  const [loading_tablefuturs, setLoadingTablefuturs] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const api_url = process.env.GATSBY_API_URL
      "https://0c87-196-179-246-130.eu.ngrok.io"; //"localhost:8088"
      var start_date = new Date(new Date().getFullYear(), 0, 1);
      var end_date = new Date()

      const Url_contract_comparison =
        api_url +
        "statistic/contract-comparison?spotMarketCountry=france&spotMarketProvider=entsoe&spotMarketStartTime=" + start_date.toISOString().split('T')[0] + "&spotMarketEndTime=" + end_date.toISOString().split('T')[0] + "&contractStartTime="+start_date.toISOString().split('T')[0]+"&contractEndTime=" + end_date.toISOString().split('T')[0];
      const Url_graphique =
        api_url +
        "statistic/graphique-dayahead?spotMarketPriceCountry=france&spotMarketPriceProvider=entsoe&spotMarketPriceStartTime="+start_date.toISOString().split('T')[0]+"&spotMarketPriceEndTime="+end_date.toISOString().split('T')[0];
      const Url_table_dayahead =
        api_url +
        "statistic/table-dayahead?spotMarketPriceCountry=france&spotMarketPriceProvider=entsoe&spotMarketPriceStartTime="+start_date.toISOString().split('T')[0];
      const Url_table_futurs =
        api_url + "statistic/table-futures?maxYear=2025";

      try {
        setLoadingComp(true)
        setLoadingGraph(true)
        setLoadingTableahead(true)
        setLoadingTablefuturs(true)
        const contract = await (
          await fetch(Url_contract_comparison, {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          })
        ).json();
        setLoadingComp(false)
        const chartData = await (
          await fetch(Url_graphique, {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          })
        ).json();
        
        const table_ahead = await (
          await fetch(Url_table_dayahead, {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          })
        ).json();
        setLoadingTableahead(false)
        const table_futurs = await (
          await fetch(Url_table_futurs, {
            headers: {
              "ngrok-skip-browser-warning": "anyvalue",
            },
          })
        ).json();
        setLoadingTablefuturs(false)
        setData_contract(contract);
        setData_table_dayahead(table_ahead);
        set_data_table_futures(table_futurs);

        var dataArr = [
          ...chartData.spotMarketPrice,
          ...chartData.H01ContractRate,
          ...chartData.H07ContractRate,
          ...chartData.H16ContractRate,
        ];

        dataArr = dataArr.map((item) => {
          let val = {};
          if (Object.keys(item).includes("Tarif contrat H01")) {
            val = {
              value: item["Tarif contrat H01"],
              type: "Tarif contrat H01",
            };
          } else if (Object.keys(item).includes("Tarif contrat H07")) {
            val = {
              value: item["Tarif contrat H07"],
              type: "Tarif contrat H07",
            };
          } else if (Object.keys(item).includes("Tarif contrat H16")) {
            val = {
              value: item["Tarif contrat H16"],
              type: "Tarif contrat H16",
            };
          }else if (Object.keys(item).includes("Prix marché Spot")) {
            val = {
              value: item["Prix marché Spot"],
              type: "Prix marché Spot",
            };
          }
          return {
            ...item,
            ...val,
          };
        });
        LineChart(dataArr, {
          x: (d) => new Date(d.start_time),
          y: (d) => d.value,
          z: (d) => d.type,
          yLabel: "Prix (€)",
          width: 500,
          height: 500,
          //color: "steelblue",
        });
        setLoadingGraph(false)
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  var labels: any = [];
  const file = {}; //require("./graphique-dayahead.json")
  var mx = 0;
  const borderColors = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const now = Date.now();
  const today = new Date();

  var start = new Date(today);
  start.setUTCHours(10, 0, 0, 0);

  return (
    <Layout>
      <Seo title="Bohr energie" />

      {/* Banner */}
      <section className="mx-auto mb-20 sm:mt-0 h-screen">
        <div className="relative w-screen">
 
          <div className="h-screen w-screen">
              <img
                src="./images/Hero.png"
                className="h-full w-full md:object-fill sm:object-none object-none"
                alt="Hero"
              />
          </div>

          <div className="carousel-caption absolute text-center sm:top-1/4 top-1/4 md:top-1/4 sm:w-2/3 w-2/3 md:-mt-16 sm:left-auto md:block justify-center">
            <h1 className="text-white md:text-3xl sm:text-xl xs:text-lg text-sm md:mb-8 mb-8">
              {t("index.hero.h1")}
            </h1>
            <h1 className="font-CamptonBold text-white md:text-5xl sm:text-3xl xs:text-2xl text-2xl font-semibold sm:mt-10 -mt-0 xs:leading-none leading-4">
              {t("index.hero.l1")}
              <br />
              {t("index.hero.l2")}
              <br />
              {t("index.hero.l3")}
              <br />
              {t("index.hero.l4")}
            </h1>

            <div className="flex md:flex-row sm:flex-row flex-row mt-12 md:p-8 p-2 md:justify-center sm:justify-center justify-center">

              <div className="text-xs md:text-center md:justify-center text-center justify-center">
                <img
                  className="md:px-14 sm:px-6 px-0 md:h-9 h-6 mx-auto"
                  src="./images/hydro.svg"
                  alt="Hydro"
                />
                <p className="text-center md:my-4 my-2 md:ml-0">
                  Hydroélectrique
                </p>
              </div>

              <div className="text-xs md:ml-4 ml-4 md:justify-center text-center justify-center">
                <img
                  className=" md:px-14 sm:px-6 px-0 md:w-18 md:h-9 h-6 mx-auto"
                  src="./images/eolien.svg"
                  alt="Eolien"
                />
                <p className="text-center md:my-4 my-2">
                  Eolien
                </p>
                
              </div>

              <div className="text-xs md:ml-4 ml-4 md:text-center justify-center items-center">
                <img
                  className=" md:px-14 sm:px-6 px-0 md:w-18 md:h-9 h-6 mx-auto"
                  src="./images/photo.svg"
                  alt="Solaire"
                />
                <p  className="text-center md:my-4 my-2">
                  Photovoltaique
                </p>
                 
              </div>

              <div className="text-xs md:ml-4 ml-4 md:text-center justify-center items-center">
                <img
                  className=" md:px-14 sm:px-6 px-0 md:w-18 md:h-9 h-6 mx-auto"
                  src="./images/bat.svg"
                  alt="Hydro"
                />
                <p  className="text-center md:my-4 my-2">
                  Batterie
                </p>
                
              </div>
            </div>

            <Link
              to="/our-services"
              className="block text-white text-center bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-60 md:mt-4 sm:mt-8 mt-12 mx-auto"
            >
              {t("index.section1.button")}
            </Link>
          </div>
          
        </div>
      </section>

      {/* Section 1 */}
      <section className="-mt-24 bg-gray-bg grid relative content-center items-center place-items-center place-content-center">
        {/* Card */}
        <div className="bg-violet-bohr-bis md:w-3/4 w-full md:-mt-36 sm:mt-0 -mt-32 md:rounded-lg">
          <h3 className="text-white text-center relative md:text-4xl text-2xl md:mt-12 mt-8">
            {t("index.section1.h1")}
          </h3>
          <h3 className="text-white text-center relative md:text-1xl text-1xl mb-16">
            {t("index.section1.h1_2")}
          </h3>

          {!loading_comparison && (
            <div className="text-white flex sm:flex-row mx-8 flex-col justify-between   lg:my-10 my-5 items-center lg:items-end">
              {Object.keys(data_contract_response).map((key) => (
                <div className="md:ml-8">
                  <div className="flex flex-row"> 
                    <h1 className="md:text-5xl text-3xl">
                      {data_contract_response[key]}
                    </h1>
                    <p className="">(K€)</p>
                  </div>
                  
                  <p className="mb-12 text-center">{key}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <div className="flex justify-center w-screen relative text-center mt-12">
          
          <h2 className="text-black md:text-1xl text-2xl md:text-4xl md:mt-8 sm:mx-0 m-10 md:w-1/2 w-3/4">
            <strong>{t("index.section1.h2")}</strong>
          </h2>

        </div>
        
        {/* Graphiques + Tables */}
        <div className="flex sm:flex-row flex-col justify-center md:mt-12 w-3/4">
          
          {/* D3 Line chat */}      
          <div className="bg-white rounded-lg mr-8 md:w-2/5 sm:w-3/5 w-full md:mb-24 mb-8" id="chart123456">
            <h2 className="md:ml-8 md:my-4 md:text-left text-center text-xl">
              Prix du marché
            </h2>

            <div className="">
              {
                loading_graph && <Spiner/>
              }
            </div>
            
          </div>

         {/* Tables */}
          <div className="md:w-2/5 sm:w-2/5 w-full">

            <div className="bg-white rounded-lg h-1/5 sm:mb-8">
              <h3 className="md:text-xl md:ml-4">
                {t("index.section1.h3")}
              </h3>
              <div className="m-4">
                {!loading_tableahead && (
                  <table className="table w-full">
                    <thead className="bg-gray-bg text-xs h-10">
                      <tr>
                        <th>Date</th>
                        <th>Spot Base</th>
                        <th>Spot Pointe</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center h-9 border-b border-gray-100">
                        <td>{data_table_dayahead["Date"]}</td>
                        <td>{data_table_dayahead["Spot Base"] ? parseFloat(data_table_dayahead["Spot Base"]).toFixed(2) : "-"}</td>
                        <td>{data_table_dayahead["Spot Pointe"] ? parseFloat(data_table_dayahead["Spot Pointe"]).toFixed(2) : "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg h-2/6">
              <h3 className="relative md:text-xl md:ml-4 sm:mt-4 mt-5">
                {t("index.section1.h4")}
              </h3>
              <div className="m-4">
                {!loading_tablefuturs && (
                  <table className="table w-full">
                    <thead className="bg-gray-bg text-xs h-10">
                      <tr>
                        <th>Année</th>
                        <th>Cal Base</th>
                        <th>Cal Pointe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data_table_futures.map((item) => (
                        <tr className="text-center h-9 border-b border-gray-100">
                          <td>{item["Année"]}</td>
                          <td>{item["Cal Base"]}</td>
                          <td>{item["Cal Pointe"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              )}

              </div>
            </div> 

          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mx-auto mb-20">
                
        <div className="flex md:flex-row sm:flex-row flex-col">
          
          {/* Paragraph left */}              
          <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 w-full ">

            <h2 className="md:text-left sm:text-left text-left text-3xl md:w-2/3 sm:text-3xl md:text-4xl xl:ml-44 lg:ml-44 md:ml-24 sm:ml-16 ml-8 md:mt-20 sm:mt-16 mt-8">
              <strong>{t("index.section2.h2")}</strong>
            </h2>

            <h3 className="text-gray-6f w-4/5 sm:w-3/4 md:w-3/4 md:mb-16 sm:mb-16 mb-8 xl:ml-44 lg:ml-44 md:ml-24 sm:ml-16 ml-8 md:mt-8 sm:mt-8 mt-8 md:text-lg text-left">
              {t("index.section2.h3")}
              <br/>
              {t("index.section2.h31")}
            </h3>

            <Link
              to="/our-services"
              className="xl:ml-44 lg:ml-44 md:ml-24 sm:ml-16 ml-8 text-white text-center bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 sm:py-2 py-1 px-4 w-60 mx-auto"
            >
              {t("index.section1.button")}
            </Link>

          </div>

          {/* Paragraph right */}              
          <div className="md:ml-8 md:mt-6 mt-12 xl:w-1/2 lg:w-1/2 md:w-1/2 w-full">
            <div className="flex md:flex-row sm:flex-row flex-col md:mx-4 sm:mx-2 lg:my-0 md:my-10 sm:my-0">
              <img
                src="./images/bancaire.png"
                alt="bancaire"
                className="xl:m-6 lg:m-6 m-auto"
              />
              <div className="xl:ml-12 lg:ml-12 ml-8 mr-10 md:mb-4 mb-8">
                <h2 className="text-left text-2xl md:my-8 my-2 md:text-2xl">
                  <strong>{t("index.section2.h2Product1")}</strong>
                </h2>
                <p className="text-left text-gray-6f">
                  {t("index.section2.pProduct1")}
                </p>
              </div>             
            </div>

            <div className="flex md:flex-row sm:flex-row flex-col md:mx-4 sm:mx-6 lg:my-0 md:my-10 sm:my-0">
              <img
                src="./images/feuille.png"
                alt="Environment"
                className="xl:ml-8 lg:ml-8 md:ml-3 xl:m-6 lg:m-6 m-auto"
              />
              <div className="xl:ml-16 lg:ml-16 ml-10 mr-10 md:mb-4 mb-8">
                <h2 className="text-black text-left md:text-2xl text-2xl md:my-8 my-2">
                  <strong>{t("index.section2.h2Product2")}</strong>
                </h2>
                <p className="text-left text-gray-6f">
                  {t("index.section2.pProduct2")}
                </p>
              </div>
              
            </div>

            <div className="flex md:flex-row sm:flex-row flex-col md:mx-4 sm:mx-2 lg:my-0 md:my-10 sm:my-0">
              <img
                src="./images/gear.png"
                alt="Services"
                className="md:ml-0 xl:m-6 lg:m-4 m-auto"
              />
              <div className="xl:ml-10 lg:ml-10 ml-8 mr-10">
                <h2 className="text-black text-left md:text-2xl text-2xl md:my-8 my-2">
                  <strong>{t("index.section2.h2Product3")}</strong>
                </h2>
                <p className="text-left text-gray-6f">
                  {t("index.section2.pProduct3")}
                </p>
              </div>
              
            </div>
          </div>         

        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-violet-bohr-bis w-screen">
        
        <h3 className="text-white xl:text-left lg:text-left sm:text-center md:text-4xl sm:text-3xl text-2xl md:w-2/5 w-full md:mt-24 sm:mt-0 md:ml-44 ml-8 md:py-12 py-12">
          <strong>{t("index.section5.h1")}</strong>
        </h3>

        <div className="flex md:flex-row sm:flex-row flex-col" >

          {/* Paragraph left */}               
          <div className="md:w-3/4 sm:w-3/4 xl:ml-4 lg:ml-4 md:ml-44 sm:ml-12 ml-4 sm:-mr-12 md:mt-0 sm:mt-0 mt-12 md:order-0 sm:order-0 order-1">
           
            <div className="flex flex-row xl:ml-40 lg:ml-40 md:ml-44 sm:ml-12 ml-4" >
              
              <img
                className="md:mt-10 mt-8"
                src="./images/Monitoring.svg"
                alt="Monitoring"
              />
              
              <div className="xl:ml-8 lg:ml-8 md:ml-8 sm:ml-4 ml-4 mt-8" >
                <h2 className="text-white text-left md:text-2xl text-2xl ">
                  <strong>{t("index.section5.h2img1")}</strong>
                </h2>
                <p className="text-left text-white text-opacity-60">
                  {t("index.section5.pimg1")}
                </p>
              </div>
              
            </div>

            <div className="flex flex-row xl:ml-40 lg:ml-40 md:ml-44 sm:ml-12 ml-4" >

              <img
                className="mt-4"
                src="./images/Analyse.svg"
                alt="Analyse"
              />
              <div className="xl:ml-8 lg:ml-8 md:ml-8 sm:ml-4 ml-4 mt-8">
                <h2 className="text-white text-left text-2xl md:text-2xl">
                  <strong>{t("index.section5.h2img2")}</strong>
                </h2>
                <p className="text-left text-white text-opacity-60">
                  {t("index.section5.pimg2")}
                </p>
              </div>
              
            </div>

            <div className="flex flex-row xl:ml-40 lg:ml-40 md:ml-44 sm:ml-12 ml-4 mb-16" >

              <img
                className="mt-0"
                src="./images/Portefeuille.svg"
                alt="Portefeuille"
              />
              <div className="xl:ml-8 lg:ml-8 md:ml-8 sm:ml-4 ml-4 mt-8">
                <h2 className="text-white text-left text-2xl md:text-2xl">
                  <strong>{t("index.section5.h2img3")}</strong>
                </h2>
                <p className="text-left text-white text-opacity-60">
                  {t("index.section5.pimg3")}
                </p>
              </div>
              
            </div>

            <div className="xl:ml-40 lg:ml-40 md:ml-0 ml-12 md:mb-12 mb-20 ">
              <Link
                to="/our-services"
                className="bg-orange-bohr text-white text-center border-orange-bohr rounded-full border-solid border-4 md:py-2 py-2 px-4 w-60"
              >
                {t("index.section2.button")}
              </Link>
            </div>     
          </div>

          {/* Image right */}               
          <div className="md:-mt-36 mt-4 md:p-8 p-2 md:order-1 sm:order-1 order-0">
            <img
              className="md:float-none sm:float-right md:ml-24 ml-12 sm:-mr-12 sm:mb-12 md:px-14 px-10 md:w-full sm:w-full"
              src="./images/dashboard.png"
              alt="Digital innovation"
            />
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="mx-auto">
   
        <div className="text-center md:justify-center">
          <h3 className="md:text-4xl sm:text-3xl text-2xl  md:mt-24 sm:mt-24 my-12">
            <strong>{t("index.section3.h2")}</strong>
          </h3>
        </div>

        <div className="flex md:flex-row sm:flex-row flex-col md:p-8 p-2 md:justify-center">
          <div className="flex-1 md:max-w-md md:mx-4 lg:my-0 md:my-10 sm:my-10 my-4">
            <img
              className="md:px-14 px-10"
              src="./images/DIGITAL.jpg"
              alt="Digital innovation"
            />
            <h2 className="text-center my-8 md:text-2xl text-2xl">
              <strong>{t("index.section3.h2img1")}</strong>
            </h2>
            <p className="text-center text-gray-6f md:mb-20 md:ml-16 md:mr-16">
              {t("index.section3.pimg1")}
            </p>
          </div>

          <div className="flex-1 md:max-w-md md:mx-4 lg:my-0 md:my-10 sm:my-10 my-4">
            <img
              className="md:px-14 px-10"
              src="./images/MONEY.jpg"
              alt="Fair rates"
            />
            <h2 className="text-center my-8 md:text-2xl text-2xl">
              <strong>{t("index.section3.h2img2")}</strong>
            </h2>
            <p className="text-center text-gray-6f md:ml-16 md:mr-16">
              {t("index.section3.pimg2")}
            </p>
          </div>

          <div className="flex-1 md:max-w-md md:mx-4 lg:my-0 md:my-10 sm:my-10 my-4">
            <img
              className="md:px-14 px-10"
              src="./images/ATTENTION.jpg"
              alt="Personalized attention"
            />
            <h2 className="text-center my-8 md:text-2xl text-2xl">
              <strong>{t("index.section3.h2img3")}</strong>
            </h2>
            <p className="text-center text-gray-6f md:mb-20 mb-24 md:ml-16 md:mr-16">
              {t("index.section3.pimg3")}
            </p>
          </div>
        </div>

      </section>

      {/* Section 5 */}
      <section className="mx-auto mb-20">
        
        <FooterImage />

        <div className="flex md:flex-row flex-col md:p-8 p-2 md:justify-left sm:ml-12 sm:mt-12 justify-center">
        
          <div>
            <h3 className="md:text-4xl sm:text-4xl text-2xl">
              <strong>{t("index.section4.h2")}</strong>
            </h3>
            
            <div className="flex md:flex-row sm:flex-row mt-12 md:justify-left sm:justify-left items-center">
                          
              <img
                className="md:w-44 sm:w-44 w-24 "
                src="./images/logo_epex.png"
                alt="Epex Spot"
              />
              <img
                className="md:w-32 sm:w-32 w-16 md:ml-8 sm:ml-12 ml-2"
                src="./images/logo_eex.png"
                alt="EEX"
              />
              {/*<img
                className="md:w-32 sm:w-32 w-24 md:ml-8 sm:ml-12 ml-2"
                src="./images/logo_enedis.png"
                alt="Enedis"
              /> */}
              <img
                className="md:w-18 md:w-18 w-14 md:ml-8 sm:ml-12 ml-2"
                src="./images/logo_rte.png"
                alt="RTE"
              />

            </div>
          </div>

          <div className="xl:ml-48 lg:48 md:ml-48 sm:ml-0 ml-0 md:mb-0 sm:mb-12 my-12 border"></div>   

          <div className="xl:ml-48 lg:48 md:ml-24 sm:ml-0 ml-0">
            <h3 className="md:text-4xl sm:text-4xl text-2xl">
              <strong>{t("index.section4.h3")}</strong>
            </h3>

            <div className="flex md:flex-row mt-12 md:justify-left items-center">
            
              <img
                className="md:w-34 sm:w-34 w-24"
                src="./images/logo_bpi.png"
                alt="BPI"
              />
                     
              <img
                className="md:ml-8 sm:ml-8 ml-4 md:w-30 sm:w-30 w-24"
                src="./images/logo_athome.png"
                alt="ATHOME"
              />

            </div>

          </div>    

        </div>

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
  );
};

export default IndexPage;
