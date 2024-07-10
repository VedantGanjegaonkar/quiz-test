import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizAttemptComponent } from './home/quiz-queen/quiz-attempt/quiz-attempt.component';
import { HomeComponent } from './home/home.component';
import { QuizDisplayComponent } from './home/quiz-queen/quiz-display/quiz-display.component';
import { AuthGuard } from '../core/authGuards/auth.gaurd';
import { QuizQueenComponent } from './home/quiz-queen/quiz-queen.component';
const routes: Routes = [

{path:'home', component:HomeComponent,canActivate: [AuthGuard] },
{path:'quizQueen', component:QuizQueenComponent },
{ path: 'quiz-display/:id', component: QuizDisplayComponent },
{ path: 'quiz-attempt', component:QuizAttemptComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
