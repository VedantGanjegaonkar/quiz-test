import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminGuard } from 'src/app/core/authGuards/admin.guard';
const routes: Routes = [
  {path:"addQue", component:CreateQuestionComponent,canActivate: [AdminGuard] },
  {path:"adminHome", component:AdminHomeComponent,canActivate: [AdminGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
