import { Component } from '@angular/core';
import {
  CountryMaster,
  DistrictMaster,
  Employ,
  StateMaster,
  EducationMaster,
} from '../Models/employee.model';
import { EmployeesService } from '../employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  name: string='';
  file: any;
 url="/assets/download.jfif";
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addEmployee: Employ = {
    obj1: {
      firstName: '',
      lastName: '',
      fname: '',
      mname: '',
      mnumber: '',
      email: '',
      profileimg: '',
      eid: 0,
    },
    obj2: {
      LOne: '',
      LTwo: '',
      city: '',
      countryid: 0,
      stateid: 0,
      districtid: 0,
      pincode: '',
    },
    obj3: {
      perLone: '',
      perLtwo: '',
      perCity: '',
      perCountryid: 0,
      perStateid: 0,
      perDistrictid: 0,
      perPinCode: '',
    }
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeesService.getEducation().subscribe((edData: any) => {
      this.educationMaster = edData;
      console.log(edData);
    });

    this.employeesService.getCountries().subscribe((data: any) => {
      this.corosCountryMaster = data;
      this.permanentCountryMaster = data;
      console.log(data);
    });
  }
  onSelectFile(a: any){
    if(a.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(a.target.files[0]);
      reader.onload=(event: any)=>{
        this.url =event.target.result;
      }

    }
this.file =a.target.files[0];

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
    this.employeesService.getStates(this.params).subscribe((data: any) => {
      this.corosStateMaster = data;
      console.log(data);
    });
  }

  getPerStates(params: number): void {
    this.employeesService.getStates(this.params).subscribe((data: any) => {
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
    this.employeesService.getDistrict(this.params).subscribe((data: any) => {
      this.corosDistrictMaster = data;
      console.log(data);
    });
  }
  getPerDistrict(params: number): void {
    this.employeesService.getDistrict(this.params).subscribe((data: any) => {
      this.permanentDistrictMaster = data;
      console.log(data);
    });
  }

  addEmployees() {
    // console.log(this.addEmployee);
    //title case conversion
    let str = this.addEmployee.obj1.firstName;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    this.addEmployee.obj1.firstName = str;

    //last name in small letters
    str = this.addEmployee.obj1.lastName;
    if (str.length == 0) {
      str = '--';
    } else {
      str = str.toLowerCase();
    }
    let formData = new FormData();
    // formData.set('name', this.name);
    formData.set('file', this.file);
    this.addEmployee.obj1.lastName = str;
    this.http.post('/assets',formData).subscribe((
      (Response: any)=>{})
    );

    this.employeesService.addEmployees(this.addEmployee).subscribe({
      next: (employee) => {
        console.log(employee);

        this.router.navigate(['/']);
        console.log(employee);
      },
    });
  }
}
