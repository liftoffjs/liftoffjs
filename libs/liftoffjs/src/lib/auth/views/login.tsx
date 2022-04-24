import * as React from 'react';
import { MasterLayout, Card, FormField, PrimaryButton } from '../../common';

export interface LoginViewProps {
  error?: boolean;
}

export const LoginView: React.FC<LoginViewProps> = props => (
  <MasterLayout contain={true}>
    <lo-login-form set-cookie="true" redirect-to="/">
      <Card>
        <FormField label="Username or email" for="username" inputAttrs={{ required: true }} />
        <FormField label="Password" for="password" type="password" inputAttrs={{ required: true }} />
        <PrimaryButton>Login</PrimaryButton>
        <a href="/auth/forgot-password" className="block text-white my-2.5">
          Forgot password?
        </a>
      </Card>
    </lo-login-form>
  </MasterLayout>
);
