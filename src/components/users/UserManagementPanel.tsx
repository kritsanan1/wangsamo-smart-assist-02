
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

const UserManagementPanel: React.FC<UserManagementPanelProps> = ({ initialUsers = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'id' | 'name' | 'email'>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();

  // ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้จาก Supabase
  const fetchUsers = async ({
    search,
    role,
    page,
    perPage,
    sortField,
    sortDirection
  }: UserFilters): Promise<UsersResponse> => {
    // คำนวณช่วง (range) สำหรับการแบ่งหน้า (pagination)
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;

    // เริ่มต้นด้วยการสร้าง query ที่เลือกเฉพาะคอลัมน์ที่จำเป็น (ไม่ใช้ SELECT *)
    let query = supabase
      .from('users')
      .select('id, name, email, role', { count: 'exact' });

    // เพิ่มเงื่อนไขค้นหาถ้ามี search term
    if (search) {
      // ใช้ ilike ซึ่งจะใช้ index ถ้าเราสร้าง trigram index สำหรับคอลัมน์เหล่านี้
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    // กรองตาม role ถ้าระบุ
    if (role) {
      query = query.eq('role', role);
    }

    // เรียงลำดับข้อมูล (ใช้ index เพื่อการเรียงลำดับที่มีประสิทธิภาพ)
    query = query.order(sortField, { ascending: sortDirection === 'asc' });

    // จำกัดผลลัพธ์ด้วย range สำหรับ pagination
    query = query.range(start, end);

    // ส่ง query ไปยัง Supabase
    const { data, error, count } = await query;

    // จัดการกับข้อผิดพลาด
    if (error) {
      console.error("Error fetching users:", error);
      throw new Error(error.message);
    }

    return { 
      users: data as User[],
      count: count || 0
    };
  };

  // ใช้ React Query สำหรับการ fetch ข้อมูลและ caching
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

  // อัพเดต totalCount เมื่อข้อมูลเปลี่ยน
  useEffect(() => {
    if (data) {
      setTotalCount(data.count);
    }
  }, [data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); // รีเซ็ตหน้าเมื่อมีการค้นหาใหม่
  };

  const handleSort = (field: 'id' | 'name' | 'email') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1); // รีเซ็ตหน้าเมื่อมีการเปลี่ยนการเรียงลำดับ
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = async (updatedUser: User) => {
    try {
      // ใช้ upsert ซึ่งจะ update ถ้ามี id ที่เท่ากัน หรือ insert ถ้าไม่มี
      const { error } = await supabase
        .from('users')
        .upsert(updatedUser);
      
      if (error) throw error;
      
      toast({
        title: "บันทึกสำเร็จ",
        description: `อัปเดตข้อมูลผู้ใช้ ${updatedUser.name} เรียบร้อยแล้ว`,
        variant: "default",
      });
      
      setSelectedUser(null);
      refetch(); // ดึงข้อมูลใหม่หลังจากบันทึก
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
      const userToDelete = data?.users.find(user => user.id === userId);
      if (!userToDelete) return;
      
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
      
      toast({
        title: "ลบผู้ใช้สำเร็จ",
        description: `ลบข้อมูลผู้ใช้ ${userToDelete.name} เรียบร้อยแล้ว`,
        variant: "default",
      });

      refetch(); // ดึงข้อมูลใหม่หลังจากลบ
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: `ไม่สามารถลบข้อมูลผู้ใช้ได้: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // ใช้ข้อมูลจาก React Query หรือ initialUsers ถ้าเป็นโหมด fallback
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
