import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ApplicationComponent } from './application/application.component';
import { SubtypesComponent } from './subtypes/subtypes.component';
import { ViewApplicationComponent } from './view-application/view-application.component';

const routes: Routes = [
  { path: "", redirectTo:  "login", pathMatch: "full" },
  {path:"login",component:LoginpageComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  { path:"application", component: ApplicationComponent},
  { path: "subtype", component: SubtypesComponent,canActivate:[AuthGuard]},
  { path: "view/:aid", component: ViewApplicationComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
