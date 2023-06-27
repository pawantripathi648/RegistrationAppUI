import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CountryMaster,
  StateMaster,
  DistrictMaster,
  EducationMaster,
  studentDetail,
} from './Models/employee.model';
import { Employ } from './Models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl = 'https://localhost:7212';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryMaster[]> {
    return this.http.get<CountryMaster[]>(
      this.baseApiUrl + '/api/registratioApi/countryname'
    );
  }
  getStates(params: number): Observable<StateMaster[]> {
    return this.http.get<StateMaster[]>(
      this.baseApiUrl + '/api/registratioApi/statename/' + params
    );
  }
  getDistrict(params: number): Observable<DistrictMaster[]> {
    return this.http.get<DistrictMaster[]>(
      this.baseApiUrl + '/api/registratioApi/districtname/' + params
    );
  }

  getEducation(): Observable<EducationMaster[]> {
    return this.http.get<EducationMaster[]>(
      this.baseApiUrl + '/api/registratioApi/education'
    );
  }

  getAllEmployees(params: string): Observable<studentDetail[]> {
    return this.http.get<studentDetail[]>(
      this.baseApiUrl + '/api/registratioApi/' + params
    );
  }

  addEmployees(addEmployee: Employ): Observable<Employ> {
    return this.http.post<Employ>(
      this.baseApiUrl + '/api/registratioApi/',
      addEmployee
    );
  }

  getEmployee(id: string): Observable<studentDetail> {
    return this.http.get<studentDetail>(
      this.baseApiUrl + '/api/registratioApi/' + id
    );
  }
  updateEmployee(
    id: number,
    updateEmployeeRequest: studentDetail
  ): Observable<studentDetail> {
    return this.http.put<studentDetail>(
      this.baseApiUrl + '/api/employeeApi/' + id,
      updateEmployeeRequest
    );
  }

  deleteEmployee(id: number): Observable<studentDetail> {
    return this.http.delete<studentDetail>(
      this.baseApiUrl + '/api/employeeApi/' + id
    );
  }
}
