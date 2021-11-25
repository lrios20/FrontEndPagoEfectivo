import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeManagementComponent } from './code-management/code-management.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    component:MainComponent,
    path:''
  },
 {
   component:CodeManagementComponent,
   path:'code-management'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
