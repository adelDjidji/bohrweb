import React from 'react';
import UserCard from '../components/UserCard';
import UserLayout from '../components/UserLayout';
import UserTable from '../components/UserTable';

export default function Users() {
  return (
    <UserLayout>
      <UserCard>
        <UserTable />
      </UserCard>
    </UserLayout>
  );
}
