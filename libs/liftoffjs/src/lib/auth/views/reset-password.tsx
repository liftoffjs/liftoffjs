import * as React from 'react';
import { Card, FormField, MasterLayout, PrimaryButton } from '../../common';

export interface ResetPasswordViewProps {
  token: string;
}

export const ResetPasswordView: React.FC<ResetPasswordViewProps> = props => (
  <MasterLayout contain={true}>
    <lo-reset-password-form redirect-to="/">
      <Card>
        <input type="hidden" name="token" value={props.token} />
        <FormField label="Username" inputAttrs={{ required: true }} />
        <FormField label="New password" for="password" type="password" inputAttrs={{ required: true }} />
        <PrimaryButton>Reset password</PrimaryButton>
      </Card>
    </lo-reset-password-form>
  </MasterLayout>
);
