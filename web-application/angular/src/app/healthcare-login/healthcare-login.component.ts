import { Component, OnInit, ɵConsole } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { HealthcareLoginService } from "../shared/healthcare-login.service";
import { Router } from "@angular/router";
import { HealthcareEditService } from "../shared/healthcare-edit.service";

/**
 * Page: Login page for heatlhcare providers
 */
export class HealthcareLoginDetails {
  //datamodel for sending username and password to backend
  username: string;
  password: string;
}
@Component({
  selector: "app-healthcare-login",
  templateUrl: "./healthcare-login.component.html",
  styleUrls: ["./healthcare-login.component.css"],
})
export class HealthcareLoginComponent implements OnInit {
  healthcareLoginDetails = new HealthcareLoginDetails();

  constructor(
    private formBuilderService: FormBuilder,
    private healthcareLoginService: HealthcareLoginService,
    private healthcareEditService: HealthcareEditService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.router.navigate(['healthcare-profile'])
  }

  Form = this.formBuilderService.group({
    emailAddress: ["", Validators.required],
    password: ["", Validators.required],
  });

  onSubmit() {
    // console.log(this.Form.value);
    this.healthcareLoginService
      .healthcareProviderLogin(this.Form.value)
      .subscribe(
        (res) => {
          //console.log("test");
          localStorage.setItem("token", res["idToken"]);
          localStorage.setItem("fname", res["firstName"]);
          localStorage.setItem("email", this.Form.value.emailAddress);
          //window.location.href = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=https%3A%2F%2Fwww.scriptchain.co%2Fhealthcare-profile&client_id=95da1fe3-9e58-4067-acdd-05664abe02f1";
          //Use Non-Production Client ID

          // TODO: integretate with Allscripts
          // window.location.href =
          //   "https://applescm184region.open.allscripts.com/authorization/connect/authorize?response_type=code&state&client_id=b5362fb7-a608-415f-aba9-fae232fce90e&scope=launch user/*.read&redirect_uri=https://www.scriptchain.co/healthcare-profile";
          this.router.navigate(["healthcare-profile"]);

          //james
          //Password#1

          //this.router.navigate(['healthcare-profile'])
        },
        (err) => {
          console.log(err);
          //console.log("Error is")
          //console.log(err)
          if (err.status == 401) {
            document
              .querySelector("#emailAddress")
              .classList.remove("is-invalid");
            document
              .querySelector("#invalidEmailPrompt")
              .classList.add("d-none");
            document.querySelector("#password").classList.add("is-invalid");
            document
              .querySelector("#invalidPasswordPrompt")
              .classList.remove("d-none");
            document.querySelector("#deactivatedEmail").classList.add("d-none");
          } else if (err.status == 303) {
            //console.log("deactivated email handling")
            //send a reactivare mail
            this.healthcareEditService
              .makeReactivateRequest({ email: this.Form.value.emailAddress })
              .subscribe(
                (response) => {
                  //console.log("response is recieved")
                  document
                    .querySelector("#deactivatedEmail")
                    .classList.remove("d-none");
                },
                (error) => {
                  //console.log("error is recieved")
                }
              );
          } else {
            //console.log("errorcode")
            document
              .querySelector("#invalidPasswordPrompt")
              .classList.add("d-none");
            document.querySelector("#emailAddress").classList.add("is-invalid");
            document.querySelector("#password").classList.add("is-invalid");
            document
              .querySelector("#invalidEmailPrompt")
              .classList.remove("d-none");
            // document.querySelector("#deactivatedEmail").classList.add("d-none");
          }
        }
      );
  }
}
