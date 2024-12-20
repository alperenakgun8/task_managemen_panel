import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]); // Observable veri kaynağı
  tasks$ = this.tasksSubject.asObservable(); // Bileşenler tarafından dinlenebilecek observable

  constructor() {}

  getTasks(): Observable<Task[]> { 
    return this.tasksSubject.asObservable(); // Güncel görevlerin Observable'ını döndür
  }

  addTask(task: Task): void {
    if (this.tasks.some(t => t.id === task.id)) {
      throw new Error('A task with the same ID already exists.');
    }
    this.tasks.push(task); // Yeni görev ekle
    this.tasksSubject.next([...this.tasks]); // Güncel görevler listesini BehaviorSubject'e gönder
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask; // Güncel görevi bul ve değiştir
      this.tasksSubject.next([...this.tasks]); // Güncel görevler listesini BehaviorSubject'e gönder
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id); // Görevi sil
    this.tasksSubject.next([...this.tasks]); // Güncel görevler listesini BehaviorSubject'e gönder
  }
}
