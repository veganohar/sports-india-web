import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ApplicationComponent } from './application/application.component';
import { SubtypesComponent } from './subtypes/subtypes.component';

const routes: Routes = [
  { path: "", redirectTo:  "login", pathMatch: "full" },
  {path:"login",component:LoginpageComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  { path:"application", component: ApplicationComponent},
  { path: "subtype", component: SubtypesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
