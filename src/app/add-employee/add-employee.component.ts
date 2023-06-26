import { Component } from '@angular/core';
import { CountryMaster, Employ } from '../Models/employee.model';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  employees: Employ[] = [];

  countryMaster: CountryMaster[]= [];


  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addEmployee: Employ = {
    firstName: '',
    lastName: '',
    fname:'',
    mname:'',
    mnumber:'',
    email: '',
    profileimg:'',
    courseName:'',
    LOne:'',
    LTwo:'',
    city: '',
    countryid: 0,
    stateid:0,
    districtid:0,
    pincode:'',

  };


  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router,
  ) {}



  getCountries(): void {
    this.employeesService.getCountries().subscribe({
      next: (countryMaster) => {
        this.countryMaster = countryMaster;
        console.log(countryMaster);
      },
      error: () => {
        console.log(Response);
      },
    });
  }





  addEmployees() {
    // console.log(this.addEmployee);
    //title case conversion
    let str = this.addEmployee.firstName;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    this.addEmployee.firstName = str;

    //last name in small letters
    str = this.addEmployee.lastName;
    if(str.length == 0){
      str = "--";
    }
    else{
      str = str.toLowerCase();
    }
    this.addEmployee.lastName = str;

    //city name title case
    str = this.addEmployee.city;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    this.addEmployee.city = str;



    this.employeesService.addEmployees(this.addEmployee).subscribe({
      // next: (employee) => {
      //   this.router.navigate(['']);
      //   // console.log(employee);
      // },
    });
  }
}
