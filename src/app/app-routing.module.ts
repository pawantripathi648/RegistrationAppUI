import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'addEmployee',
    component: AddEmployeeComponent,
    canActivate: [AuthService],
  },
  {
    path: 'employee',
    component: EmployeelistComponent,
    canActivate: [AuthService],
  },
  {
    path: 'employee/edit/:id',
    component: EditEmployeeComponent,
    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
