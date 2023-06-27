import { Component } from '@angular/core';
import {
  CountryMaster,
  DistrictMaster,
  Employ,
  StateMaster,
  EducationMaster
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

  educationMaster:EducationMaster[]=[];

  id = 0;

  params = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addEmployee: Employ = {
    obj1:{

    firstName: '',
    lastName: '',
    fname: '',
    mname: '',
    mnumber: '',
    email: '',
    profileimg: '',
    eid: 0,

    },
    obj2:{
      LOne: '',
      LTwo: '',
      city: '',
      countryid: 0,
      stateid: 0,
      districtid: 0,
      pincode: '',

    },
    obj3:{
      perLone:'',
      perLtwo:'',
      perCity :  '' ,
      perCountryid : 0,
      perStateid : 0,
      perDistrictid : 0,
      perPinCode : ''

    }
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
      console.log(data);
    });

    this.employeesService.getEducation().subscribe((edData: any) =>{
      this.educationMaster = edData;
      console.log(edData);

    });

  }
  // onSelectEd(id:number){
  //   console.log(id);
  //   this.addEmployee.eid= this.id;
  //   return this.id;
  // }
  onSelectCorStateName(id: number): void {
    this.params = id;
    this.getStates(id);
    // this.addEmployee.countryid= this.id;
    console.log(id);                  // and fetch its ID as well, depends on how you want to use this.
  }
  onSelectStateName(id: number): void {
    this.params = id;
    this.getPerStates(id);
    // this.addEmployee.perCountryid= this.id;
    console.log(id);                  // and fetch its ID as well, depends on how you want to use this.
  }
  getStates(params: number): void {
    this.employeesService.getStates(this.params).subscribe((data: any) => {
      this.stateMaster = data;
      console.log(data);

    });
  }

  getPerStates(params: number): void {
    this.employeesService.getStates(this.params).subscribe((data: any) => {
      this.stateMaster = data;
      console.log(data);

    });
  }


  onSelectCorDistrictName(id: number): void {
    this.params = id;
    this.getDistrict(id);
    console.log(id);                  // and fetch its ID as well, depends on how you want to use this.
  }
  onSelectDistrictName(id: number): void {
    this.params = id;
    this.getPerDistrict(id);
    console.log(id);                  // and fetch its ID as well, depends on how you want to use this.
  }
  getDistrict(params: number): void {
    this.employeesService.getDistrict(this.params).subscribe((data: any) => {
      this.districtMaster = data;
      console.log(data);

    });
  }
  getPerDistrict(params: number): void {
    this.employeesService.getDistrict(this.params).subscribe((data: any) => {
      this.districtMaster = data;
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
    this.addEmployee.obj1.lastName = str;

    //city name title case
    str = this.addEmployee.obj2.city;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    this.addEmployee.obj2.city = str;

    this.employeesService.addEmployees(this.addEmployee).subscribe({
      next: (employee) => {
        this.router.navigate(['']);
        console.log(employee);
      },
    });
  }
}
