import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../core/authGuards/auth.gaurd';
import { NewquizComponent } from './home/newquiz/newquiz.component';
import { QuizAttemptComponent } from './quiz/quiz-display/quiz-attempt/quiz-attempt.component';
const routes: Routes = [
{path:'quiz', component:QuizComponent ,canActivate: [AuthGuard]},
{path:'home', component:HomeComponent,canActivate: [AuthGuard] },
{ path: 'new-quiz', component: NewquizComponent },
{path: 'quiz-display' , component : QuizAttemptComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
