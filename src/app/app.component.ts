import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Todo App</h1>
      <input [(ngModel)]="newTodo" placeholder="Enter a task" />
      <button (click)="addTodo()">Add</button>

      <ul>
        <li *ngFor="let todo of todos; let i = index" class="todo-item">
          <input type="checkbox" [(ngModel)]="todo.done" />
          <span [class.done]="todo.done">{{ todo.text }}</span>
          <button (click)="removeTodo(i)">Delete</button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .done {
      text-decoration: line-through;
      color: gray;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      font-family: sans-serif;
    }
    input[type="text"] {
      width: 60%;
      padding: 8px;
    }
    button {
      margin-left: 5px;
    }
    .todo-item {
      border: 1px solid #ccc;
      padding: 10px;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, BrowserModule]
})
export class AppComponent {
  newTodo = '';
  todos: { text: string; done: boolean }[] = [];

  constructor() {
    const saved = localStorage.getItem('todos');
    if (saved) this.todos = JSON.parse(saved);
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push({ text: this.newTodo.trim(), done: false });
      this.newTodo = '';
      this.save();
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.save();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
