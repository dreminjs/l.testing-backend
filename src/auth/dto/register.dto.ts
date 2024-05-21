import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator'

export class RegisterDto {
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@MinLength(4, { message: 'Минимум 4 символа!' })
	@MaxLength(15, { message: 'Максимум 15 символов!' })
	login: string

	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@MinLength(6, { message: 'Минимум 6 символов!' })
	@MaxLength(20, { message: 'Максимум 20 символов!' })
	password: string

	@IsNumber()
	@IsOptional()
	roleId?: number
}
