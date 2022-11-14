import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import DatePicker, { registerLocale } from "react-datepicker"
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import fr from "date-fns/locale/fr"
import en from "date-fns/locale/en-US"
import "react-datepicker/dist/react-datepicker.css"
import "./../styles/contactus.css"
import "./../styles/datepicker.css"
import { useRef } from "react"
import ApiService from "../app/services/ApiService"
import { errMessage, successMessage } from "../app/actions"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify';
toast.configure();
/*
registerLocale("fr", fr)
registerLocale("en", en)*/
interface Props {}

const ContactUs: FC<Props> = () => {
  const [value, onChange] = useState(new Date())
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState(new Date())
  //const dispatch= useDispatch()

  const ref_name = useRef<HTMLInputElement>(null)
  const ref_email = useRef<HTMLInputElement>(null)
  const ref_company = useRef<HTMLInputElement>(null)
  const ref_phone = useRef<HTMLInputElement>(null)
  const ref_message = useRef<HTMLTextAreaElement>(null)
  const submitform = (event:any) => {
    event.preventDefault();
    if (
      ref_name.current &&
      ref_email.current &&
      ref_company.current &&
      ref_phone.current &&
      ref_message.current
    ) {
      let name = ref_name.current.value
      let mail = ref_email.current.value
      let company = ref_company.current.value
      let phone = ref_phone.current.value
      let message = ref_message.current.value
      
      ApiService.SendMail({mail, name, company, message, phone})
      .then(res => {
        //dispatch(successMessage("Votre message a été envoyé"))
        toast.success("Votre message a été envoyé");
      })
      .catch(err => {
        console.log("error : ", err)
        //dispatch(errMessage("Une erreur s'est produit"))
        toast.error("Une erreur s'est produit");
        
      })
    }
  }
  return (
    <div className="container mx-auto flex md:flex-row flex-col mt-12 md:mt-6 md:p-8 p-2 md:justify-around px-4 mb-10">
      <div
        className="flex-auto md:max-w-md md:mx-4"
        data-sal="slide-right"
        data-sal-delay="300"
        data-sal-easing="ease-out"
      >
        <h2 className="text-2xl mt-8 mb-4 text-gray-4a md:text-3xl">
          <strong>{t("contactUs.hero.l1")}</strong>
        </h2>
        <p className="mb-22 text-gray-222 max-w-xs">
          {t("contactUs.section1.text")}
        </p>
        <form onSubmit={submitform}>
          <label className="block mt-10" htmlFor="name">
            {t("contactUs.section1.h2")}
          </label>
          <input
            id="name"
            ref={ref_name}
            type="text"
            className="border px-6 border-black border-solid h-10 w-full"
          />
          <label className="block mt-5" htmlFor="company">
            {t("contactUs.section1.h3")}
          </label>
          <input
            id="company"
            ref={ref_company}
            type="text"
            className="border px-6 border-black border-solid h-10 w-full"
          />
          <label className="block mt-5" htmlFor="tel">
            {t("contactUs.section1.h4")}
          </label>
          <input
            id="tel"
            ref={ref_phone}
            type="tel"
            className="border px-6 border-black border-solid h-10 w-full"
          />
          <label className="block mt-5" htmlFor="email">
            {t("contactUs.section1.h5")}
          </label>
          <input
            id="mail"
            ref={ref_email}
            type="mail"
            className="border px-6 border-black border-solid h-10 w-full"
          />

          <label className="block mt-5" htmlFor="message">
            {t("contactUs.section1.h6")}
          </label>
          <textarea
            id="message"
            ref={ref_message}
            rows={14}
            className="border px-6 border-black border-solid w-full"
            cols={33}
          ></textarea>
          <button
            // href="mailto:ea_djidjik@esi.dz"
            className="block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-4 w-44 md:mt-8"
          >
            {t("contactUs.section1.button")}
          </button>
        </form>
      </div>
      <div
        className="flex-auto md:max-w-xl text-gray-222"
        data-sal="slide-left"
        data-sal-delay="300"
        data-sal-easing="ease-out"
      >
        <h2 className="text-2xl mt-8 mb-4 text-gray-4a md:text-3xl">
          <strong>{t("contactUs.hero.l2")}</strong>
        </h2>

        <p style={{ marginLeft: "0em" }}>
          <b>Tel:</b> 08 05 03 38 00
          <br />
          <b>Mail:</b> contact@bohr-energie.fr
        </p>

        <iframe
          src="https://maps.google.com/maps?q=12%20rue%20dombasle&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="w-full h-96 mb-10"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>

        <h2 className="text-2xl mt-8 mb-4 text-gray-4a md:text-3xl">
          <strong>{t("contactUs.hero.l3")}</strong>
        </h2>

        <DatePicker
          wrapperClassName="datePicker"
          selected={startDate}
          onChange={(date: any) => setStartDate(date)}
          excludeOutOfBoundsTimes
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
          locale={t("contactUs.section1.locale")}
          minDate={setHours(setMinutes(new Date(), 0), 1)}
          minTime={setHours(setMinutes(new Date(), 0), 9)}
          maxTime={setHours(setMinutes(new Date(), 30), 18)}
          inline
        />
        <a
          href="#"
          className="block text-white bg-orange-bohr border-orange-bohr rounded-full border-solid border-4 md:py-2 py-1 px-5 w-48 md:mt-8"
        >
          {t("contactUs.section1.button2")}
        </a>
      </div>
    </div>
  )
}

export default ContactUs
