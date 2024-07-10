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
  
  isGenerating = false;
  error: string | null = null;
  userId:string=""

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
        
        console.log("new quiz succes:",newQuizId);
        this.router.navigate(['/quiz-display',newQuizId._id])
      },
      (error) => {
        this.isGenerating = false;
        this.error = 'Failed to generate new quiz. Please try again.';
        console.error('Error generating new quiz:', error);
      }
    );
  }


}
