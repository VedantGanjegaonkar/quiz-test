// attempt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {
  private apiUrl = 'http://localhost:3000'; // Adjust this URL as needed

  constructor(private http: HttpClient) { }

  initializeAttempt(quizId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/attempt/start`, { quizId, userId });
  }

  updateAttemptWithAnswer(attemptId: string, questionId: string, userAnswer: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/attempt/answer`, { attemptId,questionId, userAnswer, userId });
  }

  generateNewQuiz(userId: string): Observable<any> {          //dynamic gen API
    return this.http.post(`${this.apiUrl}/quiz/createD`, { userId });
  }

  // getQuizFromId(QuizId:string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/quiz/getNewQuiz`, { QuizId });
  // }
  // getQuizFromIds(quizId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/quiz/getNew`, { quizId });
  // }

}
