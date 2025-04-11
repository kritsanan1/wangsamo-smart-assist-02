
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import UserList from './UserList';
import UserProfileEdit from './UserProfileEdit';
import { User, SortDirection } from '@/types/users';

interface UserManagementPanelProps {
  initialUsers?: User[];
}

const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ initialUsers = [] }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'email'>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Simulated data loading
  useEffect(() => {
    if (initialUsers.length === 0) {
      // Mock users for demo purposes
      const demoUsers: User[] = [
        { id: 1, name: 'สมชาย ใจดี', email: 'somchai@example.com', role: 'user' },
        { id: 2, name: 'วันดี มีสุข', email: 'wandee@example.com', role: 'admin' },
        { id: 3, name: 'มานะ ตั้งใจ', email: 'mana@example.com', role: 'moderator' },
        { id: 4, name: 'สมหญิง รักเรียน', email: 'somying@example.com', role: 'user' },
        { id: 5, name: 'สมศักดิ์ มีศักดิ์ศรี', email: 'somsak@example.com', role: 'user' },
      ];
      setUsers(demoUsers);
    }
  }, [initialUsers]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (field: 'id' | 'name' | 'email') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    try {
      // In a real application, this would be an API call
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
      
      toast({
        title: "บันทึกสำเร็จ",
        description: `อัปเดตข้อมูลผู้ใช้ ${updatedUser.name} เรียบร้อยแล้ว`,
        variant: "default",
      });
      
      setSelectedUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลผู้ใช้ได้ โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    try {
      // In a real application, this would be an API call
      const userToDelete = users.find(user => user.id === userId);
      if (!userToDelete) return;
      
      setUsers(users.filter(user => user.id !== userId));
      
      toast({
        title: "ลบผู้ใช้สำเร็จ",
        description: `ลบข้อมูลผู้ใช้ ${userToDelete.name} เรียบร้อยแล้ว`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบข้อมูลผู้ใช้ได้ โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    }
  };

  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.id.toString().includes(query)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortField === 'id') {
      return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
    } else {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });

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
          users={sortedUsers} 
          searchQuery={searchQuery}
          onSearch={handleSearch}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UserManagementPanel;
