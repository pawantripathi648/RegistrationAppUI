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
  lOne: string;
  lTwo: string;
  city: string;
  countryName: string;
  stateName: string;
  districtName: string;
  pincode: string;
  perLOne: string;
  perLTwo: string;
  perCity: string;
  perCountryName: string;
  perStateName: string;
  perDistrictName: string;
  perPincode: string;
}
export interface Employ {
  obj1: {
    firstName: string;
    lastName: string;
    fname: string;
    mname: string;
    mnumber: string;
    email: string;
    profileimg: string;
    eid: number;
  };
  obj2: {
    LOne: string;
    LTwo: string;
    city: string;
    countryid: number;
    stateid: number;
    districtid: number;
    pincode: string;
  };
  obj3: {
    perLone: string;
    perLtwo: string;
    perCity: string;
    perCountryid: number;
    perStateid: number;
    perDistrictid: number;
    perPinCode: string;
  };
  obj5:{
    email: string;
    password: string;
  }
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
export interface EducationMaster {
  eid: number;
  courseName: string;
}

export interface studentlistid {
  id: number;
  firstName: string;
  lastName: string;
  fname: string;
  mname: string;
  mnumber: string;
  email: string;
  profileimg: string;
  courseName: string;
  aid: number;
  lOne: string;
  lTwo: string;
  city: string;
  CcountryId: number;
  countryName: string;
  CstateId: number;
  stateName: string;
  CdistrictId: number;
  districtName: string;
  pincode: string;
  perAid: number;
  perLOne: string;
  perLTwo: string;
  perCity: string;
  perCountryName: string;
  perStateName: string;
  perDistrictName: string;
  perPincode: string;
}
export interface Employed {
  obj1: {
    id: number;
    firstName: string;
    lastName: string;
    fname: string;
    mname: string;
    mnumber: string;
    email: string;
    profileimg: string;
    eid: number;
  };
  obj2: {
    aid: number;
    lOne: string;
    lTwo: string;
    city: string;
    countryid: number;
    stateid: number;
    districtid: number;
    pincode: string;
  };
  obj3: {
    perAid: number;
    perLone: string;
    perLtwo: string;
    perCity: string;
    perCountryid: number;
    perStateid: number;
    perDistrictid: number;
    perPinCode: string;
  };
}
