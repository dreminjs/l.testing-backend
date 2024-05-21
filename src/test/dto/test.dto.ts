import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class TestDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsString()
	accessTime: Date

	@IsNotEmpty()
	@IsString()
	timeLimit: Date

	@IsNotEmpty()
	@IsNumber()
	attemptLimit: number

	@IsNotEmpty()
	@IsNumber()
	thresholdValue: number

	@IsNotEmpty()
	@IsNumber()
	directionId: number
}
