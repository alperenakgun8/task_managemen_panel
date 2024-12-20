import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, CardModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>; // tasks$ artık Observable olarak başlatıldı
  filterForm: FormGroup;

  statusOptions: { label: string, value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Not Completed', value: 'notCompleted' }
  ];

  sortOptions: { label: string, value: string }[] = [
    { label: 'Created Date', value: 'createdDate' },
    { label: 'Due Date', value: 'dueDate' }
  ];

  @ViewChild(TaskFormComponent) taskFormComponent!: TaskFormComponent;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      statusFilter: ['all'],
      sortBy: ['createdDate']
    });

    // tasks$ doğrudan taskService.tasks$'ten alınır
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(values => {
      this.updateTaskList();
    });
  }

  private filterTasksByStatus(tasks: Task[]): Task[] {
    const statusFilter = this.filterForm.get('statusFilter')?.value;
    if (statusFilter === 'completed') {
      return tasks.filter(task => task.status);
    } else if (statusFilter === 'notCompleted') {
      return tasks.filter(task => !task.status);
    }
    return tasks;
  }

  private sortTasks(tasks: Task[]): Task[] {
    const sortBy = this.filterForm.get('sortBy')?.value;
    if (sortBy === 'createdDate') {
      return tasks.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime());
    } else if (sortBy === 'dueDate') {
      return tasks.sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0));
    }
    return tasks;
  }

  private updateTaskList(): void {
    this.tasks$ = this.taskService.tasks$.pipe(
      map((tasks: Task[]) => this.filterTasksByStatus(tasks)),
      map((tasks: Task[]) => this.sortTasks(tasks))
    );
  }

  saveTask(task: Task): void {
    this.taskService.addTask(task);
    this.updateTaskList();
  }

  editTask(task: Task): void {
    if (this.taskFormComponent) {
      this.taskFormComponent.setEditMode(task);
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.updateTaskList();
  }

  toggleStatus(task: Task): void {
    task.status = !task.status;
    this.taskService.updateTask(task);
    this.updateTaskList();
  }

  getTaskStatusClass(task: Task): string {
    return task.status ? 'completed' : 'not-completed';
  }
}