import { Controller, Delete, Param, Post, Req, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { BlockService } from './block.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('block')
@UseGuards(JwtAuthGuard)
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':blockedUserId')
  async block(@Param('blockedUserId') blockedUserId: string, @Req() req: Request) {
    try {
      const userId = req['user'].sub;
      if (!userId) {
        throw new HttpException('User ID not found in token', HttpStatus.BAD_REQUEST);
      }

      if (!blockedUserId) {
        throw new HttpException('Blocked user ID is required', HttpStatus.BAD_REQUEST);
      }

      await this.blockService.blockUsers(userId, [blockedUserId]);
      return {
        statusCode: HttpStatus.OK,
        message: `User ${blockedUserId} is blocked successfully`,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':blockedUserId')
  async unblock(@Param('blockedUserId') blockedUserId: string, @Req() req: Request) {
    try {
      const userId = req['user'].sub;
      if (!userId) {
        throw new HttpException('User ID not found in token', HttpStatus.BAD_REQUEST);
      }

      if (!blockedUserId) {
        throw new HttpException('Blocked user ID is required', HttpStatus.BAD_REQUEST);
      }

      await this.blockService.unblockUsers(userId, [blockedUserId]);
      return {
        statusCode: HttpStatus.OK,
        message: `User ${blockedUserId} is unblocked Successfully.`,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}