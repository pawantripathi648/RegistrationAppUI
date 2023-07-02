import { Component, OnInit } from '@angular/core';
import { studentDetail } from '../Models/employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss'],
})
export class EmployeelistComponent implements OnInit {
  employees: studentDetail[] = [];
  url="/assets/";
  id = '';
  imgurl: any;

  constructor(private employeesService: EmployeesService) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        console.log(employees);
      },
      error: () => {
        console.log(Response);
      },
    });
  }

}

