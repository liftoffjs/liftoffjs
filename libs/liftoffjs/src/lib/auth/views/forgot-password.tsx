import * as React from 'react';
import { Card, FormField, MasterLayout, PrimaryButton } from '../../common';

export interface ForgotPasswordViewProps {
  token: string;
}

export const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = props => (
  <MasterLayout contain={true}>
    <lo-forgot-password-form redirect-to="/">
      <Card>
        <FormField label="Username or email" for="usernameOrEmail" inputAttrs={{ required: true }} />
        <PrimaryButton>
          Request password reset
        </PrimaryButton>
      </Card>
    </lo-forgot-password-form>
  </MasterLayout>
);
