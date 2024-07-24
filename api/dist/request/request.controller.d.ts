import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from "./entities/request.entity";
import { Request as ExpressRequest } from "express";
export declare class RequestController {
    private readonly requestService;
    constructor(requestService: RequestService);
    create(createRequestDto: CreateRequestDto): Promise<Request>;
    findforoffice(id: number, request: ExpressRequest): Promise<Request[]>;
    findOne(id: number): Promise<Request>;
    update(id: string, updateRequestDto: UpdateRequestDto): string;
    remove(id: string): string;
}
