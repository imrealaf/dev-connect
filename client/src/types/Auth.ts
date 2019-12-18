import { RouteComponentProps } from "react-router-dom";

export interface IAppProps extends RouteComponentProps {
  authSuccess: any;
  authFail: any;
}

export interface ISignupFormProps {
  signUpSuccess: any;
  signUpFail: any;
}

export type SignUpFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export interface ILoginFormProps {
  loginSuccess: any;
  loginFail: any;
}

export type LoginFormState = {
  email: string;
  password: string;
};

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
};

export type AuthPayload = {
  token: string;
};

export type AuthUserPayload = any;
