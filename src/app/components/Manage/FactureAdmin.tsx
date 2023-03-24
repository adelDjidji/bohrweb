import React, { lazy, useEffect, useState, Suspense } from "react"
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import SelectDropdown from "../SelectDropdown"
import { fetchCompanies, FetchUploadFile } from "../../redux/actions/commun"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import ApiService from "../../services/ApiService";

const { Dragger } = Upload;





export default function FactureAdmin() {



  const customRequest = async ({ onSuccess, onError, file }) => {
    console.log('custom request',file)
    const data= new FormData()
    data.append('file',file)
    data.append('id_site',selectedSPV.public_id)
    console.log('custom request data',data)
    const config= {
      "headers": {
        "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
      }
    }

    // const resp = await ApiService.UploadInvoice(data)
    //     if(resp.status==200){
    //       console.log('FetchUploadFile',resp.data)
    //     }

    const resp = await ApiService.UploadFile(data)
        if(resp.status==200){
          onSuccess(null, file);
        }

  };

  const onChange = (info) => {
     const { status } = info.file;
      if (status !== 'uploading') {
        console.log(status,info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
  };


  // const props: UploadProps = {
  //   name: 'file',
  //   multiple: true,
  //   customRequest:{customRequest},
  //   onChange(info) {
  //     const { status } = info.file;
      
  //     if (status !== 'uploading') {
  //       console.log(status,info.file, info.fileList);
  //     }
  //     if (status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log('Dropped files', e.dataTransfer.files);
  //   },
  // };

  const dispatch = useDispatch()
  const commun = useSelector((state: RootStateOrAny) => state.commun)

  useEffect(() => {
    dispatch(fetchCompanies())
    const companies = commun.companies?.map(item => { return {...item, name : item.name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())} })
    setSPV(companies)
  }, [])

  const [SPV, setSPV] = useState(commun.companies)
  const [selectedSPV, setSelectedSPV] = useState(Array())

  const handleSelectSPV = val => {
    setSelectedSPV(val)
  }

  return (

    <Suspense fallback = { <div> Please Wait... </div> } >

    <div className="UserTable px-6 py-4 rounded-xl bg-white">
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
          Facture
        </div>
      </div>

      <SelectDropdown
            items={SPV}
            keyAttribute="public_id"
            valueAttribute="name"
            defaultValues={selectedSPV}
            onSelect={handleSelectSPV}
            placeholder="Sélectionnez un SPV / Société"
            type={"radio"}
      />

      <div style={{marginTop:"20px"}}>
      <Dragger 
        customRequest= {customRequest}
        onChange={onChange}>

            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
      </Dragger>
      </div>


    </div>

    </Suspense>
  )
}
