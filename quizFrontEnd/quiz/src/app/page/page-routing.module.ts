import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizAttemptComponent } from './home/quiz-queen/quiz-attempt/quiz-attempt.component';
import { HomeComponent } from './home/home.component';
import { QuizDisplayComponent } from './home/quiz-queen/quiz-display/quiz-display.component';
import { AuthGuard } from '../core/authGuards/auth.gaurd';
import { QuizQueenComponent } from './home/quiz-queen/quiz-queen.component';
import { ResultListComponent } from './home/result-list/result-list.component';
import { ResultDetailsComponent } from './home/result-list/result-details/result-details.component';


const routes: Routes = [

{path:'home', component:HomeComponent,canActivate: [AuthGuard] },
{path:'quizQueen', component:QuizQueenComponent,canActivate: [AuthGuard] },
{ path: 'quiz-display/:id', component: QuizDisplayComponent,canActivate: [AuthGuard] },
{ path: 'quiz-attempt', component:QuizAttemptComponent,canActivate: [AuthGuard] },
{ path: 'result', component:ResultListComponent,canActivate: [AuthGuard] },
{ path: 'attempt-details/:id', component:ResultDetailsComponent,canActivate: [AuthGuard] },
{ path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
