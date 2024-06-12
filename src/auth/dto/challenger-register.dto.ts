import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator'

export class ChallengerRegisterDto {
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	lastName: string

	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	firstName: string

	@IsString()
	@IsOptional()
	middleName?: string

	@IsString()
	@IsOptional()
	@MaxLength(20, { message: 'Максимум 20 символов!' })
	phoneNumber: string

	@IsBoolean()
	@IsOptional()
	isMilitaryId: boolean

	@IsBoolean()
	@IsOptional()
	hasChildren: boolean

	@IsString()
	@IsOptional()
	maritalStatus: string

	@IsEmail({}, { message: 'Неверный формат email!' })
	@IsNotEmpty({ message: 'Обязательное поле!' })
	email: string

	@IsString()
	@IsOptional()
	resumeId: string

	@IsNumber()
	@IsOptional()
	roleId?: number
}
