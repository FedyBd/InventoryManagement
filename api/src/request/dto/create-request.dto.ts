import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    stockId: number;

    @IsNotEmpty()
    magazineId: number;

    @IsNumber()
    @IsNotEmpty()
    difference: number;
}
