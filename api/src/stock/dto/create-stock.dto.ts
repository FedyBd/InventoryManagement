import {IsNotEmpty} from "class-validator";

export class CreateStockDto {
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    quantity: string;
}
