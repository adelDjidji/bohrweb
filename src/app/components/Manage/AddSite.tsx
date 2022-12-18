import { useState , useEffect , useRef } from 'react';
import { Col, Form, Row, Steps,Card } from 'antd';
import Text from "../Text";
import {
  Button,
  TextField,
  CardHeader,
  InputAdornment,
  makeStyles,
  Grid,
  CircularProgress
} from '@material-ui/core';
import Step from '../../views/step';
import '../../App.css'
import Input from '../Input';
import SelectFilter from '../Select';
import OtpInput from 'react-otp-input';
import SelectDropdown from '../SelectDropdown';
//Map import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const AddSite = (props) => {
  const [step, setStep] = useState(-1);
  const [position,setPosition] = useState([12.33,43.43]);
  const onStepChange = newStep => {
    console.log([step,newStep]);
    setStep(newStep)
  }

  const onSubmit = ()=>{
    setStep(-1);
    props.closeModal();
  }

  const otpStyle = { width:'75px' , height:'40px', border: "2px solid rgba(229, 231, 235, var(--tw-border-opacity))", borderRadius: "8px", marginRight: "8px" };

  const steps = [
    {
      title: 'Entreprise',
      subTitle: 'Etape 1'
    },
    {
      title: 'Site',
      subTitle: 'Etape 2'
    },
    {
      title: 'Unite de production',
      subTitle: 'Etape 3'
    },
    {
      title: 'Adresse',
      subTitle: 'Etape 4'
    },
    {
      title: 'Information bancaires',
      subTitle: 'Etape 5'
    }
  ];

  const renderStepperContent = () => {
    switch (step) {
      case 0:
        return (
          <>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-x-8'>
              <div className='w-80'>
                <Input
                  label='Reason sociale'
                  type='text'
                  id='reason-sociale'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Adresse'
                  type='text'
                  id='adresse1'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='TVA'
                  type='text'
                  id='tva'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='SIREN'
                  type='text'
                  id='siren'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Nom représentant légal'
                  type='text'
                  id='nom-representant-legal'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Préom représentant légal'
                  type='text'
                  id='prenom-representant-legal'
                  extraStyle='w-full'
                />
              </div>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-x-8'>
              <div className='w-80'>
                <Input
                  label='N° Card'
                  type='text'
                  id='n-card'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='N° PRM'
                  type='text'
                  id='n-prm'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <label className="block mt-8 mb-2 text-sm font-semibold text-dark-grey dark:text-white">
                  Type
              </label>
                <SelectDropdown
                  items={[
                    {key:'salaire',value:'Salaire'},
                    {key:'eolien',value:'Eolien'},
                    {key:'hydro',value:'Hydro'}
                  ]}
                  type='none'
                  className='mr-0'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Ancien contract'
                  type='text'
                  id='ancien-contrat'
                  extraStyle='w-full'
                />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-x-8'>
              <div className='col-span-2'>
                <Text type='20-600'>
                  Photovotraique
                </Text>
              </div>
              <div className='w-80'>
                <Input
                  label='Puissance installé'
                  type='text'
                  id='puissance-installe'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Tracker'
                  type='text'
                  id='tracker'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Inchinaison'
                  type='text'
                  id='inchinaison'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Asimat'
                  type='text'
                  id='asimat'
                  extraStyle='w-full'
                />
              </div>
              <div className='w-80'>
                <Input
                  label='Orientation'
                  type='text'
                  id='orienation'
                  extraStyle='w-full'
                />
              </div>
            </div>
          </>
        )
      case 3:
        return (
          <>
            <div className='grid md:grid-cols-5 md:grid-rows-4 sm:grid-cols-1 gap-x-8'>
              <div className='md:col-span-2 sm:col-span-1'>
                <Input
                  label='Adresse du site'
                  type='text'
                  id='adresse-site'
                  extraStyle='w-full'
                />
              </div>
              <div className='md:col-span-3 sm:col-span-1 row-span-4 '>
                <div 
                  className='mt-8 w-full h-48'
                >
                  <MapContainer center={position}  zoom={40}>
                    <TileLayer
                      url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                      />
                  </MapContainer>
                </div>
              </div>
              <div>
                <Input
                  label='Latitude'
                  type='text'
                  id='Latitude'
                  extraStyle='w-full'
                />
              </div>
              <div>
                <Input
                  label='Longitude'
                  type='text'
                  id='longitude'
                  extraStyle='w-full'
                />
              </div>
              
            </div>
          </>
        )
      case 4:
        return (
          <>
            <div className='grid md:grid-cols-4 sm:grid-cols-1 gap-x-8'>
              <div className='md:col-span-2 sm:col-span-1 w-fit'>
                <Input
                  label='Titulaire du compte'
                  type='text'
                  id='titulaire-compte'
                  extraStyle='w-full'
                />
              </div>
              <div className='md:col-span-2 sm:col-span-1'>
                <Input
                  label='Adresse'
                  type='text'
                  id='adresse2'
                  extraStyle='w-full'
                />
              </div>
              <div className='md:col-span-2 sm:col-span-1'>
                <Input
                  label='Banque'
                  type='text'
                  id='banque'
                  extraStyle='w-full'
                />
              </div>
              <div className='md:col-span-3 sm:col-span-1'>
                <Input
                  label='Adresse'
                  type='text'
                  id='adresse-banque'
                  extraStyle='w-full'
                />
              </div>
              <div className='col-span-1'>
              <label className="block mt-8 mb-2 text-sm font-semibold text-dark-grey dark:text-white">
                  IBAN
              </label>
                <OtpInput
                  inputStyle={otpStyle} numInputs={6} focusStyle="focus:ring-primary-600 focus:border-primary-600"
                  className='custom-otp w-1/6'
                />
              </div>
              <div>
                <Input
                  label='BIC'
                  type='text'
                  id='bic'
                  extraStyle='w-full'
                />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className='p-6'>
      <div className="mb-16 text-xl font-semibold">
          Ajouter un site de production
        </div>
      {step == -1 ? (
        <>
          <div className='text-center mb-8'>
            <Text type='20-500' className='mb-2.5'>
              Avant de commencer, assurez vous d'avoir toutes ces informations :
            </Text>
          </div>
            <div className="flex items-center content-center justify-center gap-x-40" >
              <div className="text-center grid w-60">
                <div className="flex justify-center h-48 items-end">
                  <img src="/images/entreprise.png" className="mb-8" width={138} height={142} />
                </div>
                <Text className="mb-4" type='20-600'>L'entreprise</Text>
                <Text className="text-gray-6f" type="16-500">Raison social, Adresse, SIREN, TVA</Text>
              </div>
              <div className="grid text-center w-64">
                <div className="flex justify-center  h-56 items-end">
                  <img src="/images/site.png" className="mb-8" width={174} height={162}/>
                </div>
                <Text className="mb-4" type='20-600'>Le site</Text>
                <Text className="text-gray-6f" type="16-500">Type de site, Puissance du site, Adresse ou Coordonnés GPS, Caracteristiques du site.</Text>
              </div>
              <div className="text-center grid w-66">
                <div className="flex justify-center  h-44 items-end">
                  <img src="/images/bancaire2.png" className="mb-8" width={174} height={137}/>
                </div>
                <Text className="mb-4" type='20-600'>Vos informations bancaires</Text>
                <Text className="text-gray-6f" type="16-500">Vos coordonnéees bancaires (RIB)</Text>
              </div>
            </div>
            <br/>
            <div className="flex justify-center mt-24 space-x-2 ">
                <button type="submit" style={{ backgroundColor: "#5819F1" }} className="px-4 py-3 text-xs font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none"
                  onClick={()=>onStepChange(0)}
                >
                Démarrer
                </button>
            </div>
        </>
      ) : (
        <>
          <form>
            <Steps
              type='navigation'
              size='small'
              current={step}
              onChange={()=>onStepChange}
              className='site-navigation-steps'
              items={steps}
            />
            <div className='flex justify-center mt-4'>
            {renderStepperContent()}
            </div>
            <div className='flex mt-10 space-x-4 justify-center'>
              <button
                type='button'
                className='inline-block px-4 py-3 text-sm font-semibold leading-tight text-violet-bohr bg-transparent border-2 border-violet-bohr rounded-lg shadow-md outline-none focus:shadow-lg focus:ring-0 active:bg-violet-bohr active:shadow-lg'
                onClick={()=>onStepChange(-1)}
              >
                Retour
              </button>
              {
                step == 4 ?
                <button
                  type='submit'
                  className='inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg'
                  onClick={() => onSubmit()}
                >
                  Valider
                </button>
              :<button
                  type='submit'
                  className='inline-block bg-violet-bohr px-4 py-3 text-sm font-semibold leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-bohr active:shadow-lg'
                  onClick={()=>onStepChange(step+1)}
                >
                  Valider
                </button>
              }
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default AddSite
