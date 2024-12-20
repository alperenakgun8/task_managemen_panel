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
  @Output() taskSaved = new EventEmitter<Task>();  // Yeni görev ya da düzenlenmiş görev dışarıya aktarılır

  task: Task = {
    id: 0,  // Geçici bir ID oluşturma
    title: '',
    description: '',
    status: false,
    createdDate: new Date(),
    dueDate: undefined
  };
  isEditMode: boolean = false;

  // Formu kaydetme işlemi
  saveTask(form: any): void {
    if (form.invalid) {
      return;
    }

    // Eğer edit modundaysak, mevcut görevi dışarıya gönder
    this.taskSaved.emit(this.task);

    // Eğer yeni görevse formu sıfırla
    if (!this.isEditMode) {
      this.resetForm();
    }
  }

  // Edit modunu açma ve mevcut görevi formda düzenlemeye alma
  setEditMode(task: Task): void {
    this.isEditMode = true;
    this.task = { ...task };  // Seçilen görevi formda düzenlemek için kopyala
  }

  // Formu sıfırlama
  private resetForm(): void {
    this.task = {
      id: 0,  // Yeni görev için ID sıfırlanır
      title: '',
      description: '',
      status: false,
      createdDate: new Date(),
      dueDate: undefined
    };
    this.isEditMode = false;  // Düzenleme modunu kapat
  }
}
