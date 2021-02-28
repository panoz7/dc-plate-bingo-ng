import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Plate } from './types';

interface dbUpdateResult {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlateDataService {

  baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  loadPlates():Observable<Plate[][]> {
    return this.http.get<string[]>(`${this.baseUrl}/`).pipe(
      tap(console.log),
      map(this.formatPlateData)
    )
  }

  updatePlate(plate: Plate):Observable<boolean> {
    let result: Observable<dbUpdateResult>;

    if (plate.active) {
      result = this.http.post<dbUpdateResult>(`${this.baseUrl}/${plate.plate}`, null);
    } else {
      result = this.http.delete<dbUpdateResult>(`${this.baseUrl}/${plate.plate}`);
    }

    return result.pipe(
      map(result => result.success),
      catchError(_ => of(false))
    )

  }

  formatPlateData(plates: string[]): Plate[][] {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const maxLetterIndex = plates.length ? letters.indexOf(plates[plates.length - 1][0]) + 2 : 7;

    let split = letters.slice(0, maxLetterIndex)
      .map(letter1 => letters.map(letter2 => {return {'plate': `${letter1}${letter2}`, 'active': plates.includes(`${letter1}${letter2}`)}}));

    return split;

  }

}
