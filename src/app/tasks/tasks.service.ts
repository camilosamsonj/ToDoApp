import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITask, ITaskToSend } from './models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
  private apiUrl = "https://localhost:7033/api/tareas";

  constructor(private httpClient: HttpClient) {

   }

   getTasks(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>(this.apiUrl);
  }

  createTask(Task: ITaskToSend): Observable<ITask> {
    return this.httpClient.post<ITask>(this.apiUrl, Task);
  }

  editTask(id: number, updatedTask: ITaskToSend): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.apiUrl}/${id}`, updatedTask);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
      
  }
}
