import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AuthGuard } from './services/auth-guard.service';
import { NotFoundComponent } from './notfound/notfound.component';
import { Component } from '@angular/core';
import { PositionComponent } from './position/position.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { PositionManageComponent } from './position-manage/position-manage.component';
import { PositionUpdateComponent } from './position/position-update/position-update.component';
import { UsersUpdateComponent } from './users/users-update/users-update.component';
import { CandidateComponent } from './candidate/candidate.component';
import { CandidateManageComponent } from './candidate/candidate-manage/candidate-manage.component';
import { CandidateUpdateComponent } from './candidate/candidate-update/candidate-update.component';
import { CompanyUpdateComponent } from './company/company-update/company-update.component';
import { DepartementComponent } from './departement/departement.component';
import { DepartementUpdateComponent } from './departement/departement-update/departement-update.component';
import { CompanyComponent } from './company/company.component';
import { SalaryUpdateComponent } from './salary/salary-update/salary-update.component';
import { SalaryComponent } from './salary/salary.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeManageComponent } from './employee/employee-manage/employee-manage.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { ForgotComponent } from './forgot/forgot.component';
import { AttendanceComponent } from './attendance/attendance.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path:'forgot', component:ForgotComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
     children:[
      {
        path: 'employee' , component: EmployeeComponent,
      },

      {
        path:'manage',component:EmployeeManageComponent,
     },
     {
       path: 'update/:employeeId',
       component: EmployeeUpdateComponent,
     },
      {
        path:'position', component: PositionComponent,
        // children:[
        //     {
        //       path:'manage', loadChildren: () =>
        //         import('./position-manage/position-manage.component').then(
        //           (mod) => mod.PositionManageComponent
        //         ),
        //     },
        //     ]

      },

      {
         path:'manage',component:PositionManageComponent,
      },

      {
        path:'attendance', component:AttendanceComponent
      },
      {
        path: 'update/:positionId',
        component: PositionUpdateComponent,
      },


      {
        path:'manage/candidate',component:CandidateManageComponent,
     },

     {
      path:'company', component:CompanyUpdateComponent,
     },

     {
      path:'manage/company', component: CompanyComponent,
     },
     {
      path:'update/company/:companyId', component: CompanyUpdateComponent,
     },
    
     {
       path: 'update/candidate/:candidateId',
       component: CandidateUpdateComponent,
     },
      {
        path:'users', component: UsersUpdateComponent,
      },

      {
        path: 'update/users/:userId',
        component: UsersUpdateComponent
      },

     
      {
        path: 'candidate', component:CandidateComponent,
      },

      {
        path: 'userprofile', component:UserComponent,
      },
      {
        path: 'user', component:UserComponent,
      },
      {
        path: 'departement', component:DepartementUpdateComponent ,
      },

      {
        path:'manage/departement',component: DepartementComponent,

      },

      {
        path:'update/departement/:departementId', component:DepartementUpdateComponent ,
      },

      {
        path:'manage/users', component: UsersComponent,
      },
 {
        path: 'salary', component:SalaryUpdateComponent ,
      },

      {
        path:'manage/salary',component: SalaryComponent,

      },

      {
        path:'update/salary/:salaryId', component:SalaryUpdateComponent ,
      },
   
    ]
    // loadComponent: () =>
    //   import('./dashboard/dashboard.component').then(
    //     (mod) => mod.DashboardComponent
    //   ),
    // // canActivate: [AuthGuard],
  },
  {
    path:'manage', loadComponent: () =>
      import('./position-manage/position-manage.component').then(
        (mod) => mod.PositionManageComponent
      ),
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
