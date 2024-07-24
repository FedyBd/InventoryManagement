import {IsEmail, IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    phone:string;

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    type:string;

    @IsOptional()
    magasinId: number | null; // Nullable number, no validation constraints
}
