import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';


import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { QuizQueenComponent } from './home/quiz-queen/quiz-queen.component';
import { NewquizComponent } from './home/quiz-queen/newquiz/newquiz.component';
import { QuizDisplayComponent } from './home/quiz-queen/quiz-display/quiz-display.component';
import { QuizAttemptComponent } from './home/quiz-queen/quiz-attempt/quiz-attempt.component';
import { ResultListComponent } from './home/result-list/result-list.component';
import { ResultDetailsComponent } from './home/result-list/result-details/result-details.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
         HomeComponent,
         QuizQueenComponent,
         NewquizComponent,
         QuizDisplayComponent,
         QuizAttemptComponent,
         ResultListComponent,
         ResultDetailsComponent,
         NavbarComponent,       
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
  ],
  exports:[
    NavbarComponent
  ]
})
export class PageModule { }
