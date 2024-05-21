import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class QuestionDto {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsNumber()
	@IsNotEmpty()
	testId: number
}
