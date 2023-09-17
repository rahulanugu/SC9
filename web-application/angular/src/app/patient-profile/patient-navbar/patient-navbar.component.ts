import { PatientDataService } from "../patient-data.service";
import { Component, OnInit } from "@angular/core";
import { LoginPatientService } from "../../shared/login-patient.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-patient-navbar",
  templateUrl: "./patient-navbar.component.html",
  styleUrls: ["./patient-navbar.component.css"]
})
export class PatientNavbarComponent implements OnInit {
  public patientData;
  public insuranceExpense;
  constructor(
    private _PatientDataService: PatientDataService,
    private _loginPatientService: LoginPatientService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.patientData = this._PatientDataService.getPatientVitals();
    this.insuranceExpense = this._PatientDataService.getInsuranceExpenses();
    //console.log(this.patientData[0]);
  }
  logout() {
    this._loginPatientService.logOutPatient();
  }
  profile(){
    this._router.navigate(['editpatient'])
  }
}
