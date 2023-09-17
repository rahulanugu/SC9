import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckJwtService } from '../shared/check-jwt.service';
import { ResetPasswordService } from '../shared/reset-password.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})

/**
 *  Page: password reset page for the patient users
 * queryparameters: AES encrypted JWT token
 */
export class ResetPasswordPageComponent implements OnInit {

  password:string ='';
  rePassword: string = '';
  errorVisible: boolean = false;
  visible:boolean = true;
  errorUpdating:boolean = false;
  token: string = '';
  passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!,@,#,$,%,^,&,*]).{6,20}";

  Form = this.formBuilderService.group({
    password: ["", Validators.required],
    rePassword: ["", Validators.required],
  });

  constructor(private route: ActivatedRoute,
    private service : CheckJwtService,
    private resetPasswordService: ResetPasswordService,
    private formBuilderService: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.token=params.token;
      if(!this.token){
        // this.router.navigate(['/error500'])
      }
      //console.log("token is here "+this.token);
    })
    //on intialization of the page, decode the jwt token and then see if the email for it exists in the db
    this.service.verifyJwtStatus(this.token).subscribe(
    res =>{
        //console.log("Token verified");
      },
      //If an error occurs verifying the jwt token, then redirect
    err => {
      //console.log("Token might have expired");
      // this.router.navigate(['/error500'])
    });
    //now on submission of passwords that match, will have to send back a request with new password and jwt token
  }

  onSubmission(){
      //console.log(this.Form.value)
      if(!(this.Form.value.password === this.Form.value.rePassword)){
        this.errorVisible = true;
      }else {
        this.resetPasswordService.makePasswordChange(this.token,this.Form.value.password).subscribe(
          response => {
            //console.log(response);
            //console.log(this.visible);
            this.errorVisible = false;
            this.visible = !this.visible;
          },
          error => {
            //console.log(error);
            //console.log(this.errorUpdating);
            this.errorVisible = false;
            this.errorUpdating = true;
          }
        );
      }
  }

}
