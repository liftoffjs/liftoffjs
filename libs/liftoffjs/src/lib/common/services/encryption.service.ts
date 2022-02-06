import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class EncryptionService {
  async hash(data: Parameters<typeof hash>[0], salt: Parameters<typeof hash>[1] | null) {
    if (!salt) {
      salt = await this.generateSalt();
    }
    return hash(data, salt);
  }

  generateSalt() {
    return genSalt();
  }

  compare(data: string | Buffer, encrypted: string) {
    return compare(data, encrypted);
  }
}
