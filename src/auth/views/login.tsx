import * as React from "react";
import { MasterLayout } from '../../common';

export interface LoginViewProps {
}

const LoginView: React.FC<LoginViewProps> = (props) => (
  <MasterLayout>
    <lo-login-form set-cookie="true">
      <input name="username" type="text" />
      <input name="password" type="password" />
      <input type="submit" value="Submit" />
    </lo-login-form>
  </MasterLayout>
);

export default LoginView;