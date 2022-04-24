import * as React from 'react';
import { Card, FormField, MasterLayout, PrimaryButton } from '../../common';

export interface RegisterViewProps { }

export const RegisterView: React.FC<RegisterViewProps> = props => (
  <MasterLayout contain={true}>
    <lo-register-form set-cookie="true" redirect-to="/">
      <Card>
        <FormField label="Email" type="email" for="email" inputAttrs={{ required: true }} />
        <FormField label="Username" for="username" inputAttrs={{ required: true }} />
        <FormField label="Password" type="password" for="password" inputAttrs={{ required: true }} />
        <PrimaryButton>Register</PrimaryButton>
      </Card>
    </lo-register-form>
  </MasterLayout>
);
