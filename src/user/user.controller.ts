import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { SearchUserDto, UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: UserDto): Promise<User> {
        try {
            return this.userService.createUser(userData);
        } catch (error) {
            throw new HttpException('Error searching users', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('search')
    @UseGuards(JwtAuthGuard)
    async searchUsers(@Query() searchParams: SearchUserDto,  @Req() req: Request): Promise<{message: string, data: User[]}> {
        try {
            const requestingUserId = req['user'].sub;
            const users = await this.userService.searchUsers(searchParams, requestingUserId);
            if(users.length === 0){
                return {
                    message: "No Users found",
                    data: users
                }
            }
            return {
                "message": "Success",
                data: users
            }
          } catch (error) {
            throw new HttpException('Error searching users', HttpStatus.BAD_REQUEST);
          }
    }

    @Get(':id')
    async getUser(@Param('id') id: string): Promise<User> {
        try {
            const user = await this.userService.getUser(id);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException('Error fetching user', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() userData: UserDto): Promise<User> {
        try {
            const updatedUser = await this.userService.updateUser(id, userData);
            if (!updatedUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            return updatedUser;
        } catch (error) {
            throw new HttpException('Error updating user', HttpStatus.BAD_REQUEST, error);
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        try {
            const result = await this.userService.deleteUser(id);
            if (!result) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException('Error deleting user', HttpStatus.BAD_REQUEST);
        }
    }

}
