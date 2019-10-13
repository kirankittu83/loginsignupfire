import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as firebase from 'firebase';
import { Router } from "@angular/router";

// export class PhoneNumber {
//   country: string;
//   area: string;
//   prefix: string;
//   line: string;

//   // format phone numbers as E.164
//   get e164() {
//     const num = this.country + this.area + this.prefix + this.line;
//     return `+${num}`;
//   }

// }

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  private signInformGroup: FormGroup;
  // phoneNumber = new PhoneNumber()
  verificationCode: string;
  public Phonenumber;
  user: any;
  windowRef: any;
  public recaptchaVerifier;

  constructor(
    private signInformBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.windowRef = this.authService.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
    this.signInformGroup = new FormGroup({
      signinformcontrolname: new FormControl('', [Validators.required]),
      userPhonenumber: new FormControl('', Validators.required),
      userVerificationCode: new FormControl('', Validators.required)
    });
   }

   get formControl() { return this.signInformGroup.controls; }

  //  onSubmit(formData) {
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = this.signInformGroup.get('phonenumber').value.toString();

  //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     .then((confirmationResult) => {
  //       // this.sent = true;
  //       const verification = prompt('Enter verification code');
  //       if (verification != null) {
  //         console.log(verification);
  //         confirmationResult.confirm(verification)
  //           .then((good) => {
  //             // all checks out
  //           })
  //           .catch((bad) => {
  //             // code verification was bad.
  //           });
  //       } else {
  //         console.log('No verification code entered');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('sms not sent', err);
  //     });
  // }

  sendLoginCode() {
    const Phonenumber = this.signInformGroup.get('userPhonenumber').value.toString();
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = Phonenumber;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
    .then(result => {
      this.windowRef.confirmationResult = result;
    })
    .catch( error => console.log(error));
  }

  verifyLoginCode() {
    this.verificationCode = this.signInformGroup.get('userVerificationCode').value.toString();
    this.windowRef.confirmationResult
    .confirm(this.verificationCode)
    .then( result => {
      this.router.navigate(['/dashboard']);
      // this.user = result.user;
    })
    .catch(error => console.log(error, 'Incorrect code entered'));
  }

  getErrorMessage(name, isMsg?) {
    switch (name) {
      case 'userName': return isMsg ? "errorusername" : this.formControl.signinformcontrolname.invalid;
    }
  }

}
