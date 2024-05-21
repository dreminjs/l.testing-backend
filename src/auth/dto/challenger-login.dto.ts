import { IsEmail, IsNotEmpty } from 'class-validator'

export class ChallengerLoginDto {
	@IsEmail()
	@IsNotEmpty()
	email: string
}
