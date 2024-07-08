import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizStarted = false;
  currentQuiz: any;

  constructor(private http: HttpClient) {}
  onQuizStart(quiz: any) {
    this.currentQuiz = quiz;
    this.quizStarted = true;
  }

  onNewQuizGenerated(quizId: string) {
    this.fetchQuiz(quizId);
    console.log("quiz id from frontend"+quizId);
    
  }

  fetchQuiz(quizId: string) {
    this.http.get(`http://localhost:3000/quiz/${quizId}`).subscribe(
      (data) => {
        this.currentQuiz = data;
        console.log("new full quiz:",data);
        
        this.quizStarted = true;
      },
      (error) => {
        console.error('Error fetching new quiz:', error);
      }
    );
  }
}
