import { SetStateAction, useEffect, useState } from "react"
import { Space, Table, Pagination, Modal, Row, Col } from "antd"
import { Colors, Icon, IconNames } from "../Icon"
import SelectDropdown from "../SelectDropdown"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchInvoices } from "../../redux/actions"
import dayjs from "dayjs"
import { DateSelector } from "../DateSelector"
import UserService from "../../services/UserService"
const url = process.env.GATSBY_API_URL

const FacturesTable = ({ enabledFilters = ["site"], showExport = true }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { data, loading } = useSelector(
    (state: RootStateOrAny) => state.invoices
  )
  const [showedData, setShowedData] = useState()
  const { sites } = useSelector((state: RootStateOrAny) => state.commun)
  const dispatch = useDispatch()
  const [modalPdfOpen, setmodalPdfOpen] = useState(false)
  const headers = {
    Authorization: `Bearer ${UserService.getToken()}`,
  }

  const [pdfContent, setPdfContent] = useState(null)

  async function handleViewClick(record) {
    const downloadurl = `${url}accounts/get_invoice`

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

  const handleCloseModalPdf = () => {
    setmodalPdfOpen(false)
  }

  useEffect(() => {
    dispatch(fetchInvoices())
  }, [])

  useEffect(() => {
    setShowedData(data)
  }, [data])

  function handleDownloadClick(record) {
    fetch(`${url}accounts/get_invoice`, { headers })
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
        link.download = `Invoice-${record.site}-${record.creation_date}.pdf`
        link.click()

        // Clean up the temporary URL object
        URL.revokeObjectURL(url)
      })
      .catch(error => {
        console.error("Failed to download PDF:", error)
      })
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "creation_date",
      key: "creation_date",
      responsive: ["sm"],
      width: 200,
      render: (_, { creation_date }) => (
        <b>{dayjs(creation_date).locale("fr").format("MMMM YYYY")}</b>
      ),
    },
    {
      title: "Site",
      dataIndex: "site",
      width: 200,
      key: "site",
    },
    {
      title: "Montant",
      dataIndex: "amount",
      key: "amount",
      render: (_, { amount }) => <span>{amount.toLocaleString("fr")} €</span>,
      responsive: ["lg"],
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
    roles: [],
    companies: [],
    sites: [],
  })

  const handleFilterBySite = sites => {
    //filter data by site
    let sites_ = sites.map(r => r.key)
    setfilters({ ...filters, sites: sites_ })
    if (sites_.length) {
      setShowedData(data.filter(row => sites_.includes(row.site))) // one filter
    } else setShowedData(data)
  }

  const [start_time, setstart_time] = useState()
  const [end_time, setend_time] = useState()

  useEffect(() => {
    var selection: any = true
    if (end_time && start_time)
      selection = row =>
        dayjs(row.creation_date).isAfter(dayjs(start_time)) &&
        dayjs(row.creation_date).isBefore(dayjs(end_time))
    else {
      if (start_time && !end_time) {
        selection = row => dayjs(row.creation_date).isAfter(dayjs(start_time))
      }
      if (!start_time && end_time) {
        selection = row => dayjs(row.creation_date).isBefore(dayjs(end_time))
      }
      if (!start_time && !end_time) {
        selection = row => true
      }
    }

    setShowedData(data?.filter(selection))
  }, [start_time, end_time])

  function dateFilterPlaceholder() {
    var placeholder = "Filtrer par date"
    if (end_time && start_time)
      placeholder =
        dayjs(start_time).format("DD MMM YYYY") +
        " à " +
        dayjs(end_time).format("DD MMM YYYY")
    else {
      if (start_time && !end_time) {
        placeholder = "Après " + dayjs(start_time).format("DD MMM YYYY")
      }
      if (!start_time && end_time) {
        placeholder = "Avant " + dayjs(end_time).format("DD MMM YYYY")
      }
    }
    return placeholder
  }
  if (loading) return null
  return (
    <div className="UserTable px-6 py-4 rounded-xl bg-white">
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
          Factures ({showedData?.length})
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
          {selectedRowKeys.length > 1 && (
            <button
              className="bg-violet-bohr text-white flex items-center justify-center py-2.5 px-4 rounded-lg"
              type="button"
              onClick={() => {
                // setSelecteduser(null)
                // setModalUserOpen(true)
              }}
            >
              <span className="ml-2.5">Tout télécharger</span>
            </button>
          )}
          {enabledFilters.includes("site") && (
            <div className="flex justify-center">
              <SelectDropdown
                placeholder="Filtrer par site"
                keyAttribute="public_id"
                valueAttribute="name"
                width={196}
                items={sites}
                onSelect={handleFilterBySite}
              />
            </div>
          )}
          <div className="flex justify-center">
            <SelectDropdown
              placeholder={dateFilterPlaceholder()}
              width={196}
              items={[]}
              // onSelect={handleFilterBySite}
              FooterComponent={
                <Row className="flex items-center" gutter={24}>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                      Date de début
                    </label>
                    <DateSelector
                      // defaultValue={start_time}
                      onDateChange={date => {
                        setstart_time(date)
                      }}
                      format="YYYY-MM-DD"
                    />
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12}>
                    <label className="block mt-8 mb-2 text-sm font-medium text-dark-grey dark:text-white">
                      Date de Fin
                    </label>
                    <DateSelector
                      // defaultValue={end_time}
                      onDateChange={date => {
                        setend_time(date)
                      }}
                      format="YYYY-MM-DD"
                    />
                  </Col>
                </Row>
              }
              footerClickExitEvent={false}
            />
          </div>
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
          rowKey={"site"}
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
export default FacturesTable
