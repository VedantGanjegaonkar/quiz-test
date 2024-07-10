// quiz-attempt.component.ts
import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { AttemptService } from 'src/app/core/services/attempt.services';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.css']
})
export class QuizAttemptComponent implements OnInit {
  @Input() quiz: any;
  
  currentQuestionIndex = 0;
  userAnswers: string[] = [];
  quizCompleted = false;
  attemptId!: string;
  userId!: string ;

  constructor(
    private attemptService: AttemptService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // console.log(this.quiz);
    this.userAnswers = new Array(this.quiz.questions.length).fill('');
    this.userId = this.userService.getUserIdFromToken();
    this.initializeAttempt();
  }

  initializeAttempt() {
    this.attemptService.initializeAttempt(this.quiz._id, this.userId).subscribe(
      (response) => {
        this.attemptId = response._id; // Assuming the response includes the attempt ID
      },
      (error) => {
        console.error('Error initializing attempt:', error);
      }
    );
  }

  getCurrentQuestion() {
    return this.quiz.questions[this.currentQuestionIndex];
  }

  selectAnswer(answer: string) {
    this.userAnswers[this.currentQuestionIndex] = answer;
  }

  submitAnswer() {
    const currentQuestion = this.getCurrentQuestion();
    const userAnswer = this.userAnswers[this.currentQuestionIndex];

    this.attemptService.updateAttemptWithAnswer(
      this.attemptId,
      currentQuestion._id,
      userAnswer,
      this.userId
    ).subscribe(
      (response) => {
        console.log('Answer submitted successfully:', response);
        this.proceedToNextQuestion();
      },
      (error) => {
        console.error('Error submitting answer:', error);
      }
    );
  }

  proceedToNextQuestion() {
    if (this.currentQuestionIndex < this.quiz.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.completeQuiz();
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  completeQuiz() {
    this.quizCompleted = true;
}

}
