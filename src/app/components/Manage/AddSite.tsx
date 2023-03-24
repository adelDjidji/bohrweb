import { useState, useEffect, useRef, useMemo } from "react"
import { Steps } from "antd"
import Text from "../Text"
import "../../App.css"
import Input from "../Input"
import SelectDropdown from "../SelectDropdown"
import Passcode from "../registerComponents/Passcode"
//Map import
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useForm } from "react-hook-form"
import AutoComplete, { usePlacesWidget } from "react-google-autocomplete"
import { GOOGLE_MAP_API_KEY } from "../../utils/constants"
import L from "leaflet"
import { icon } from "leaflet"
import HttpService from "../../services/HttpService"
import ApiService from "../../services/ApiService"
import { errorNotification, successNotification } from "../../utils"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { Icon } from "../Icon"
import { fetchSitesDetail } from "../../redux/actions"
import {
  addCompany,
  fetchCompanies,
  fetchCompaniesDetails,
  fetchOAContracts,
  fetchOldContracts,
  fetchTypesTech,
} from "../../redux/actions/commun"
import ClipLoader from "react-spinners/ClipLoader"
import { DateSelector } from "../DateSelector"

const ICON = icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/images/marker-icon.png",
  // iconSize: [32, 32],
})
// import 'leaflet/dist/images/marker-icon.png';
// import 'leaflet/dist/images/marker-shadow.png';


const AddSite = props => {

  const { typesTech, oldContracts, companies,OAContracts } = useSelector(
    (state: RootStateOrAny) => state.commun
  )


  const [step, setStep] = useState(-1)
  const [ibans, setIbans] = useState(["", "", "", ""])


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTypesTech())
    dispatch(fetchOldContracts())
    dispatch(fetchOAContracts())
    dispatch(fetchCompaniesDetails())

  }, [])

  // const [values, setvalues] = useState(def)

  const onStepChange = newStep => {
    setStep(newStep)
  }

  
  const [spinner, setSpinner] = useState(false);  
  

  const [def,setDef] = useState({
                                  'tva': "",
                                  'company_name': "",
                                  'company_siren': "",
                                  'company_address': "",
                                  'company_postal_code': "",
                                  'company_city': "",
                                  'company_country': "",
                                  'company_legal_representative_name': "",
                                  'company_legal_representative_lastname': "",
                                  'company_contact_mail': "",
                                  'company_contact_phone': "",
                                  'bank_account_holder_account': "",
                                  'bank_account_holder_address': "",
                                  'bank_account_bank_name': "",
                                  'bank_account_bank_address': "",
                                  'bank_account_iban': "",
                                  'bank_account_bic': "",
                                  'site_name': "",
                                  'site_card_number': "",
                                  'site_prm_number': "",
                                  'site_type': "",
                                  'site_old_contract': "",
                                  'site_installed_capacity': "",
                                  'site_commisionning_date': "2020-01-01",
                                  'site_grid': "",
                                  'site_tracker': "",
                                  'site_inclination': "",
                                  'site_azimut': "",
                                  'site_orientation': "",
                                  'site_height': "",
                                  'site_turbine_type': "",
                                  'site_reference_river': "",
                                  'site_lat': "48.856614",
                                  'site_lon': "2.3522219",
                                  'site_address': "",
                                  'site_postal_code': null,
                                  'site_country': "",
                                })
                         

  const [position, setPosition] = useState({'lat':"48.856614",'lon':"2.3522219"});  

  const getInfoPappersV2 = async (siren) => {
    try {

      if (companies.filter(e=>e.siren === siren).length > 0 ) {
        setSpinner(false)
      } else {
        // Reset everyfield before autocomplete
        setDef( {...def,
          'company_name' : '',
          'company_siren' : siren,
          'tva': '',
          'company_address': '',
          'company_city' : '',
          'company_country' : '',
          'company_postal_code' : '',
          'company_legal_representative_lastname': '',
          'company_legal_representative_name': '',
          'company_contact_phone': '',
          'company_contact_mail': '',
          'bank_account_holder_account': "",
          'bank_account_holder_address': "",
          'bank_account_bank_name': "",
          'bank_account_bank_address': "",
          'bank_account_iban': "",
          'bank_account_bic': "",
        } )


        setSpinner(true);
        const resp = await ApiService.Pappers({'siren':siren})
        if(resp.status==200){
        const info = resp.data

        const new_c =  {
          public_id: "999999",
          name: info['name'],
          siren: siren,
          address: info['address'],
          city: info['city'],
          country: info['country'],
          legal_representative: info['legal_representative_lastname'] + ' ' + info['legal_representative_name'] ,
          postal_code: info['postal_code'],
          tva_number: info['tva_number'],
        }

        setDef( {...def,
                'company_name' : info['name'],
                'company_siren' : siren,
                'tva': info['tva_number'],
                'company_address': info['address'],
                'company_city' : info['city'],
                'company_country' :  info['country'],
                'company_postal_code' : info['postal_code'],
                'company_legal_representative_lastname': info['legal_representative_lastname'],
                'company_legal_representative_name' :info['legal_representative_name'] 
              } )


        companies.push(new_c)
        setSpinner(false);
        setselectedCompany(new_c)
        }
      }




    } catch (error) {

      setSpinner(false);
    }
  }

  
    const updateforms = (key,value) => { 
        setDef({...def, [key] : value})
    }


  const sendSms = async callbackSuccess => {
    try {
      const resp = await ApiService.SendSmsVerification()
      if (resp.status == 200) {
        successNotification(resp.data.message)
        callbackSuccess && callbackSuccess()
      }
    } catch (error) {
      errorNotification(error.response.data.message)
    }
  }
  const onSubmit = () => {
    setDef({ ...def, bank_account_iban: ibans.join("") })
    sendSms(() => setStep(5))
  }

  const handleAddSite = async sms_code => {
    try {
      console.log(def)
      const resp = await ApiService.AddSite({ ...def, sms_code })
      if (resp.status == 200) {
        successNotification(resp.data.message)
        props.closeModal()
        dispatch(fetchSitesDetail())
        setStep(0)
      } else {
        errorNotification(resp.data.message)
      }
    } catch (error) {
      errorNotification(error.response.data.message)
    }
  }

  const handleOnSelectPlace = async place => {
    // const  pos =  await { lat : place.geometry.location.lat(), lng: place.geometry.location.lng() }
    console.log(' handleOnSelectPlace')
    // setPosition({'lat':pos.lat,'lon':pos.lng})

    // setDef({ ...def, site_lat: pos.lat.toString()})
    // setDef({ ...def, site_lon: pos.lng.toString() })
  }


  function MyComponent(props) {
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition({'lat': marker.getLatLng().lat,'lon':marker.getLatLng().lng,})
            setDef({
              ...def,
              site_lat: marker.getLatLng().lat,
              site_lon: marker.getLatLng().lng,
            })
          }
        },
      }),
      []
    )

    const map = useMap()
    map.setView(props.center)


    return (
      <Marker
        draggable
        eventHandlers={eventHandlers}
        ref={markerRef}
        icon={ICON}
        position={props.center}
      />
    )
  }
  const [options, setOptions] = useState([])
  const [selectedCompany, setselectedCompany] = useState()
  const [bankDetails, setbankDetails] = useState()
  
  
  const handleSlectCompany = async (company: {
    name: string
    siren: string
    public_id: string
    tva_number: string
    address: string
    city : string,
    country: string,
    postal_code : string,
    legal_representative: string,
    legal_representative_name: string,
    legal_representative_lastname: string
    contact_phone: string,
    contact_mail: string,

  }) => {
    if (!!company) {
      setselectedCompany(company)
      const resp = await ApiService.GetBankDetails(company.public_id)
      if(resp.status==200){
        if (resp.data[0] ===  undefined) {
          var bank = {'bank_address':'','bank_name':'','bic':'','holder_account':'','holder_address':'','iban':'FR1111111111111111111111111',}
        } else {

          const {
            bank_address,
            bank_name,
            bic,
            holder_account,
            holder_address,
            iban,
          } = resp.data[0]
         var bank = {'bank_address': resp.data[0]['bank_address'],'bank_name':resp.data[0]['bank_name'],'bic':resp.data[0]['bic'],'holder_account':resp.data[0]['holder_account'],'holder_address':resp.data[0]['holder_address'],'iban':resp.data[0]['iban'],}
        }
      }  else  {
          var bank = {'bank_address':'','bank_name':'','bic':'','holder_account':'','holder_address':'','iban':'FR1111111111111111111111111',}
      }
      setDef({
        ...def,
        bank_account_bank_address: bank.bank_address,
        bank_account_bank_name: bank.bank_name,
        bank_account_bic: bank.bic,
        bank_account_holder_account: bank.holder_account,
        bank_account_holder_address: bank.holder_address,
        bank_account_iban: bank.iban,
        company_name: company.name,
        company_siren: company.siren,
        tva: company.tva_number,
        company_address: company.address,
        company_postal_code: company.postal_code,
        company_contact_mail: company.contact_mail,
        company_contact_phone: company.contact_phone,
        company_legal_representative_name: company.legal_representative_name.split(
          " "
        )[0],
        company_legal_representative_lastname: company.legal_representative_lastname.split(
          " "
        )[1],
      })
      setIbans(bank.iban.match(/.{1,4}/g))
    }
  }
  const handleSelectType = (type: { key: string; value: string }) => {
    if (!!type)
      setDef({
        ...def,
        site_type: type.key,
      })
  }
  const handleSelectOC = (oc: { key: string; value: string }) => {
    if (!!oc)
      setDef({
        ...def,
        site_old_contract: oc.key,
      })
  }
  const handleSearch = (query: string) => {
    let res = []
    if (query.length >= 3) {
      HttpService.get("https://nominatim.openstreetmap.org/search", {
        q: query,
        format: "json",
      })
        .then(response => {
          setOptions(
            response.data.map(i => ({
              value: i.display_name,
              label: i.display_name,
            }))
          )
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  function IbanInput(props) {
    const inputRef = useRef(null)
    const [value, setValue] = useState("")

    const handleInputChange = event => {
      const input = event.target
      const newValue = input.value
      setValue(newValue)
      props.handleChange && props.handleChange(event)
      if (newValue.length === input.maxLength && input.nextElementSibling) {
        input.nextElementSibling.focus()
      }
    }

    return (
      <Input
        ref={inputRef}
        type="text"
        maxLength="4"
        style={{ width: 75 }}
        value={ibans[props.indexx]}
        onChange={handleInputChange}
        {...props}
      />
    )
  }

  function IbanInputs(props) {
    const numInputs = 7
    const inputs = []
    const [iban, setIban] = useState(props.defaultValue || '12345567')

    const handleInputChange = (index, value) => {
      setIbans(old => {
        let old_ = old
        old_[index] = value
        return old_
      })
      const newIban =
        iban.slice(0, index * 4) + value + iban.slice((index + 1) * 4)
      setIban(newIban)
    }

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <IbanInput
          key={i}
          indexx={i}
          handleChange={e => handleInputChange(i, e.target.value)}
        />
      )
    }

    return <div className="flex gap-2 flex-wrap">{inputs}</div>
  }
  const dic = {
    solaire: ["puissance", "tracker", "azimut",'altitude', "inclinaison", "orientation","onduleur","module","strings","module_per_strings"],
    hydro: ["puissance"],
    eolien: ["puissance", "altitude"],
  }
  const dicKeys = {
    puissance: {
      label: "Puissance installé",
      valueKey: "site_installed_capacity",
    },
    tracker: {
      label: "Tracker",
      valueKey: "site_tracker",
    },
    azimut: {
      label: "Asimut",
      valueKey: "site_azimut",
    },
    altitude: {
      label: "Altitude",
      valueKey: "site_altitude",
    },
    inclinaison: {
      label: "Inclinaison",
      valueKey: "site_inclination",
    },
    orientation: {
      label: "Orientation",
      valueKey: "site_orientation",
    },
    module: {
      label: "Nom du Module",
      valueKey: "site_module",
    },
    strings: {
      label: "Nombre de Strings",
      valueKey: "site_strings",
    },
    module_per_strings: {
      label: "Nombre de Module par Strings",
      valueKey: "site_module_per_strings",
    },
    onduleur: {
      label: "Nom de l'Onduleur",
      valueKey: "site_onduleur",
    },

  }

  
  const renderInputsByType = (type: "solaire" | "hydro" | "eolien") => {
    if (type?.trim() == "") return null
    const inputsKeys = dic[type] // array of inputs keys

    const inputs = inputsKeys?.length ?  inputsKeys.map(k =>
      Object.keys(dicKeys).includes(k) ? dicKeys[k] : null
    ) : [] // inputs with {label, key}
    return inputs.map(input => (
      <div className="w-80">
        <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
          {input.label}
        </label>
        <input
          type="text"
          value={def[input.valueKey]}
          onChange={e =>
            setDef({
              ...def,
              [input.valueKey]: e.target.value,
            })
          }
          placeholder=""
          className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
        />
      </div>
    ))
  }



  const europeanCountries = ["be", "cy", "cz", "dk", "fr"]
  const steps = [
    {
      title: "Entreprise / SPV",
      subTitle: "Etape 1",
      content: (
        <>



          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-8">

          <div className="col-span-4" style={{display:"flex",flexDirection:"row",justifyContent:'start',alignItems: 'center',borderBottom:'1px grey solid'}}>
            Vos Informations
          </div>

            <div className="w-80">

              <div style={{display:"flex",flexDirection:"row",justifyContent:'start',alignItems: 'center'}}>

                <div>
                  <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                    SIREN
                  </label>
                </div>

                { spinner ?
                  <div style={{marginLeft: '10px',paddingTop:'25px'}}>
                    <ClipLoader
                    color={"#5819F1"}
                    size={15}
                    />
                  </div>
                  : 
                  <></>
                }
              </div>



              <input
                type="text"
                // value={values.company_siren}
                value =  {def.company_siren}
                onChange = {(e) => updateforms('company_siren',e.target.value)}
                onBlur = {(e)=> getInfoPappersV2(e.target.value)}
                placeholder=""
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Entreprise / SPV
              </label>
              <SelectDropdown
                items={companies}
                type="none"
                fullWidth
                keyAttribute="public_id"
                valueAttribute="name"
                className="mr-0"
                defaultValue={selectedCompany}
                onSelect={handleSlectCompany}
              />
            </div>

{/* 
            
            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Entreprise / SPV
              </label>
              <input
                type="text"
                placeholder=""
                value =  {pappers.raison_sociale}
                onChange = {(e) => updateforms('raison_sociale',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div> */}


            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Adresse
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_address}
                onChange = {(e) => updateforms('company_address',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Ville
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.city}
                onChange = {(e) => updateforms('city',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>


            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Code Postal
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_postal_code}
                onChange = {(e) => updateforms('company_postal_code',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Pays
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_country}
                onChange = {(e) => updateforms('company_country',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                TVA
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.tva}
                onChange = {(e) => updateforms('tva',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Nom représentant légal
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_legal_representative_lastname}
                onChange = {(e) => updateforms('company_legal_representative_lastname',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>
            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Prénom représentant légal
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_legal_representative_name}
                onChange = {(e) => updateforms('company_legal_representative_name',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Contact Responsable Telephone
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_contact_phone}
                onChange = {(e) => updateforms('company_contact_phonee',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>
            <div className="w-80">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Contact Responsable Mail
              </label>
              <input
                type="text"
                placeholder=""
                value =  {def.company_contact_mail}
                onChange = {(e) => updateforms('company_contact_mail',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>


            <div className="col-span-4" style={{display:"flex",flexDirection:"row",justifyContent:'start',alignItems: 'center',borderBottom:'1px grey solid',marginTop:'30px'}}>
            Vos Informations Bancaires
            </div>

            <div className="col-span-2">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Titulaire du compte
              </label>
              <input
                type="text"
                value={def.bank_account_holder_account}
                onChange = {(e) => updateforms('bank_account_holder_account',e.target.value)}
                placeholder=""
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>


            <div className="col-span-4">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                IBAN
              </label>
              <IbanInputs defaultValue={def.bank_account_iban} />
            </div>
            <div className="col-span-1">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                BIC
              </label>
              <input
                type="text"
                value={def.bank_account_bic}
                onChange = {(e) => updateforms('bank_account_bic',e.target.value)}
                placeholder=""
                className="w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>


          </div>



        </>
      ),
    },
    {
      title: "Site",
      subTitle: "Etape 2",
      content: (
        <>
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-x-8">
          <div className="w-80">
              <div className="flex items-center mt-8 mb-2 gap-3">
                <label className="text-sm font-medium text-dark-grey">
                  Nom du Site
                </label>
                <Icon
                  name="info"
                  title="Vous trouverez ce numéro lorem ipsum dolor es...."
                />
              </div>

              <input
                // {...register("n_prm")}
                type="text"
                value={def.site_name}
                onChange = {(e) => updateforms('site_name',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="w-80">
              <div className="flex items-center mt-8 mb-2 gap-3">
                <label className="text-sm font-medium text-dark-grey dark:text-white">
                  N° Card
                </label>
                <Icon
                  name="info"
                  title="Vous trouverez ce numéro lorem ipsum dolor es...."
                />
              </div>

              <input
                // {...register("n_carte")}
                type="text"
                value={def.site_card_number}
                onChange = {(e) => updateforms('site_card_number',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>
            <div className="w-80">
              <div className="flex items-center mt-8 mb-2 gap-3">
                <label className="text-sm font-medium text-dark-grey">
                  N° PRM
                </label>
                <Icon
                  name="info"
                  title="Vous trouverez ce numéro lorem ipsum dolor es...."
                />
              </div>

              <input
                // {...register("n_prm")}
                type="text"
                value={def.site_prm_number}
                onChange = {(e) => updateforms('site_prm_number',e.target.value)}
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>





              <div className="w-80">
              <div className="flex items-center mt-8 mb-2 gap-3">
                <label className="text-sm font-medium text-dark-grey">
                  Type
                </label>
                <Icon
                  name="info"
                  title="Vous trouverez ce numéro lorem ipsum dolor es...."
                />
              </div>
              <SelectDropdown
                items={typesTech?.map(i => ({ key: i, value: i }))}
                type="none"
                className="mr-0"
                defaultValue={def.site_type}
                onSelect={handleSelectType}
              />
            </div>

            <div className="w-80">
            <div className="flex items-center mt-8 mb-2 gap-3">
                <label className="text-sm font-medium text-dark-grey">
                  Ancien Contrat
                </label>
                <Icon
                  name="info"
                  title="Vous trouverez ce numéro lorem ipsum dolor es...."
                />
              </div>
              <SelectDropdown
                items={OAContracts?.map(i => ({ key: i.contract_type, value: i.contract_type }))}
                type="none"
                className="mr-0"
                defaultValue={def.site_old_contract}
                onSelect={handleSelectOC}
              />
            </div>

            
            <div className="w-80">
                <div className="flex items-center mt-8 mb-2 gap-3">
                  <label className="text-sm font-medium text-dark-grey">
                    Date de Mise en Service
                  </label>
                  <Icon
                    name="info"
                    title="Vous trouverez ce numéro lorem ipsum dolor es...."
                  />
                </div>
                <DateSelector
                  // defaultValue={start_time}
                  onChange={(date: string) => setDef({...def, site_commisionning_date : date})}
                  format="YYYY-MM-DD"
                  showHours={false}
                />
              </div>

            

            <div className="md:col-span-2 sm:col-span-1">
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Adresse du site
              </label>

              <AutoComplete
                className="w-full border-2 border-gray-200 text-dark-grey sm:text-sm rounded-lg focus:ring-primary-600  block p-2.5 focus:outline-none"
                apiKey={GOOGLE_MAP_API_KEY}
                // callback={() => {}}
                options={{
                  types: [
                    // 'geocode',
                    "address",
                    // "street_address",
                    // "locality",
                    // "sublocality",
                    // "neighborhood",
                    // "country",
                    // "administrative_area_level_1",
                    // "administrative_area_level_2",
                  ],
                  componentRestrictions: { country: europeanCountries },
                }}
                // autoComplete="off"
                onPlaceSelected={handleOnSelectPlace}
                defaultValue="Paris, France"
              />
            </div>


            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Latitude
              </label>
              <input
                type="text"
                value={position.lat}
                // onChange={e =>
                //   setvalues({ ...values, Latitude: e.target.value })
                // }
                placeholder=""
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                Longitude
              </label>
              <input
                // {...register("Longitude")}
                type="text"
                value={position.lon}
                // onChange={e =>
                //   setvalues({ ...values, Longitude: e.target.value })
                // }
                placeholder=""
                className=" w-full border-2 border-gray-200 hover:border-violet-bohr  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600  block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 sm:col-span-1 row-span-2 ">
              <div className="mt-8 w-full h-72 rounded-lg overflow-hidden	">
                <MapContainer center={ {'lat': position.lat, 'lon':position.lon}} zoom={12}>
                  <MyComponent center={ {'lat': position.lat, 'lon':position.lon} } />
                  <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                </MapContainer>
              </div>
            </div>

            </div>

        </>
      ),
    },
    {
      title: "Unite de production",
      subTitle: "Etape 3",
      content: (
        <>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
            <div className="sm:col-span-2 col-span-1">
              <Text type="20-600" style={{textTransform: 'capitalize'}}>{def.site_type}</Text>
            </div>
            {renderInputsByType(def.site_type)}
          </div>
        </>
      ),
    },

  ]

  return (
    <div className="p-6 min-h-screen">
      {step !== 5 && (
        <div className="mb-16 text-3xl font-semibold">
          Ajouter un site de production
        </div>
      )}

      {step == -1 ? (
        <>
          <div className="text-center mb-8">
            <Text type="20-500" className="mb-2.5">
              Avant de commencer, assurez vous d'avoir toutes ces informations :
            </Text>
          </div>
          <div className="flex  flex-col md:flex-row items-center content-center justify-center gap-x-40">
            <div className="text-center grid w-60">
              <div className="flex justify-center h-48 items-end">
                <img
                  src="/images/entreprise.png"
                  className="mb-8"
                  width={138}
                  height={142}
                />
              </div>
              <Text className="mb-4" type="20-600">
                L'entreprise / Le SPV
              </Text>
              <Text className="text-gray-6f" type="16-500">
                SIREN
              </Text>
            </div>
            <div className="grid text-center w-64">
              <div className="flex justify-center  h-56 items-end">
                <img
                  src="/images/site.png"
                  className="mb-8"
                  width={174}
                  height={162}
                />
              </div>
              <Text className="mb-4" type="20-600">
                Le site
              </Text>
              <Text className="text-gray-6f" type="16-500">
                Type de site, Puissance du site, Adresse ou Coordonnés GPS,
                Caracteristiques du site.
              </Text>
            </div>
            <div className="text-center grid w-66">
              <div className="flex justify-center  h-44 items-end">
                <img
                  src="/images/bancaire2.png"
                  className="mb-8"
                  width={174}
                  height={137}
                />
              </div>
              <Text className="mb-4" type="20-600">
                Vos informations bancaires
              </Text>
              <Text className="text-gray-6f" type="16-500">
                Vos coordonnéees bancaires (RIB)
              </Text>
            </div>
          </div>
          <br />
          <div className="flex justify-center mt-24 space-x-2 ">
            <button
              type="submit"
              style={{ backgroundColor: "#5819F1" }}
              className="px-4 py-3 text-xs font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
              onClick={() => onStepChange(0)}
            >
              Démarrer
            </button>
          </div>
        </>
      ) : step != 3 ? (
        <>
          <>
            <Steps
              type="navigation"
              size="small"
              current={step}
              onChange={onStepChange}
              className="site-navigation-steps"
              items={steps}
            />
            <div className="flex justify-center mt-4">
              {steps[step].content}
            </div>
            <div className="flex mt-10 space-x-4 justify-center">
              <button
                type="button"
                className="inline-block px-4 py-3 text-sm font-semibold leading-tight text-violet-bohr bg-transparent border-2 border-violet-bohr rounded-lg shadow-md outline-none focus:shadow-lg focus:ring-0 active:bg-violet-bohr active:shadow-lg"
                onClick={() => onStepChange(step - 1)}
              >
                Retour
              </button>
              {step == 4 ? (
                <button
                  // type="submit"
                  className="inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg"
                  onClick={() => onSubmit()}
                >
                  Valider
                </button>
              ) : (
                <div
                  className="cursor-pointer flex items-center inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg"
                  onClick={() => onStepChange(step + 1)}
                >
                  Suivant
                </div>
              )}
            </div>
          </>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen text-center">
          <div>
            <h1>
              <Text type="32-600">Confirmer l'ajout du nouveau site</Text>
            </h1>
            <Passcode
              center
              handleSubmit={handleAddSite}
              handleback={() => {
                setStep(2)
              }}
              handleResend={sendSms}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddSite
