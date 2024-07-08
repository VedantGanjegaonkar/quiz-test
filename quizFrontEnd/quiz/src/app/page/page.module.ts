import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';


import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDisplayComponent } from './quiz/quiz-display/quiz-display.component';
import { QuizAttemptComponent } from './quiz/quiz-display/quiz-attempt/quiz-attempt.component';
import { HomeComponent } from './home/home.component';
import { NewquizComponent } from './home/newquiz/newquiz.component';


@NgModule({
  declarations: [


  
    QuizComponent,
         QuizDisplayComponent,
         QuizAttemptComponent,
         HomeComponent,
         NewquizComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
  ]
})
export class PageModule { }
