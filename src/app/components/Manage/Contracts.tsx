import React, { useEffect, useState } from "react"
import { Collapse, Col, Row, Avatar, Spin, Tag, Card, Segmented } from "antd"
import { Colors, Icon, IconNames } from "../Icon"
import Text from "../Text"
import "./customStyle.css"
import ModalAssign from "./ModalAssign"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchContracts, fetchSitesDetail } from "../../redux/actions"
import { stringToHexColor } from "../../utils"
import UserService from "../../services/UserService"
import moment from "moment"
import { fetchCompanies } from "../../redux/actions/commun"
import SelectDropdown from "../SelectDropdown"
import { Space, Table, Pagination, Modal } from "antd"
import { UserOutlined } from '@ant-design/icons';


const url = process.env.GATSBY_API_URL

const { Panel } = Collapse

const Contracts = () => {
  
  const commun = useSelector((state: RootStateOrAny) => state.commun)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCompanies())
    if (commun.companies) {
      setSPV(commun.companies)
      setLoading(false)
    }
  }, [])


  const [SPV, setSPV] = useState(Array())
  const [loading, setLoading] = useState(true)
  const [currentSPV, setcurrentSPV] = useState()
  const [modalOpen, setModalOpen] = useState(false)

  console.log('SPV',SPV)

  useEffect(() => {
    if (commun.companies) {
      setSPV(commun.companies)
      setLoading(false)
    }
  }, [commun.companies])

  const onChange = key => {
  }

  const genExtra = spv => (
    <span>
      <Icon
        name="edit"
        onClick={event => {
          //event.stopPropagation()
          setcurrentSPV(spv)
          setModalOpen(true)
        }}
        style={{ right: 25, position: "relative" }}
        className="cursor-pointer"
      />
    </span>
  )

  const PanelHeader = ({ data, len }) => (
    <Row className="flex items-center">
      <Col xs={24} sm={12} md={8} lg={16}>
        <Avatar
          gap={9}
          style={{
            backgroundColor: stringToHexColor(data.name),
            color: "white",
            marginRight: 19,
          }}
          size={40}
        >
          {data.name.toUpperCase().slice(0, 2) }
        </Avatar>
        <Text type="16-600" style={{textTransform: 'capitalize'}}>{data.name} ({len})</Text>
      </Col>
      <Col xs={24} sm={12} md={4} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          Siren
        </Text>
        <Text className="block" type="14-500">
          {data.siren || "-"}
        </Text>
      </Col>
      <Col xs={24} sm={12} md={8} lg={4}>
        <Text className="text-gray-6f" type="12-500">
          TVA
        </Text>
        <Text className="block" type="14-500">
          {data.tva_number || "-"}
        </Text>
      </Col>
    </Row>
  )
  

  const PanelBody = ({ data,dataContract }) => {
      return(    
              <Row className="flex items-center" style={{marginTop:'30px'}}>
                  <Table
                    loading={loading}
                    showHeader ={false}
                    rowKey={"name"}
                    pagination={false}
                    columns={columns}
                    dataSource={dataContract}
                    style={{width:'100%'}}
                  />
              </Row>
            )

  }



  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [showedData, setShowedData] = useState(Array())
  const { sites } = useSelector((state: RootStateOrAny) => state.commun)
  const { data } = useSelector(
    (state: RootStateOrAny) => state.contracts
  )

  useEffect(() => {
    dispatch(fetchContracts())
  }, [])

  useEffect(() => {
    console.log('data contracts',data)
    setShowedData(data)
  }, [data])
  
  const headers = {
    Authorization: `Bearer ${UserService.getToken()}`,
  }
  const [modalPdfOpen, setmodalPdfOpen] = useState(false)
  const [pdfContent, setPdfContent] = useState(null)

  console.log('showedData',showedData)

  const onSelectChange = (newSelectedRowKeys: SetStateAction<never[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }


  const columns = [
    {
      title: "Site",
      dataIndex: "site",
      key: "site",
      responsive: ["sm"],
      width: '10%',
      render: (_, { site }) => (site),
    },
    {
      title: "Nom",
      dataIndex: "contract_label",
      key: "contract_label",
      responsive: ["sm"],
      width: '70%',
      render: (_, { contract_label }) => (contract_label),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      responsive: ["sm"],
      width: '10%',
      render: (_, { createdAt }) => (moment(createdAt).format("DD/MM/YYYY")),
    },
    {
      title: "",
      key: "action",
      width: '10%',
      render: (_, record) => (
        <Space size="middle">
          <Icon
            className="cursor-pointer"
            title="View"
            color={Colors.primary}
            name={IconNames.eye}
            onClick={() => handleViewClick(record)}
          />
          <Icon
            title="Télécharger"
            className="cursor-pointer"
            onClick={() => handleDownloadClick(record)}
            name={IconNames.download}
          />
        </Space>
      ),
    },
  ]


  const handleFilterBySite = sites => {
    //filter data by site
    let sites_ = sites.map(r => r.name)
    setfilters({ ...filters, sites: sites_ })
    if (sites_.length) {
      setShowedData(data.filter(row => sites_.includes(row.site))) // one filter
    } else setShowedData(data)
  }

  const [filters, setfilters] = useState({
    sites: [],
  })

  const [selectedSPV, setSelectedSPV] = useState(Array())

  const handleSelectSPV = val => {
    setSelectedSPV(val.map(i => i.public_id))
  }
  const handleUnselectSPV = val => {
    setSelectedSPV(selectedSPV.filter(i => i!=val))
  }

  console.log('selectedSPV',selectedSPV)

  return (
    <>
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
        Contrats ({showedData?.length || 0})
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
          

            <div className="flex justify-center">
            <SelectDropdown
              items={SPV}
              keyAttribute="public_id"
              valueAttribute="name"
              defaultValues={selectedSPV}
              onSelect={handleSelectSPV}
              placeholder="Sélectionnez un SPV / Société"
            />
            </div>

        </div>



      </div>

      <div className="flex flex-wrap gap-3" style={{marginBottom:'20px'}}>
        {SPV?.filter(
            spv => selectedSPV && selectedSPV.includes(spv.public_id)
          )
          .map(spv => (
            <Tag closable onClose={()=>handleUnselectSPV(spv.public_id)}>{spv.name}</Tag>
          ))}

      </div>



      <Spin spinning={loading}>
        <Collapse
          defaultActiveKey={["0"]}
          onChange={onChange}
          expandIconPosition="end"
          ghost
          collapsible="icon"
          expandIcon={({ isActive }) => (
            <Icon name={isActive ? "arrow-up" : "arrow-down"} />
          )}
        >
          {SPV?.map((spv: any, index: number) => {

      
              if (showedData.filter((i)=>i.company==spv.name).length > 0 && (selectedSPV.includes(spv.public_id) || selectedSPV.length==0 ) ) {


                return (  <Panel
                  header={<PanelHeader data={spv} len={showedData.filter((i)=>i.company==spv.name).length}/>}
                  key={index + ""}
                >
                  <PanelBody data={spv} dataContract={showedData.filter((i)=>i.company==spv.name)}/>
                </Panel>)

              } 

            })}
        </Collapse>
      </Spin>


    </>
  )
}
export default Contracts
