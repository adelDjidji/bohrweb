import "./UserTable.css"
import { SetStateAction, useEffect, useState } from "react"
import { Space, Table, Pagination, Modal } from "antd"
import { Colors, Icon, IconNames } from "../Icon"
// import { roles } from "../../utils/constants"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import ApiService from "../../services/ApiService"
import { ExclamationCircleFilled } from "@ant-design/icons"
import {
  fetchProducts,
} from "../../redux/actions/commun"
import moment from "moment"
import { successMessage } from "../../redux/actions"
import { setCurrentUser } from "../../redux/actions/auth"
import { persistor } from "../.."


const { confirm } = Modal

const ProductTable = ({
  enabledFilters = ["company", "role"],
  showExport = true,
  isGestion = false,
}) => {


  var columns = [
    {
      title: "Product",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <b>{moment(createdAt).format('YYYY/MM/DD HH:mm:ss')}</b>
      ),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Pennylane Integrated",
      dataIndex: "invoice_sync",
      key: "invoice_sync",
      render: (_, { invoice_sync }) => (
        <b>{invoice_sync ? 'True' : 'False'}</b>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, public_id) => (
        <Space size="middle">
          <Icon
            title="Supprimer"
            color={Colors.primary}
            className={"cursor-pointer"}
            onClick={() => handleDelete(public_id)}
            name={IconNames.delete}
          />
        </Space>
      ),
    },
  ]

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { list: users, loading, error } = useSelector(
    (state: RootStateOrAny) => state.users
  )

  const commun = useSelector(
    (state: RootStateOrAny) => state.commun
  )


  const [showedData, setShowedData] = useState(commun.products)
  const [columns_, setcolumns_] = useState(columns)
  const dispatch = useDispatch()

  
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    setShowedData(commun.products)
  }, [commun.products])

  useEffect(() => {
    if (isGestion) {
      columns.splice(columns.length - 1, 0, last_login)
      setcolumns_(columns)
    }
  }, [isGestion])


  const deleteProduct = async (public_id: string) => {
    const resp = await ApiService.DeleteProduct({ public_id })
    if (resp.status == 200) {
      dispatch(fetchProducts())
      setShowedData(products)
    }
  }
  
  
  const handleDelete = public_id => {
    confirm({
      title: "Etes-vous sûr de supprimer ce produit ?",
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        deleteProduct(public_id)
      },
      onCancel() {
        
      },
    })
  }

  const onSelectChange = (newSelectedRowKeys: SetStateAction<never[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // if(loading) return null
  return (
    <div className="UserTable px-6 py-4 rounded-xl bg-white">
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
          Products ({showedData?.length})
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">

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
          rowKey={"label"}
          pagination={false}
          rowSelection={rowSelection}
          columns={columns_}
          dataSource={showedData?.slice(
            (pageIndex - 1) * pageSize,
            pageIndex * pageSize
          )}
        />
      }
    </div>
  )
}
export default ProductTable
