export interface User {
  id: number;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  followerCount?: number;
  followingCount?: number;
}

export interface Murmur {
  id: number;
  userId: number;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}
