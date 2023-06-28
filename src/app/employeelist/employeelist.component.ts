import { Component, OnInit } from '@angular/core';
import { studentDetail } from '../Models/employee.model';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {

  employees: studentDetail[] = [];
  id= '';


  constructor(private employeesService: EmployeesService) {}
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    throw new Error('Method not implemented.');
  }
}
