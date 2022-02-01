import React from 'react';
import ReactDOM from 'react-dom/server';
import { Injectable } from '@nestjs/common';
import { LiftoffConfig } from '../../common';
import { createTransport, Transporter } from 'nodemailer';

type MailOptions = Parameters<Transporter<any>['sendMail']>[0] & {
  tsx?: {
    component: React.FC;
    props: any;
  };
};

@Injectable()
export class EmailService {
  constructor(private readonly config: LiftoffConfig) {}

  sendMail(mailOptions: MailOptions) {
    const transport = createTransport(
      this.config.email.transport,
      this.config.email.defaults,
    );
    if (mailOptions.tsx) {
      mailOptions.text = null;
      mailOptions.html = this.renderTsx(
        mailOptions.tsx.component,
        mailOptions.tsx.props,
      );
    }
    return transport.sendMail(mailOptions);
  }

  private renderTsx(component: React.FC, props: any): string {
    const element = React.createElement(component, props);
    return ReactDOM.renderToStaticMarkup(element);
  }
}
