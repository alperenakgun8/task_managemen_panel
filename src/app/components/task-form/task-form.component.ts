import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextarea } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, InputTextarea, CalendarModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() taskSaved = new EventEmitter<Task>(); 

  task: Task = {
    id: 0,  
    title: '',
    description: '',
    status: false,
    createdDate: new Date(),
    dueDate: undefined
  };
  isEditMode: boolean = false;

  saveTask(form: any): void {
    if (form.invalid) {
      return;
    }
  
    this.taskSaved.emit(this.task); // Görevi kaydet
  
    if (this.isEditMode) {
      this.isEditMode = false; // Düzenleme modu kapatılıyor
    } else {
      this.resetForm(); // Yeni görev ekleniyorsa form sıfırlanıyor
    }
  }
  

  setEditMode(task: Task): void {
    this.isEditMode = true;
    this.task = { ...task };  
  }

  resetForm(): void {
    this.task = {
      id: 0, 
      title: '',
      description: '',
      status: false,
      createdDate: new Date(),
      dueDate: undefined
    };
    this.isEditMode = false; // Düzenleme modu kapatılıyor
  }
  
}
