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
    eid: 0,
    courseName: '',
    aid: 0,
    lOne: '',
    lTwo: '',
    city: '',
    ccountryId: 0,
    countryName: '',
    cstateId: 0,
    stateName: '',
    cdistrictId: 0,
    districtName: '',
    pincode: '',
    perAid: 0,
    perLOne: '',
    perLTwo: '',
    perCity: '',
    perCountryId: 0,
    perCountryName: '',
    perStateId: 0,
    perStateName: '',
    perDistrictId: 0,
    perDistrictName: '',
    perPincode: '',
  };
  corcid = 0;
  percid = 0;
  corsid = 0;
  persid = 0;
  name: string = '';
  file: any;
  a: any;
  url = '/assets/';
  onSelectFile(a: any) {
    if (a.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(a.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.a = a.target.files[0];
        this.detailEmployee.profileimg = a.target.files[0].name;
        // console.log( a.files.name);
      };
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response: studentlistid[]) => {
              this.detailEmployee = response[0];
              console.log(response);
              this.corcid = response[0].ccountryId;
              this.percid = response[0].perCountryId;
              this.corsid = response[0].cstateId;
              this.persid = response[0].perStateId;
              this.url = this.url+ [response[0].profileimg];
              // console.log(this.corcid);
              this.preloadcorsatetname(this.corcid);
              this.preloadpersatetname(this.percid);
              this.preloadcordistrictname(this.corsid);
              this.preloadperdistrictname(this.persid);
            },
          });
        }
      },
    });

    this.employeeService.getEducation().subscribe((edData: any) => {
      this.educationMaster = edData;
      // console.log(edData);
    });

    this.employeeService.getCountries().subscribe((perCountrydata: any) => {
      this.permanentCountryMaster = perCountrydata;
      // console.log(perCountrydata);
    });
    this.employeeService.getCountries().subscribe((countrydata: any) => {
      this.corosCountryMaster = countrydata;
      // console.log(countrydata);
    });

}
  preloadcorsatetname(id: number): void {
    this.employeeService.getStates(id).subscribe((stateData: any) => {
      this.corosStateMaster = stateData;
    });
  }
  preloadpersatetname(id: number): void {
    this.employeeService.getStates(id).subscribe((perstateData: any) => {
      this.permanentStateMaster = perstateData;
    });
  }
  preloadcordistrictname(id: number): void{
    this.employeeService
      .getDistrict(id)
      .subscribe((districtData: any) => {
        this.corosDistrictMaster = districtData;
      });
  }
  preloadperdistrictname(id: number): void{
    this.employeeService
      .getDistrict(id)
      .subscribe((perdistrictData: any) => {
        this.permanentDistrictMaster = perdistrictData;
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
    let updateDetails: Employed = {
      obj1: {
        id: this.detailEmployee.id,
        firstName: this.detailEmployee.firstName,
        lastName: this.detailEmployee.lastName,
        fname: this.detailEmployee.fname,
        mname: this.detailEmployee.mname,
        mnumber: this.detailEmployee.mname,
        email: this.detailEmployee.email,
        profileimg: this.detailEmployee.profileimg,
        eid: this.detailEmployee.eid,
      },
      obj2: {
        aid: 0,
        lOne: this.detailEmployee.lOne,
        lTwo: this.detailEmployee.lTwo,
        city: this.detailEmployee.city,
        countryid: this.detailEmployee.ccountryId,
        stateid: this.detailEmployee.cstateId,
        districtid: this.detailEmployee.cdistrictId,
        pincode: this.detailEmployee.pincode,
      },
      obj3: {
        perAid: 0,
        perLone: this.detailEmployee.perLTwo,
        perLtwo: this.detailEmployee.perLTwo,
        perCity: this.detailEmployee.perCity,
        perCountryid: this.detailEmployee.perCountryId,
        perStateid: this.detailEmployee.perStateId,
        perDistrictid: this.detailEmployee.perDistrictId,
        perPinCode: this.detailEmployee.perPincode,
      },
    };
    //title case conversion
    let str = updateDetails.obj1.firstName;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    updateDetails.obj1.firstName = str;

    //last name in small letters
    str = updateDetails.obj1.lastName;
    if (str.length == 0) {
      str = '--';
    } else {
      str = str.toLowerCase();
    }
    updateDetails.obj1.lastName = str;
    //fname
    str = updateDetails.obj1.fname;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    updateDetails.obj1.fname = str;
    //mname
    str = updateDetails.obj1.mname;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    updateDetails.obj1.mname = str;
    //city
    str = updateDetails.obj2.city;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    updateDetails.obj2.city = str;

    str = updateDetails.obj3.perCity;
    str = str ? str.charAt(0).toUpperCase() + str.substr(1).toLowerCase() : '';
    updateDetails.obj3.perCity = str;

    this.employeeService
      .updateEmployee(
        this.detailEmployee.id,
        this.detailEmployee.aid,
        this.detailEmployee.perAid,
        updateDetails
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/employee']);
        },
      });
  }

  deleteEmployee() {
    this.employeeService
      .deleteEmployee(
        this.detailEmployee.id,
        this.detailEmployee.aid,
        this.detailEmployee.perAid
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
      });
  }
}
