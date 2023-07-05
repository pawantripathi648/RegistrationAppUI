import { Component } from '@angular/core';
import { login } from '../Models/employee.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { UploadService } from '../upload.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private http: HttpClient,
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: UploadService,
    public service: AuthService

  ) {}

  logins: login ={
    email:'',
    password:''
  };


  loginCheck() {
    this.employeesService.loginCheck(this.logins).subscribe({
      next: (validUser) => {
        if (validUser){
          this.service.validUser= true;
          this.router.navigate(['/employee']);
        }
        else{
          alert("Invalid Email or Password")

        }


      },
    });
  }
}
