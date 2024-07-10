import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
})
export class QuizDisplayComponent implements OnInit {
  quizId?: string|null;
  
  
  @Output() quizStart = new EventEmitter<any>();

  quiz: any;
  isLoading = false;
  error: string | null = null;

  quizStarted = false;


  constructor(private route: ActivatedRoute,private http: HttpClient,private router:Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.quizId = params.get('id');
      console.log("quizID from display-compennt: "+this.quizId);
    });
    if (this.quizId) {
      this.fetchQuiz(this.quizId);
    } else {
      this.fetchFirstQuiz();
    }
  }
  
  fetchFirstQuiz() {
    this.isLoading = true;
    this.http.get('http://localhost:3000/quiz/getFirstQuiz').subscribe(
      (data) => {
        this.quiz = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching first quiz:', error);
        this.error = 'Failed to load the quiz. Please try again.';
        this.isLoading = false;
      }
    );
  }

  fetchQuiz(quizId: string) {
    this.isLoading = true;
    this.http.get(`http://localhost:3000/quiz/${quizId}`).subscribe(
      (data) => {
        this.quiz = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching quiz:', error);
        this.error = 'Failed to load the quiz. Please try again.';
        this.isLoading = false;
      }
    );
  }

  startQuiz() {
    this.quizStart.emit(this.quiz);
    this.quizStarted=true
    // this.router.navigate(['/quizQueen'])
    console.log(this.quiz);
    
  }


}
