import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class StatusValidationPipe implements PipeTransform{

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is not a valid status.`);
        }
        return value;
    }

    private isStatusValid(status: any): boolean{
        return this.allowedStatuses.indexOf(status) !== -1;
    }

}
