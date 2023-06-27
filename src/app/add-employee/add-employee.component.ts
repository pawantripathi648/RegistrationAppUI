import { Component } from '@angular/core';
import {
  CountryMaster,
  DistrictMaster,
  Employ,
  StateMaster,
} from '../Models/employee.model';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  employees: Employ[] = [];

  countryMaster: CountryMaster[] = [];

  stateMaster: StateMaster[] = [];

  districtMaster: DistrictMaster[] = [];

  id = 1;

  params = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addEmployee: Employ = {
    firstName: '',
    lastName: '',
    fname: '',
    mname: '',
    mnumber: '',
    email: '',
    profileimg: '',
    courseName: '',
    LOne: '',
    LTwo: '',
    city: '',
    countryid: 0,
    stateid: 0,
    districtid: 0,
    pincode: '',
  };

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // getCountries(): void {
    this.employeesService.getCountries().subscribe((data: any) => {
      this.countryMaster = data;
      // console.log(data);
    });
  }
  onSelectStateName(id: number): void {
    this.params = id;
    this.getStates(id);
    // console.log(id);                  // and fetch its ID as well, depends on how you want to use this.
  }
  getStates(params: number): void {
    this.employeesService.getStates(this.params).subscribe((data: any) => {
      this.stateMaster = data;
    });
  }
  onSelectdistrictName(id: number): void {
    this.params = id;
    this.getDistrict(id);
    // console.log(id);                  // and fetch its ID as well, depends on how you want to use this.
  }
  getDistrict(params: number): void {
    this.employeesService.getDistrict(this.params).subscribe((data: any) => {
      this.districtMaster = data;
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
    if (str.length == 0) {
      str = '--';
    } else {
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
