  /**
 * 
 * Servicio encargado de enviar una petición http get al backend, que está encargado
 * de consumir la api de feriados.
 * Se realizó de esta manera debido a que la API me arrojaba una restricción CORS
 * 
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Holiday } from 'src/app/tasks/models';




@Injectable({
  providedIn: 'root'
})
export class PublicHolidayService {

  private apiUrl = "https://localhost:7033/api/feriados";

  constructor(private httpClient: HttpClient) { }

  GetHoliday(year: number, month: number, day: number): Observable<Holiday[]> {
    const url = `${this.apiUrl}/${year}/${month}/${day}`;
    return this.httpClient.get<Holiday[]>(url);
  }
}
