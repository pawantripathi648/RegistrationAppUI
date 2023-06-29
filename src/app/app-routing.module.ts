import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
const routes: Routes = [

  { path: 'addEmployee', component: AddEmployeeComponent },
  { path: '', component: EmployeelistComponent },
  { path: 'employee/edit/:id', component: EditEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
