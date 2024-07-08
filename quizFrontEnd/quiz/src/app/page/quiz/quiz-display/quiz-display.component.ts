import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.css']
})
export class QuizDisplayComponent implements OnInit {
  quiz: any;
  @Output() quizStart = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchQuiz();
  }

  fetchQuiz() {
    this.http.get('http://localhost:3000/quiz/getFirstQuiz').subscribe(
      (data) => {
        this.quiz = data;
      },
      (error) => {
        console.error('Error fetching quiz:', error);
      }
    );
  }

  startQuiz() {
    this.quizStart.emit(this.quiz);
  }
}
