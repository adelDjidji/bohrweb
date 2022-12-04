import plusIcon from '../images/plus-circle.png';
import { FC, useState } from 'react';
import UserSideModal from './UserSideModal';
import 'tw-elements';

interface Props {}

const UserCard: FC<Props> = ({ children }) => {
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <>
      <div className="px-24px py-32px bg-[#F5F6FA]">
        {/* top */}
        <div className="flex justify-between items-center ">
          <h1 className="font-semibold text-[32px] leading-[42px] ">
            Gestion utilisateur
          </h1>
          <button
            className="bg-user-button-color text-white flex items-center justify-center py-10px rounded-[8px] "
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => setShowUserModal((prev) => !prev)}
          >
            <img src={plusIcon} alt="plus-icon" className="px-8px " />
            <span className="pr-16px ">Gestion utilisateur</span>
          </button>
        </div>
        {/* table */}
        <div>{children}</div>
      </div>
      {showUserModal && <UserSideModal />}
    </>
  );
};
export default UserCard;
