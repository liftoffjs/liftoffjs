import * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lo-login-form": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "lo-register-form": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export const MasterLayout: React.FC = (props) => (
  <body>
    {props.children}

    <script src="/assets/js/LoginForm.js"></script>
    <script src="/assets/js/RegisterForm.js"></script>
  </body>
);
