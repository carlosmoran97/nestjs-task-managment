import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskWithFilterDto } from "./dto/get-task-with-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTaskWithFilterDto): Promise<Task[]>{
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('(task.title ILIKE :search OR task.description ILIKE :search)', { search: `%${search}%` });
        }
 
        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task>{
        const { title, description } = createTaskDto;
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        await task.save();

        return task;
    }
}