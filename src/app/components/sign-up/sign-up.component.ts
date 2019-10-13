import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  public signupformgroup: FormGroup;
  public firstname;
  public lastname;
  public userEmail;
  public userPwd;
  // public dirty;
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.signupformgroup = new FormGroup({
      signupfirstname: new FormControl('', Validators.required),
      signuplastname: new FormControl('', Validators.required),
      signupemail: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      signuppassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    });
    // this.dirty = this.signupformgroup.controls.signupfirstname.dirty;
  }

  get formControl() { return this.signupformgroup.controls; }


  SignUp() {
  this.firstname = this.signupformgroup.get('signupfirstname').value;
  this.lastname = this.signupformgroup.get('signuplastname').value;
  this.userEmail = this.signupformgroup.get('signupemail').value;
  this.userPwd = this.signupformgroup.get('signuppassword').value;
  this.authService.SignUp(this.userEmail, this.userPwd);
  }

}
