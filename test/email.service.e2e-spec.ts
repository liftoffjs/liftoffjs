import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { EmailModule } from '../src/email/email.module';
import { CommonModule } from '../src/common';
import { EmailService } from '../src/email/services';
import { ResetPasswordEmail } from '../src/auth/emails/ResetPassword';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EmailModule, CommonModule],
    }).compile();

    app = moduleFixture.createNestApplication();
  });

  it('sends an email', async () => {
    await app.get(EmailService).sendMail({
      to: "ritter@kerryritter.com",
      subject: "liftoffjs e2e email test",
      text: "this is just a test",
      tsx: {
        component: ResetPasswordEmail,
        props: {},
      }
    });
  });
});
