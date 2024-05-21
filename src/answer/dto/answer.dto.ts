import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AnswerDto {
	@IsNotEmpty()
	@IsString()
	content: string

	@IsNotEmpty()
	@IsBoolean()
	isCorrect: boolean

	@IsNotEmpty()
	@IsNumber()
	questionId: number
}
