import { User } from './register-user-form.model';

export type LoginResponse = {
  user: User;
  token: string;
};
