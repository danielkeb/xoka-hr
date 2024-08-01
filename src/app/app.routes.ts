import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
// import { AuthGuard } from './services/auth-guard.service';
import { NotFoundComponent } from './notfound/notfound.component';
import { Component } from '@angular/core';
import { PositionComponent } from './position/position.component';
import { CandidateComponent } from './candidate/candidate.component';
import { UserComponent } from './user/user.component';
import { DepartementComponent } from './departement/departement.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  
  {
    path: 'dashboard',
    component: DashboardComponent,
     children:[
      {
        path: 'employee' , component: EmployeeComponent,
      },
      {
        path:'position', component: PositionComponent,
      },
      {
        path: 'candidate', component:CandidateComponent,
      },

      {
        path: 'userprofile', component:UserComponent,
      },
      {
        path: 'departement', component: DepartementComponent,
      }
   
    ]
    // loadComponent: () =>
    //   import('./dashboard/dashboard.component').then(
    //     (mod) => mod.DashboardComponent
    //   ),
    // // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (mod) => mod.RegisterComponent
      ),
  },
  {
    path: 'employee',
    component: EmployeeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
