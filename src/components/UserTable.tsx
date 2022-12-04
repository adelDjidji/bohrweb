import arrow from '../images/left-arrow.svg';
import UserTableData from './UserTableData';
import { demoUserData } from './UserTableData';
import UserTableHeader from './UserTableHeader';
import './UserTable.css';
import { Space, Table, Pagination, } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import copy from '../images/copy-clipboard-icon.svg';
import edit from '../images/edit-icon.svg';
import trash from '../images/trash-icon.svg';
import { useState } from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserTable = () => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const hitCount = 10;

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };


  const columns: ColumnsType<DataType> = [
    {
      title: 'Enterprise',
      dataIndex: 'entreprise',
      key: 'entreprise',
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rôle',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Sites',
      dataIndex: 'sites',
      key: 'sites',
    },
    {
      title: 'Invité par',
      dataIndex: 'invite',
      key: 'invite',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <img src={copy} alt="" className="cursor-pointer" />
          <img src={edit} alt="" className="mt-[6px] cursor-pointer" />
          <img src={trash} alt="" className="cursor-pointer" />
        </Space>
      ),
    },
  ];
  return (
    <div className="UserTable px-[24px] rounded-[12px] mt-[16px] bg-white">
      <div className="flex justify-between  items-center py-[17px]">
        <div>Utilisateurs (48)</div>
        <div className="flex gap-[16px]">
          <div>
            <div className="flex justify-center">
              <div>
                <div className="dropdown relative">
                  <button
                    className="
                    text-[#6F729C] bg-white hover:text-[#5819F1] border border-[#E8E7EF] rounded-[8px]
                      dropdown-toggle
                      px-6
                      py-2.5
                      font-medium
                      text-xs
                      leading-tight
                      
                      active:text-white
                      transition
                      duration-150
                      ease-in-out
                      flex
                      items-center
                      whitespace-nowrap"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filtrer par entreprise
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="caret-down"
                      className="w-2 ml-2"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          
          m-0
          bg-clip-padding
          border-none
        "
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                        href="#"
                      >
                        Another action
                      </a>
                    </li>
                    <li>
                      <a
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                        href="#"
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <div>
                <div className="dropdown relative">
                  <button
                    className="
                    text-[#6F729C] bg-white hover:text-[#5819F1] border border-[#E8E7EF] rounded-[8px]
          dropdown-toggle
          px-6
          py-2.5
          font-medium
          text-xs
          leading-tight
          
          active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filtrer par rôle
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="caret-down"
                      className="w-2 ml-2"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                      ></path>
                    </svg>
                  </button>
                  <ul
                    className="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          
          m-0
          bg-clip-padding
          border-none
        "
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                        href="#"
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                        href="#"
                      >
                        Another action
                      </a>
                    </li>
                    <li>
                      <a
                        className="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                        href="#"
                      >
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Pagination current={pageIndex} total={hitCount} onChange={(page: any, size: any) => { setPageIndex(page); setPageSize(size) }} />
        </div>
      </div>
      {/* <UserTableHeader />
      <UserTableData demoUserData={demoUserData} /> */}
      <div>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          pagination={false}
          dataSource={demoUserData} />
      </div>
    </div>
  );
};
export default UserTable;
