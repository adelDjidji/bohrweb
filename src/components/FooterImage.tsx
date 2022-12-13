import { FC, useState } from "react"
import { Link } from "gatsby";
import { useTranslation } from "react-i18next"
import fr from "date-fns/locale/fr"
import en from "date-fns/locale/en-US"
import "react-datepicker/dist/react-datepicker.css"
import "./../styles/contactus.css"
import "./../styles/datepicker.css"
import { useRef } from "react"
import ApiService from "../app/services/ApiService"
import { toast } from 'react-toastify';
toast.configure();
/*
registerLocale("fr", fr)
registerLocale("en", en)*/
interface Props {}

const FooterImage: FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <div className="flex sm:items-center md:justify-around justify-around md:px-4 md:p-8 p-2 ">
           
      <div className="absolute w-2/3 md:mt-20 sm:mt-0 mt-4 md:-ml-20 sm:-ml-24">
        
          <h3 className="text-white md:text-4xl sm:text-3xl text-2xl md:w-3/4 sm:w-3/4 w-full md:mb-44 sm:mb-24 mb-12 md:mt-0 sm:mt-0 mt-8">
              {t("index.section4.h1")}
          </h3>
          
          <Link
            to="/our-services"
            className="text-white text-center md:text-base text-sm bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 sm:py-2 py-2 md:px-12 sm:px-2 px-2"
          >
            {t("index.section3.button")}
          </Link>
                
      </div>

      <div className="md:h-full sm:h-full h-96 sm:px-4">
        <img
         className="rounded-lg md:h-full sm:h-full h-96 md:object-fill sm:object-none object-none"
          src="./images/Banner.png"
          alt="banner"
        />
      </div>
                           
    </div>
  )
}

export default FooterImage