
import React from 'react';
import UserList from './UserList';
import UserProfileEdit from './UserProfileEdit';
import { User } from '@/types/users';
import { useUserManagement } from '@/hooks/useUserManagement';

interface UserManagementPanelProps {
  initialUsers?: User[];
}

const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ initialUsers }) => {
  const {
    users,
    searchQuery,
    sortField,
    sortDirection,
    selectedUser,
    isLoading,
    error,
    page,
    totalPages,
    handleSearch,
    handleSort,
    handleEditUser,
    handleSaveUser,
    handleCancelEdit,
    handleDeleteUser,
    handlePageChange,
  } = useUserManagement(initialUsers);

  return (
    <div className="space-y-6">
      {selectedUser ? (
        <UserProfileEdit 
          user={selectedUser} 
          onSave={handleSaveUser} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <UserList 
          users={users}
          searchQuery={searchQuery}
          sortField={sortField}
          sortDirection={sortDirection}
          onSearch={handleSearch}
          onSort={handleSort}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          isLoading={isLoading}
          error={error || undefined}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserManagementPanel;
