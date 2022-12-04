import React from 'react';
import './UserSidebar.css';

export default function UserSidebar() {
  return (
    <div
      className="w-236p bg-white fixed top-0 left-0 h-full  pt-32px pb-35px"
      style={{ boxShadow: '6px 6px 54px rgba(0, 0, 0, 0.05)' }}
    >
      <div className="flex items-center gap-5px pl-32px">
        <img src="/icons/icon-72x72.png" alt="logo" className="w-40px h-40px" />
        <p className="text-base w-1/3 font-semibold text-violet-bohr">
          Bohr Energie
        </p>
      </div>
      <ul className="space-y-2 mt-6 font-semibold leading-[16.3px] text-[14px]">
        <div className="relative sidebar-link-container-parent">
          <li className="pl-32px sidebar-link-container ">
            <a
              href="#"
              className="flex items-center py-10px text-base  text-gray-900 rounded-lg dark:text-white hover:text-[#5819F1] sidebar-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                  fill="#1E293B"
                />
                <path
                  d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                  fill="#1E293B"
                />
                <path
                  d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                  fill="#1E293B"
                />
                <path
                  d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                  fill="#1E293B"
                />
              </svg>
              <span className="ml-3 text-14px">Espace client</span>
            </a>
          </li>
        </div>
        <div className="relative sidebar-link-container-parent">
          <li className="pl-32px sidebar-link-container">
            <a
              href="#"
              className="flex items-center py-10px text-base  text-gray-900 rounded-lg dark:text-white hover:text-[#5819F1] sidebar-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 6V5C6 3.34315 7.34315 2 9 2H11C12.6569 2 14 3.34315 14 5V6H16C17.1046 6 18 6.89543 18 8V11.5708C15.5096 12.4947 12.8149 12.9999 10 12.9999C7.18514 12.9999 4.49037 12.4947 2 11.5707V8C2 6.89543 2.89543 6 4 6H6ZM8 5C8 4.44772 8.44772 4 9 4H11C11.5523 4 12 4.44772 12 5V6H8V5ZM9 10C9 9.44772 9.44772 9 10 9H10.01C10.5623 9 11.01 9.44772 11.01 10C11.01 10.5523 10.5623 11 10.01 11H10C9.44772 11 9 10.5523 9 10Z"
                  fill="#1E293B"
                />
                <path
                  d="M2 13.6923V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V13.6923C15.4872 14.5404 12.7964 14.9999 10 14.9999C7.20363 14.9999 4.51279 14.5404 2 13.6923Z"
                  fill="#1E293B"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap text-14px">
                Gestion utilisateur
              </span>
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}
