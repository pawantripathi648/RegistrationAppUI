import { Component, OnInit } from '@angular/core';
import {
  Employ,
  CountryMaster,
  StateMaster,
  DistrictMaster,
  EducationMaster,
  studentDetail,
  studentlistid,
  Employed,
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
    profileimg: '',
    courseName: '',
    aid: 0,
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
    perAid: 0,
    perLOne: '',
    perLTwo: '',
    perCity: '',
    perCountryName: '',
    perStateName: '',
    perDistrictName: '',
    perPincode: '',
  };

  addEmployee: Employed = {
    obj1: {
      id: 0,
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
      aid: 0,
      lOne: '',
      lTwo: '',
      city: '',
      countryid: 0,
      stateid: 0,
      districtid: 0,
      pincode: '',
    },
    obj3: {
      perAid: 0,
      perLone: '',
      perLtwo: '',
      perCity: '',
      perCountryid: 0,
      perStateid: 0,
      perDistrictid: 0,
      perPinCode: '',
    },
  };
  name: string='';
  file: any;
  a: any;
 url="/assets/";
  onSelectFile(a: any){
    if(a.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(a.target.files[0]);
      reader.onload=(event: any)=>{
        this.url =event.target.result;
        this.a = a.target.files[0];
        this.addEmployee.obj1.profileimg =a.target.files[0].name;
        // console.log( a.files.name);
        }
    }

  };
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response: studentlistid[]) => {
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

    this.employeeService
      .updateEmployee(
        this.detailEmployee.id,
        this.detailEmployee.aid,
        this.detailEmployee.perAid,
        this.addEmployee
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.detailEmployee.id,
      this.detailEmployee.aid,
      this.detailEmployee.perAid).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}
