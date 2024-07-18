// attempt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getAttepmts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/result`);
  }
  getAttepmtDetail(attemptId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/result/${attemptId}`);
  }


}
