import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@MinLength(4)
	@MaxLength(15)
	login: string

	@IsString()
	@IsNotEmpty({ message: 'Обязательное поле!' })
	@MinLength(6, { message: 'Минимум 6 символов!' })
	@MaxLength(20, { message: 'Максимум 20 символов!' })
	password: string
}
