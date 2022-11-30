import { FC } from 'react';
import '../i18n';
import UserSidebar from './UserSidebar';

interface Props {}
const UserLayout: FC<Props> = ({ children }) => (
  <div className="flex">
    <UserSidebar />
    <div className="w-full" style={{ marginLeft: '236px' }}>
      {children}
    </div>
  </div>
);

export default UserLayout;
