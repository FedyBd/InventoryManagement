import { IsEnum } from 'class-validator';
import { DemandStatus } from '../entities/demand.entity'; // Adjust the import path as needed

export class UpdateDemandStatusDto {
    @IsEnum(DemandStatus)
    status: DemandStatus;
}
