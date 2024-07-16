// src/auth/auth.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate-token/:userId')
  async generateToken(@Param('userId') userId: string): Promise<{ token: string }> {
    const token = await this.authService.generateJwt(userId);
    return { token };
  }
}