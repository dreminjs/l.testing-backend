import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class TestDto {
	@IsNotEmpty()
	@IsString()
	title: string

	@IsNotEmpty()
	@IsString()
	accessTime: Date

	@IsNotEmpty()
	@IsNumber()
	timeLimit: number

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


export class UpdateTestDto extends TestDto {
	photo:string
}