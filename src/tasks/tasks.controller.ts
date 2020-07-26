import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskWithFilterDto } from './dto/get-task-with-filter.dto';
import { StatusValidationPipe } from './pipes/status-validation-pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    async getTasks(
        @Query(ValidationPipe) getTaskWithFilterDto: GetTaskWithFilterDto,
        @GetUser() user: User
    ): Promise<Task[]>{
        return this.tasksService.getTasks(getTaskWithFilterDto, user);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{ 
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDto: CreateTaskDTO,
        @GetUser() user: User
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto, user);
    }
    
    @Delete('/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number){
        await this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', StatusValidationPipe) status: TaskStatus
    ): Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status);
    }
}
