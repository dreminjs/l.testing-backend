import { IsNotEmpty, IsString } from 'class-validator'

export class TestDirectionDto {
	@IsNotEmpty()
	@IsString()
	directionName: string
}
