import {
	IsBoolean,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

export class UserDto {
	@IsOptional()
	@IsString()
	login?: string

	@IsOptional()
	@IsString()
	password?: string

	@IsOptional()
	@IsString()
	resumeId?: string

	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsString()
	firstName?: string

	@IsOptional()
	@IsString()
	lastName?: string

	@IsOptional()
	@IsString()
	middleName?: string

	@IsOptional()
	@IsBoolean()
	hasChildren?: boolean

	@IsOptional()
	@IsString()
	maritalStatus?: string

	@IsOptional()
	@IsBoolean()
	isMilitaryId?: boolean

	@IsOptional()
	@IsString()
	phoneNumber?: string

	@IsNumber()
	@IsOptional()
	roleId: number
}
