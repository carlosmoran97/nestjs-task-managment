import { TaskStatus } from "../task.model";

export class GetTaskWithFilterDto{
    status: TaskStatus;
    search: string;
}