
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import UserList from './UserList';
import UserProfileEdit from './UserProfileEdit';
import { User, SortDirection, UserFilters, UsersResponse } from '@/types/users';

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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    try {
      setIsLoading(true);
      
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
    } catch (err) {
      console.error('Error fetching users:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await fetchUsers({
          search: searchQuery,
          page,
          perPage,
          sortField,
          sortDirection
        });
        setUsers(result.users);
        setTotalCount(result.count);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
      }
    };
    
    getUsers();
  }, [searchQuery, page, perPage, sortField, sortDirection]);

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
      setIsLoading(true);
      
      // Use mock data update for now
      const userIndex = mockUsers.findIndex(u => u.id === updatedUser.id);
      if (userIndex >= 0) {
        mockUsers[userIndex] = updatedUser;
      }
      
      // Update the current users list if the updated user is in view
      setUsers(currentUsers => 
        currentUsers.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      
      toast({
        title: "บันทึกสำเร็จ",
        description: `อัปเดตข้อมูลผู้ใช้ ${updatedUser.name} เรียบร้อยแล้ว`,
        variant: "default",
      });
      
      setSelectedUser(null);
    } catch (error: any) {
      console.error("Error saving user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: `ไม่สามารถบันทึกข้อมูลผู้ใช้ได้: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      setIsLoading(true);
      
      // Use mock data deletion for now
      const userToDelete = mockUsers.find(user => user.id === userId);
      if (!userToDelete) return;
      
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex >= 0) {
        mockUsers.splice(userIndex, 1);
      }
      
      // Update the current users list
      setUsers(currentUsers => 
        currentUsers.filter(user => user.id !== userId)
      );
      
      toast({
        title: "ลบผู้ใช้สำเร็จ",
        description: `ลบข้อมูลผู้ใช้ ${userToDelete.name} เรียบร้อยแล้ว`,
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: `ไม่สามารถลบข้อมูลผู้ใช้ได้: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          error={error || undefined}
          currentPage={page}
          totalPages={Math.ceil(totalCount / perPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default UserManagementPanel;
