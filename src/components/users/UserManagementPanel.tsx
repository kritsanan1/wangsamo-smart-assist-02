
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import UserList from './UserList';
import UserProfileEdit from './UserProfileEdit';
import { User, SortDirection, UserFilters, UsersResponse } from '@/types/users';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface UserManagementPanelProps {
  initialUsers?: User[];
}

// Mock data for users
const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', created_at: '2023-01-01', last_login: '2023-04-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', created_at: '2023-01-15', last_login: '2023-04-10' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', created_at: '2023-02-01', last_login: '2023-04-05' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'user', created_at: '2023-02-15', last_login: '2023-03-20' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'moderator', created_at: '2023-03-01', last_login: '2023-04-12' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'user', created_at: '2023-03-15', last_login: '2023-04-08' },
];

const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ initialUsers = mockUsers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'email'>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  // Simulate fetching users with filtering, sorting, and pagination
  const fetchUsers = async ({
    search,
    role,
    page,
    perPage,
    sortField,
    sortDirection
  }: UserFilters): Promise<UsersResponse> => {
    // For demonstration purposes, we'll use the mockUsers and apply filtering/sorting/pagination in memory
    
    // Apply search filter
    let filteredUsers = [...mockUsers];
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply role filter
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    // Apply sorting
    filteredUsers.sort((a, b) => {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    // Get total count
    const count = filteredUsers.length;
    
    // Apply pagination
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedUsers = filteredUsers.slice(start, Math.min(end, count));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      users: paginatedUsers,
      count: count
    };
  };

  // Use React Query for data fetching and caching
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['users', searchQuery, page, perPage, sortField, sortDirection],
    queryFn: () => fetchUsers({
      search: searchQuery,
      page,
      perPage,
      sortField,
      sortDirection
    })
  });

  // Update totalCount when data changes
  useEffect(() => {
    if (data) {
      setTotalCount(data.count);
    }
  }, [data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset page when searching
  };

  const handleSort = (field: 'id' | 'name' | 'email') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1); // Reset page when sorting changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      // Use mock data update for now
      const userIndex = mockUsers.findIndex(u => u.id === updatedUser.id);
      if (userIndex >= 0) {
        mockUsers[userIndex] = updatedUser;
      }
      
      toast({
        title: "บันทึกสำเร็จ",
        description: `อัปเดตข้อมูลผู้ใช้ ${updatedUser.name} เรียบร้อยแล้ว`,
        variant: "default",
      });
      
      setSelectedUser(null);
      refetch(); // Refresh data
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: `ไม่สามารถบันทึกข้อมูลผู้ใช้ได้: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      // Use mock data deletion for now
      const userToDelete = mockUsers.find(user => user.id === userId);
      if (!userToDelete) return;
      
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex >= 0) {
        mockUsers.splice(userIndex, 1);
      }
      
      toast({
        title: "ลบผู้ใช้สำเร็จ",
        description: `ลบข้อมูลผู้ใช้ ${userToDelete.name} เรียบร้อยแล้ว`,
        variant: "default",
      });

      refetch(); // Refresh data
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: `ไม่สามารถลบข้อมูลผู้ใช้ได้: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Use data from React Query or initialUsers for fallback
  const users = data?.users || initialUsers;

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
          onSearch={handleSearch}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          isLoading={isLoading}
          error={error ? String(error) : undefined}
          currentPage={page}
          totalPages={Math.ceil(totalCount / perPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserManagementPanel;
