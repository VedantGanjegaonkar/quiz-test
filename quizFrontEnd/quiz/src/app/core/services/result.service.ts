// attempt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  
  constructor(private http: HttpClient) { }

  getAttepmts(): Observable<any> {
    return this.http.get(`result`);
  }
  getAttepmtDetail(attemptId: string): Observable<any> {
    return this.http.get(`result/${attemptId}`);
  }


}
