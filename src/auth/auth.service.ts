// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(userId: string): Promise<string> {
    const payload = { sub: userId }; // 'sub' (subject) is a standard claim for the user ID
    return this.jwtService.sign(payload);
  }
}