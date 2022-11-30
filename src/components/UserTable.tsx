import arrow from '../images/left-arrow.svg';
import UserTableData from './UserTableData';
import { demoUserData } from './UserTableData';
import UserTableHeader from './UserTableHeader';
import './UserTable.css';

const UserTable = () => {
  return (
    <div className="UserTable px-[24px] rounded-[12px] mt-[16px] bg-white">
      <div className="flex justify-between  items-center py-[17px]">
        <div>Utilisateurs (48)</div>
        <div className="flex gap-[16px]">
          <div>
            <button
              id="dropdownDefault1"
              data-dropdown-toggle="dropdown1"
              className="text-[#6F729C] bg-white hover:text-[#5819F1] border border-[#E8E7EF] rounded-[8px]  focus:outline-none  focus:ring-blue-300 font-medium  text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Filtrer par entreprise
              <svg
                className="ml-2 w-4 h-4 "
                aria-hidden="true"
                fill="none"
                stroke="#6F729C"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdown1"
              className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault1"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="dropdown-2">
            <button
              id="dropdownDefault2"
              data-dropdown-toggle="dropdown2"
              className="text-[#6F729C] bg-white hover:text-[#5819F1] border border-[#E8E7EF] rounded-[8px]  focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Filtrer par rôle
              <svg
                className="ml-2 w-4 h-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <div
              id="dropdown"
              className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
            >
              <ul
                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="user-table-pagination flex justify-center items-center gap-[16px]">
            <img src={arrow} alt="left-arrow" className="left-arrow" />
            <span className="page active-page flex justify-center items-center">
              1
            </span>
            <span className="page flex justify-center items-center">2</span>
            <img src={arrow} alt="right-arrow" className="right-arrow" />
          </div>
        </div>
      </div>
      <UserTableHeader />
      <UserTableData demoUserData={demoUserData} />
    </div>
  );
};
export default UserTable;
