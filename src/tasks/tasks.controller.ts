import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskWithFilterDto } from './dto/get-task-with-filter.dto';
import { StatusValidationPipe } from './pipes/status-validation-pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query(ValidationPipe) getTaskWithFilterDto: GetTaskWithFilterDto): Task[]{
        if (Object.keys(getTaskWithFilterDto).length){
            return this.tasksService.getTasksWithFilter( getTaskWithFilterDto );
        } else {
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task{ 
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDTO){
        return this.tasksService.createTask(createTaskDto);
    }
    
    @Delete('/:id')
    deleteTask(@Param('id') id: string): void{
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id') id: string,
        @Body('status', StatusValidationPipe) status: TaskStatus
    ): Task{
        return this.tasksService.updateTaskStatus(id, status);
    }
}
