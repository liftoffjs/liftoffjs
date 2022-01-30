import * as React from "react";
import { MasterLayout } from '../../common';

export interface LoginViewProps {
  name: string;
  title: string;
}

const LoginView = ({ name, ...props }: LoginViewProps): React.ReactElement => (
  <MasterLayout>
    <div>Hello {name}</div>
  </MasterLayout>
);

export default LoginView;