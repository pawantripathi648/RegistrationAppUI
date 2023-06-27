export interface studentDetail {
  id: number;
  firstName: string;
  lastName: string;
  fname: string;
  mname: string;
  mnumber: string;
  email: string;
  profileimg: string;
  courseName: string;
  LOne: string;
  LTwo: string;
  city: string;
  countryid: number;
  stateid: number;
  districtid: number;
  pincode: string;
}
export interface Employ {
  firstName: string;
  lastName: string;
  fname: string;
  mname: string;
  mnumber: string;
  email: string;
  profileimg: string;
  courseName: string;
  LOne: string;
  LTwo: string;
  city: string;
  countryid: number;
  stateid: number;
  districtid: number;
  pincode: string;
}
export interface CountryMaster {
  countryid: number;
  countryName: string;
  Isactive: number;
}
export interface StateMaster {
  stateid: number;
  stateName: string;
  countryid: number;
  Isactive: number;
}
export interface DistrictMaster {
  districtid: number;
  districtName: string;
  stateid: number;
  Isactive: number;
}
