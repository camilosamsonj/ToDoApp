  /**
 * Servicio encargado de consumir la API del servidor que sirve la lista de prioridades de su respectiva tabla.
 */




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPriority } from 'src/app/tasks/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  apiUrl = "https://localhost:7033/api/prioridades";
  prioritiesList: IPriority[] = [];


  constructor(private httpClient: HttpClient) { }


  getPriorities(): Observable<IPriority[]> {
    return this.httpClient.get<IPriority[]>(this.apiUrl);
  }

}