import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]); 
  tasks$ = this.tasksSubject.asObservable(); 

  constructor() {}

  getTasks(): Observable<Task[]> { 
    return this.tasksSubject.asObservable(); 
  }

  addTask(task: Task): void {
    if (this.tasks.some(t => t.id === task.id)) {
      throw new Error('A task with the same ID already exists.');
    }
    this.tasks.push(task); 
    this.tasksSubject.next([...this.tasks]); 
    console.log('Updated tasks: ', this.tasks); 
  }
  
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask; 
      this.tasksSubject.next([...this.tasks]); 
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id); 
    this.tasksSubject.next([...this.tasks]); 
  }
}
