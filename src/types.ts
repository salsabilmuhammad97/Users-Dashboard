export interface LoginFormValues {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  access: string;
  refresh: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: AuthUser | null;
  access: string | null;
  refresh: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  address: string;
  picture: string;
}

export interface RandomUserApiResponse {
  results: RandomUserApiUserResponse[];
}

export interface RandomUserApiUserResponse {
  name: { first: string; last: string };
  login: { uuid: string };
  email: string;
  location: {
    city: string;
    state: string;
    country: string;
    street: { number: number; name: string };
  };
  phone: string;
  picture: { large: string };
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface UIState {
  searchQuery: string;
  currentPage: number;
  pageSize: number;
}

export interface ProfileState {
  data: Profile;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface Profile {
  name: string;
  phone: string;
  jobTitle: string;
  experience: number;
  address: string;
  workingHours: string;
}
