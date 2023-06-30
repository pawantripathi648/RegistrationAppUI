import { Component, OnInit } from '@angular/core';
import {
  Employ,
  CountryMaster,
  StateMaster,
  DistrictMaster,
  EducationMaster,
  studentDetail,
  studentlistid,
} from '../Models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  employees: Employ[] = [];

  corosCountryMaster: CountryMaster[] = [];
  permanentCountryMaster: CountryMaster[] = [];

  corosStateMaster: StateMaster[] = [];
  permanentStateMaster: StateMaster[] = [];

  corosDistrictMaster: DistrictMaster[] = [];
  permanentDistrictMaster: DistrictMaster[] = [];

  educationMaster: EducationMaster[] = [];

  id = 0;

  params = 0;
  detailEmployee: studentlistid = {
    id: 0,
    firstName: '',
    lastName: '',
    fname: '',
    mname: '',
    mnumber: '',
    email: '',
    // profileimg: '',
    courseName: '',
    lOne: '',
    lTwo: '',
    city: '',
    CcountryId: 0,
    countryName: '',
    CstateId: 0,
    stateName: '',
    CdistrictId: 0,
    districtName: '',
    pincode: '',
    perLOne: '',
    perLTwo: '',
    perCity: '',
    perCountryName: '',
    perStateName: '',
    perDistrictName: '',
    perPincode: '',
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response: studentlistid[]) => {
              // response =JSON.stringify(response)
              this.detailEmployee = response[0];
              console.log(response);
            },
          });
        }
      },
    });

    this.employeeService.getEducation().subscribe((edData: any) => {
      this.educationMaster = edData;
      console.log(edData);
    });

    this.employeeService.getCountries().subscribe((data: any) => {
      this.corosCountryMaster = data;
      this.permanentCountryMaster = data;
      console.log(data);
    });
  }
  onSelectCorStateName(id: number): void {
    this.params = id;
    this.getStates(id);
    console.log(id); // and fetch its ID as well, depends on how you want to use this.
  }
  onSelectStateName(id: number) {
    this.params = id;
    this.getPerStates(id);
    console.log(id); // and fetch its ID as well, depends on how you want to use this.
  }
  getStates(params: number): void {
    this.employeeService.getStates(this.params).subscribe((data: any) => {
      this.corosStateMaster = data;
      console.log(data);
    });
  }

  getPerStates(params: number): void {
    this.employeeService.getStates(this.params).subscribe((data: any) => {
      this.permanentStateMaster = data;
      console.log(data);
    });
  }

  onSelectCorDistrictName(id: number): void {
    this.params = id;
    this.getDistrict(id);
    console.log(id); // and fetch its ID as well, depends on how you want to use this.
  }
  onSelectDistrictName(id: number): void {
    this.params = id;
    this.getPerDistrict(id);
    console.log(id); // and fetch its ID as well, depends on how you want to use this.
  }
  getDistrict(params: number): void {
    this.employeeService.getDistrict(this.params).subscribe((data: any) => {
      this.corosDistrictMaster = data;
      console.log(data);
    });
  }
  getPerDistrict(params: number): void {
    this.employeeService.getDistrict(this.params).subscribe((data: any) => {
      this.permanentDistrictMaster = data;
      console.log(data);
    });
  }

  updateEmployee() {
    let str = this.detailEmployee.firstName;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    this.detailEmployee.firstName = str;

    //last name in small letters
    str = this.detailEmployee.lastName;
    if (str.length == 0) {
      str = '--';
    } else {
      str = str.toLowerCase();
    }
    this.detailEmployee.lastName = str;

    //city name title case
    str = this.detailEmployee.city;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    this.detailEmployee.city = str;

    this.employeeService
      .updateEmployee(this.detailEmployee.id, this.detailEmployee)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.detailEmployee.id).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
