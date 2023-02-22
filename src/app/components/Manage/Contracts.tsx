import { SetStateAction, useEffect, useState } from "react"
import { Space, Table, Pagination, Modal } from "antd"
import { Colors, Icon, IconNames } from "../Icon"
import SelectDropdown from "../SelectDropdown"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchContracts } from "../../redux/actions"
import UserService from "../../services/UserService"

const url = process.env.GATSBY_API_URL


const ContractsTable = ({
  enabledFilters = ["site"],
  showExport = true,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [showedData, setShowedData] = useState()
  const { sites } = useSelector((state: RootStateOrAny) => state.commun)
  const { data, loading } = useSelector(
    (state: RootStateOrAny) => state.contracts
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchContracts())
  }, [])
  useEffect(() => {
    setShowedData(data)
  }, [data])
  
  const headers = {
    Authorization: `Bearer ${UserService.getToken()}`,
  }
  const [modalPdfOpen, setmodalPdfOpen] = useState(false)
  const [pdfContent, setPdfContent] = useState(null)

  async function handleViewClick(record) {
    const downloadurl = `${url}accounts/get_contract`

    try {
      const response = await fetch(downloadurl, { headers })
      const blob = await response.blob()

      // Create a URL object from the blob and set it as the source of the iframe in the Modal
      const objectURL = URL.createObjectURL(blob)
      const iframe = document.createElement("iframe")
      iframe.src = objectURL
      iframe.style.width = "100%"
      iframe.style.height = "500px"

      setmodalPdfOpen(true)
      setPdfContent(
        <div style={{ height: "100vh" }}>
          <iframe
            src={objectURL}
            style={{ width: "90%", height: "100%", margin: "auto" }}
          />
        </div>
      )
    } catch (error) {
      console.error(error)
    }
  }


  function handleDownloadClick(record) {
    fetch(`${url}accounts/get_contract`, { headers })
      .then(response => {
        // Convert the response to a blob object
        return response.blob()
      })
      .then(blob => {
        // Create a temporary URL object from the blob
        const url = URL.createObjectURL(blob)

        // Create a link and click it to download the PDF
        const link = document.createElement("a")
        link.href = url
        link.download = `${record.name}-${record.site}.pdf`
        link.click()

        // Clean up the temporary URL object
        URL.revokeObjectURL(url)
      })
      .catch(error => {
        console.error("Failed to download PDF:", error)
      })
  }

  const handleCloseModalPdf = () => {
    setmodalPdfOpen(false)
  }

  const columns = [
    {
      title: "Nom du contrat",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (_, { name }) => <b>{name}</b>,
    },
    {
      title: "Site",
      dataIndex: "site",
      width: 200,
      responsive: ["md"],
      key: "site",
    },
    {
      title: "Date de création",
      dataIndex: "creation_date",
      key: "creation_date",
      responsive: ["lg"],
      width: 250,
    },

    {
      title: "",
      key: "action",
      width: 100,
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

  const onSelectChange = (newSelectedRowKeys: SetStateAction<never[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setfilters] = useState({
    sites: [],
  })

  const handleFilterBySite = sites => {
    //filter data by site
    let sites_ = sites.map(r => r.name)
    setfilters({ ...filters, sites: sites_ })
    if (sites_.length) {
      setShowedData(data.filter(row => sites_.includes(row.site))) // one filter
    } else setShowedData(data)
  }

  if (loading) return null

  return (
    <div className="UserTable px-6 py-4 rounded-xl bg-white">
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
        Contrats ({showedData?.length || 0})
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
          
          {enabledFilters.includes("site") && (
            <div className="flex justify-center">
              <SelectDropdown
                placeholder="Filtrer par site"
                width={196}
                keyAttribute="public_id"
                valueAttribute="name"
                items={sites}
                onSelect={handleFilterBySite}
              />
            </div>
          )}
          <Pagination
            pageSize={pageSize}
            current={pageIndex}
            total={showedData?.length}
            onChange={(page: any, size: any) => {
              setPageIndex(page)
              setPageSize(size)
            }}
          />
        </div>
      </div>
      {
        <Table
          loading={loading}
          rowKey={"key"}
          pagination={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={showedData?.slice(
            (pageIndex - 1) * pageSize,
            pageIndex * pageSize
          )}
        />
      }
      <Modal
        className="modal-fullscreen rounded-none h-full w-full p-0 m-0 all-Campton"
        open={modalPdfOpen}
        onCancel={handleCloseModalPdf}
        bodyStyle={{ minHeight: "100vh" }}
        width="100%"
        footer={null}
      >
        {pdfContent}
      </Modal>
    </div>
  )
}
export default ContractsTable
