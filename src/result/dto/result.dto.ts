import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ResultDto {
	@IsNotEmpty()
	@IsNumber()
	scoreId: number

	@IsNotEmpty()
	@IsString()
	completionTime: Date
	@IsNotEmpty()
	@IsString()
	interviewDate: Date

	@IsNotEmpty()
	@IsBoolean()
	isPassed: boolean

	@IsNotEmpty()
	@IsNumber()
	testId: number

	@IsNotEmpty()
	@IsNumber()
	userId: number
}
