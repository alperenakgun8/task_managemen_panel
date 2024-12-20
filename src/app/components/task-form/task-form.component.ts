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
    id: Math.random(),  // Geçici bir ID oluşturma
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

    if (this.isEditMode) {
      this.taskSaved.emit(this.task); // Güncellenmiş task'i dışarıya gönder
    } else {
      this.taskSaved.emit({ ...this.task, id: Math.random() }); // Yeni task oluşturuluyor
    }

    this.resetForm();
  }

  private resetForm(): void {
    this.task = {
      id: Math.random(),
      title: '',
      description: '',
      status: false,
      createdDate: new Date(),
      dueDate: undefined
    };
    this.isEditMode = false;
  }

  setEditMode(task: Task): void {
    this.isEditMode = true;
    this.task = { ...task }; // Seçilen görevi formda düzenlemek için kopyala
  }
}
