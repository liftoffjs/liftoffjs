import * as React from "react";
import { MasterLayout } from '../../common';

export interface RegisterViewProps {
}

const RegisterView: React.FC<RegisterViewProps> = (props) => (
  <MasterLayout>
    <lo-register-form set-cookie="true">
      <input name="email" type="text" />
      <input name="username" type="text" />
      <input name="password" type="password" />
      <input type="submit" value="Submit" />
    </lo-register-form>
  </MasterLayout>
);

export default RegisterView;