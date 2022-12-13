import "./UserTable.css"
import { SetStateAction, useState } from "react"
import { Space, Table, Pagination } from "antd"
import { Colors, Icon, IconNames } from "../Icon"
import SelectFilter from "../Select"
import SelectDropdown from "../SelectDropdown"
import ModalUser from "./ModalUser"

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

export const demoUserData = [
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 1,
  },
  {
    entreprise: "Acme",
    nom: "Carla Poulain",
    email: "carla.poulain@gmail.com",
    role: "Editeur",
    sites: "Assigny, Orlu",
    invite: "Giacomo Guil...",
    key: 2,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 3,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 4,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 5,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 6,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 7,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 8,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 9,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 10,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 11,
  },
  {
    entreprise: "Acme",
    nom: "Carla Poulain",
    email: "carla.poulain@gmail.com",
    role: "Editeur",
    sites: "Assigny, Orlu",
    invite: "Giacomo Guil...",
    key: 12,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 13,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 14,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 15,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 16,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 17,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 18,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 19,
  },
  {
    entreprise: "Acme",
    nom: "Marc Delatour",
    email: "marc..delatour@gmail.com",
    role: "Admin",
    sites: "Tous les sites",
    invite: "Bohr Admin",
    key: 20,
  },
]
const columns = [
  {
    title: "Enterprise",
    dataIndex: "entreprise",
    key: "entreprise",
    responsive: ['sm'],
    render: (_, { entreprise }) => <b>{entreprise}</b>,
  },
  {
    title: "Nom",
    dataIndex: "nom",
    key: "nom",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    responsive: ['lg']
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
    responsive: ['lg']
  },
  {
    title: "Invité par",
    dataIndex: "invite",
    key: "invite",
    responsive: ['lg']
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Icon className="cursor-pointer" name={IconNames.export} />
        <Icon
          className="cursor-pointer"
          color={Colors.primary}
          name={IconNames.edit}
        />
        <Icon className="cursor-pointer" name={IconNames.delete} />
      </Space>
    ),
  },
]

const UserTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [showedData, setShowedData] = useState(demoUserData)

  const onSelectChange = (newSelectedRowKeys: SetStateAction<never[]>) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setfilters] = useState({roles:[], companies:[]})

  const handleFilterByRole = roles => {
    //filter data by roles
    let roles_ = roles.map(r => r.key)
    setfilters({...filters, roles:roles_})
    if (roles_.length){
      if(!filters.companies.length) setShowedData(demoUserData.filter(row => roles_.includes(row.role))) // one filter
      else setShowedData(demoUserData.filter(row => roles_.includes(row.role)&& filters.companies.includes(row.entreprise))) // double filter
    }
    else setShowedData(demoUserData)
  }

  const handleFilterByCompany = companies => {
    //filter data by roles
    let companies_ = companies.map(r => r.key)
    console.log(companies_)
    setfilters({...filters, companies:companies_})
    if (companies_.length){
      if(!filters.roles.length) setShowedData(demoUserData.filter(row => companies_.includes(row.entreprise)))
      else setShowedData(demoUserData.filter(row => filters.roles.includes(row.role)&& companies_.includes(row.entreprise)))
    }
    else setShowedData(demoUserData)
  }


  return (
    <div className="UserTable px-6 py-4 rounded-xl bg-white">
      <div className="md:flex justify-between  items-center pb-4">
        <div className="text-base font-semibold	mb-4 md:mb-0">
          Utilisateurs ({showedData.length})
        </div>
        <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
          <div className="flex justify-center">
            <SelectDropdown
              placeholder="Filtrer par Entreprise"
              width={196}
              items={[
                { key: "Acme", value: "Acme" }
              ]}
              onSelect={handleFilterByCompany}
            />
          </div>
          <div className="flex justify-center">
            <SelectDropdown
              placeholder="Filtrer par rôle"
              width={196}
              items={[
                { key: "Admin", value: "Admin" },
                { key: "Editeur", value: "Editeur" },
                { key: "Visiteur", value: "Visiteur" },
              ]}
              onSelect={handleFilterByRole}
            />
          </div>

          <Pagination
            pageSize={pageSize}
            current={pageIndex}
            total={showedData.length}
            onChange={(page: any, size: any) => {
              setPageIndex(page)
              setPageSize(size)
            }}
          />
        </div>
      </div>
      <Table
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={showedData.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        )}
      />
    </div>
  )
}
export default UserTable
