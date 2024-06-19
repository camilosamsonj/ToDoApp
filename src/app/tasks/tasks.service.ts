/**
 * 
 * 
 * Este Servicio se encarga de gestionar las tareas a través de peticiones HTTP a la API.
 * 
 *  Utiliza un BehaviorSubject para mantener y actualizar una lista de tareas,
 *   se compone de métodos para obtener, crear, editar y eliminar tareas.
 */





import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITask, ITaskToSend } from './models';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksSubject$: BehaviorSubject<ITask[]> = new BehaviorSubject<ITask[]>([]);
  tasks$: Observable<ITask[]> = this.tasksSubject$.asObservable();
  private apiUrl = "https://localhost:7033/api/tareas";

  constructor(private httpClient: HttpClient) {
    this.getTasksFromApi();
  }

  private getTasksFromApi(): void {
    this.httpClient.get<ITask[]>(this.apiUrl).subscribe(tasks => {
      this.tasksSubject$.next(tasks);
    });
  }

  getTasks(): Observable<ITask[]> {
    return this.tasks$;
  }

  createTask(task: ITaskToSend): Observable<ITask> {
    return this.httpClient.post<ITask>(this.apiUrl, task).pipe(
      tap(() => this.getTasksFromApi())
    );
  }

  editTask(id: number, updatedTask: ITaskToSend): Observable<ITask> {
    return this.httpClient.put<ITask>(`${this.apiUrl}/${id}`, updatedTask).pipe(
      tap(() => this.getTasksFromApi())
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.getTasksFromApi())
    );
  }
}
