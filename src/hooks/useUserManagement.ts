
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { fetchUsers, mockUsers } from '@/services/mockUserService';
import { User, SortDirection, UserFilters } from '@/types/users';

export const useUserManagement = (initialUsers: User[] = mockUsers) => {
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

  // Fetch users when filters or pagination changes
  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const result = await fetchUsers({
          search: searchQuery,
          page,
          perPage,
          sortField,
          sortDirection
        });
        setUsers(result.users);
        setTotalCount(result.count);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
      } finally {
        setIsLoading(false);
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

  return {
    users,
    searchQuery,
    sortField,
    sortDirection,
    selectedUser,
    isLoading,
    error,
    page,
    totalPages: Math.ceil(totalCount / perPage),
    handleSearch,
    handleSort,
    handleEditUser,
    handleSaveUser,
    handleCancelEdit,
    handleDeleteUser,
    handlePageChange,
  };
};
