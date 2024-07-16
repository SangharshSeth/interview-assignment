import { IsOptional, IsString, IsInt, Min, Max, IsNumber } from 'class-validator';
import { Type } from "class-transformer"
export class UserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    userName: string;

    @IsString()
    dateOfBirth: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(150)
    @Type(() => Number)
    age?: number;
}

export class SearchUserDto {
    @IsOptional()
    @IsString()
    userName?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    minAge?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    maxAge?: number;
}