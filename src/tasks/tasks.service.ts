import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskWithFilterDto } from './dto/get-task-with-filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasksWithFilter(getTaskWithFilterDto: GetTaskWithFilterDto): Task[]{
        const { status, search } = getTaskWithFilterDto;
        let tasks = this.tasks;
        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(tasks =>
                tasks.title.includes(search) ||
                tasks.status.includes(search)
            );
        }
        return tasks;
    }

    getTaskById(id: string): Task{
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDTO):Task {
        const { title, description } = createTaskDto;
        const task:Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string):void {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks.splice(index, 1);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task{
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks[index] = Object.assign(this.tasks[index], { status });
        return this.tasks[index];
    }
}
