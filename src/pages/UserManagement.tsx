
import React from 'react';
import UserManagementPanel from '@/components/users/UserManagementPanel';
import { Toaster } from '@/components/ui/toaster';

const UserManagement: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <UserManagementPanel />
      <Toaster />
    </div>
  );
};

export default UserManagement;
