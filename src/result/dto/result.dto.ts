import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ResultDto {
	@IsNotEmpty()
	@IsNumber()
	scoreId: number

	@IsNotEmpty()
	@IsString()
	completionTime: Date

	@IsNotEmpty()
	@IsBoolean()
	isPassed: boolean

	@IsNotEmpty()
	@IsNumber()
	testId: number

	@IsNotEmpty()
	@IsNumber()
	userId: number

	@IsNotEmpty()
	@IsNumber()
	attemptRate: number
}

export interface IResultDto {
	scoreId: number
	completionTime: Date
	isPassed: boolean
	testId: number
	userId: number
	attemptRate: number
	interviewDate:Date 
}

export interface UpdateResultDto extends Partial<IResultDto>{}