import { Component,Output,EventEmitter } from '@angular/core';
import { AttemptService } from 'src/app/core/services/attempt.services'; // Assume this is your existing service
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.css']
})
export class NewquizComponent {
  @Output() newQuizGenerated = new EventEmitter<string>();
  isGenerating = false;
  error: string | null = null;
  userId:string=""
  currentQuiz!:any;

  constructor(
    private quizService: AttemptService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.userId = this.userService.getUserIdFromToken();

  }

  generateNewQuiz() {
    this.isGenerating = true;
    this.error = null;

    this.quizService.generateNewQuiz(this.userId).subscribe(
      (newQuizId: any) => {
        this.isGenerating = false;
        this.newQuizGenerated.emit(newQuizId._id);
        console.log("new quiz succes:",newQuizId);
        
      },
      (error) => {
        this.isGenerating = false;
        this.error = 'Failed to generate new quiz. Please try again.';
        console.error('Error generating new quiz:', error);
      }
    );
  }

  fetchQuiz(quizId: string) {
    this.http.get(`http://localhost:3000/quiz/${quizId}`).subscribe(
      (data) => {
        this.currentQuiz = data;
        console.log("new full quiz:",data);
        
        // this.quizStarted = true;
      },
      (error) => {
        console.error('Error fetching new quiz:', error);
      }
    );
  }

}
