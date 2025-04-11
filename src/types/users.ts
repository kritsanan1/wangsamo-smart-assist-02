
export type SortDirection = 'asc' | 'desc';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  last_login?: string;
}

export interface UsersResponse {
  users: User[];
  count: number;
}

export interface UserFilters {
  search?: string;
  role?: string;
  page: number;
  perPage: number;
  sortField: 'id' | 'name' | 'email';
  sortDirection: SortDirection;
}
