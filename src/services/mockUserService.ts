
import { User, SortDirection, UserFilters, UsersResponse } from '@/types/users';

// Mock data for users
export const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', created_at: '2023-01-01', last_login: '2023-04-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'moderator', created_at: '2023-01-15', last_login: '2023-04-10' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', created_at: '2023-02-01', last_login: '2023-04-05' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'user', created_at: '2023-02-15', last_login: '2023-03-20' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'moderator', created_at: '2023-03-01', last_login: '2023-04-12' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', role: 'user', created_at: '2023-03-15', last_login: '2023-04-08' },
];

// Simulate fetching users with filtering, sorting, and pagination
export const fetchUsers = async ({
  search,
  role,
  page,
  perPage,
  sortField,
  sortDirection
}: UserFilters): Promise<UsersResponse> => {
  try {
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
  }
};
