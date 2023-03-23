import "./UserTable.css"
import { SetStateAction, useEffect, useState } from "react"
import { Space, Table, Pagination, Modal } from "antd"
import { Colors, Icon, IconNames } from "../Icon"
import SelectDropdown from "../SelectDropdown"
import ModalUser, { SITES } from "./ModalUser"
// import { roles } from "../../utils/constants"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { fetchUsers, loadUsers } from "../../redux/actions/users"
import ApiService from "../../services/ApiService"
import { ExclamationCircleFilled } from "@ant-design/icons"
import {
  fetchCompanies,
  fetchGroups,
  fetchRoles,
  fetchSites,
} from "../../redux/actions/commun"
import moment from "moment"
import { successMessage } from "../../redux/actions"
import { setCurrentUser } from "../../redux/actions/auth"
import { persistor } from "../.."
import { navigate } from "gatsby"

const { confirm } = Modal

const UserTable = ({
  enabledFilters = ["company", "role"],
  handleEdit,
  showExport = true,
  isGestion = false,
}) => {
  const { currentUser } = useSelector((state: RootStateOrAny) => state.auth)

  const last_login = {
    title: "Connexion",
    dataIndex: "last_login",
    key: "last_login",
    render: (_, { last_login }) => moment(last_login).locale("fr").fromNow(),
  }
  const handlUserLogin = (res: any, user) => {
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("user", JSON.stringify({...res.data.userInfo, user_id:user.public_id}))
    dispatch(successMessage("Vous etes a present connecté en tant que "+res.data.userInfo.name))
    dispatch(setCurrentUser({...res.data.userInfo, user_id:user.public_id, root_id:currentUser.user_id}))
    persistor.flush()
    if (user.role === "superadmin") window.location.href='/users' //navigate("/app/users")
    else window.location.href="/" //navigate("/app/")
  }

  const handleLoginAsUser = async (user) => {
    const resp = await ApiService.LoginAsUser({ email:user.email })
    handlUserLogin(resp, user)
    // window.location.reload()
  }
  var columns = [
    {
      title: "Enterprise",
      dataIndex: "company",
      key: "company",
      responsive: ["sm"],
      render: (_, { company }) => (
        <b style={{ textTransform: "capitalize" }}>{company}</b>
      ),
    },
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Rôle",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Sites",
      dataIndex: "sites",
      key: "sites",
      responsive: ["lg"],
    },
    {
      title: "Invité par",
      dataIndex: "invited_by",
      key: "invited_by",
      responsive: ["lg"],
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {showExport && (
            <Icon
              disabled={currentUser.user_id == record.public_id}
              title="Login as user"
              onClick={() => handleLoginAsUser(record)}
              className={
                currentUser.user_id != record.public_id ? "cursor-pointer" : ""
              }
              name={IconNames.export}
            />
          )}
          <Icon
            className={
              currentUser.user_id != record.public_id ? "cursor-pointer" : ""
            }
            title="Modifier"
            color={Colors.primary}
            name={IconNames.edit}
            onClick={() => handleEdit(record)}
            disabled={currentUser.user_id == record.public_id}
          />
          <Icon
            disabled={currentUser.user_id == record.public_id}
            title="Supprimer"
            className={
              currentUser.user_id != record.public_id ? "cursor-pointer" : ""
            }
            onClick={() => handleDelete(record)}
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
  const { companies, sites, roles } = useSelector(
    (state: RootStateOrAny) => state.commun
  )
  const [showedData, setShowedData] = useState(users)
  const [columns_, setcolumns_] = useState(columns)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
    if(currentUser.role==='superadmin') dispatch(fetchGroups())
    dispatch(fetchRoles())
    dispatch(fetchSites())
    dispatch(fetchCompanies())
  }, [])

  useEffect(() => {
    setShowedData(users)
  }, [users])

  useEffect(() => {
    if (isGestion) {
      columns.splice(columns.length - 1, 0, last_login)
      setcolumns_(columns)
    }
  }, [isGestion])

  const deleteUser = async (mail: string) => {
    const resp = await ApiService.DeleteUser({ mail })
    if (resp.status == 200) {
      dispatch(fetchUsers())
      setShowedData(users)
    }
  }
  const handleDelete = record => {
    confirm({
      title: "Etes-vous sûr de supprimer cet utilisateur?",
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk() {
        deleteUser(record.email)
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
  const [filters, setfilters] = useState({
    roles: [],
    companies: [],
    sites: [],
  })

  const handleFilterByRole = roles => {
    //filter data by roles
    let roles_ = roles.map(r => r.key)
    setfilters({ ...filters, roles: roles_ })
    if (roles_.length) {
      if (!filters.companies.length)
        setShowedData(users.filter(row => roles_.includes(row.role)))
      // one filter
      else
        setShowedData(
          users.filter(
            row =>
              roles_.includes(row.role) &&
              filters.companies.includes(row.company)
          )
        ) // double filter
    } else setShowedData(users)
  }

  const handleFilterBySite = sites => {
    //filter data by site
    let sites_ = sites.map(r => r.name)
    setfilters({ ...filters, sites: sites_ })
    if (sites_.length) {
      setShowedData(users.filter(row => sites_.includes(row.sites))) // one filter
    } else setShowedData(users)
  }

  const handleFilterByCompany = companies => {
    //filter data by roles
    let companies_ = companies.map(r => r.name)
    setfilters({ ...filters, companies: companies_ })
    if (companies_.length) {
      if (!filters.roles.length)
        setShowedData(users.filter(row => companies_.includes(row.company)))
      else
        setShowedData(
          users.filter(
            row =>
              filters.roles.includes(row.role) &&
              companies_.includes(row.company)
          )
        )
    } else setShowedData(users)
  }

  // if(loading) return null
  return (
    <div className="UserTable px-6 py-4 rounded-xl bg-white">
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
          Utilisateurs ({showedData?.length})
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
          {enabledFilters.includes("company") && (
            <div className="flex justify-center">
              <SelectDropdown
                placeholder="Filtrer par Entreprise"
                width={196}
                keyAttribute="public_id"
                valueAttribute="name"
                items={companies}
                onSelect={handleFilterByCompany}
              />
            </div>
          )}
          {enabledFilters.includes("role") && (
            <div className="flex justify-center">
              <SelectDropdown
                placeholder="Filtrer par rôle"
                width={196}
                items={roles}
                onSelect={handleFilterByRole}
              />
            </div>
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
          rowKey={"public_id"}
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
export default UserTable
