import { FC } from 'react';
import copy from '../images/copy-clipboard-icon.svg';
import edit from '../images/edit-icon.svg';
import trash from '../images/trash-icon.svg';

interface Props {
  demoUserData: any;
}
const userTableData: FC<Props> = ({ demoUserData }) => {
  return (
    <div>
      {demoUserData.map(
        ({ entreprise, nom, email, role, sites, invite }: any) => (
          <div className="px-3  bg-white w-full rounded-b-lg">
            <ul className="w-full flex flex-col  text-neutral-9">
              <li className="flex items-center w-full h-[48px]">
                {/* 1 */}
                <div className="hidden md:flex items-center md:justify-start md:w-1/12 lg:w-1/12">
                  <input type="checkbox" />
                </div>
                {/* 2 */}
                <div className="hidden md:flex md:justify-start md:w-2/12 lg:w-2/12 ">
                  <p>{entreprise}</p>
                </div>
                {/* 3 */}
                <div className="flex justify-start  md:w-2/12 lg:w-2/12">
                  <p>{nom}</p>
                </div>
                {/* 4 */}
                <div className="hidden lg:flex justify-start md:w-4/12 lg:w-4/12 ">
                  <p>{email}</p>
                </div>
                {/* 5 */}
                <div className=" flex items-center justify-center md:justify-start md:w-1/12 lg:w-1/12">
                  <p>{role}</p>
                </div>
                {/* 6 */}
                <div className="flex justify-start md:w-2/12 lg:w-2/12">
                  <p>{sites}</p>
                </div>
                {/* 7 */}
                <div className="hidden lg:flex justify-start md:w-2/12 lg:w-2/12 ">
                  <p>{invite}</p>
                </div>
                <div className="flex gap-[8px] items-center justify-center ">
                  <img src={copy} alt="" className="cursor-pointer" />
                  <img src={edit} alt="" className="mt-[6px] cursor-pointer" />
                  <img src={trash} alt="" className="cursor-pointer" />
                </div>
              </li>
              <div className="h-[1px] w-full bg-[#F0F1F5]"></div>
            </ul>
          </div>
        )
      )}
    </div>
  );
};
export default userTableData;

export const demoUserData = [
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Carla Poulain',
    email: 'carla.poulain@gmail.com',
    role: 'Editeur',
    sites: 'Assigny, Orlu',
    invite: 'Giacomo Guil...',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
  {
    entreprise: 'Acme',
    nom: 'Marc Delatour',
    email: 'marc..delatour@gmail.com',
    role: 'Admin',
    sites: 'Tous les sites',
    invite: 'Bohr Admin',
  },
];
