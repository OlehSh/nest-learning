import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private config: ConfigService) {}

  getHash(str: string): string {
    return bcrypt.hashSync(str, this.config.get('saltRounds'));
  }

  validateHash(str: string, hash: string): boolean {
    return bcrypt.compareSync(str, hash);
  }
}
