// attempt.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {
  
  constructor(private http: HttpClient) { }

  initializeAttempt(quizId: string, userId: string): Observable<any> {
    return this.http.post(`attempt/start`, { quizId, userId });
  }

  updateAttemptWithAnswer(attemptId: string, questionId: string, userAnswer: string, userId: string): Observable<any> {
    return this.http.post(`attempt/answer`, { attemptId,questionId, userAnswer, userId });
  }

  generateNewQuiz(userId: string): Observable<any> {          //dynamic gen API
    return this.http.post(`quiz/createD`, { userId });
  }

  getQuizFromId(QuizId:string): Observable<any> {
    return this.http.get(`quiz/${QuizId}`); 
  }


}
