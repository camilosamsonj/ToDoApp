import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, map, of, throwError } from 'rxjs';
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
