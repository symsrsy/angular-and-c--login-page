import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/account/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  errorMessages: string[] = [];
  returnUrl: string | null = null;

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
      this.accountService.user$.pipe(take(1)).subscribe({
        next: (user: User | null) => {
          if (user) {
            this.router.navigateByUrl('/');
          } else {
            this.activatedRoute.queryParamMap.subscribe({
              next: (params: any) => {
                if (params) {
                  this.returnUrl = params.get('returnUrl');
                }
              }
            })
          }
        }
      })
    }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login() {
    this.submitted = true;
    this.errorMessages = [];

    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        },
        error: error => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages.push(error.error);
          }
        }
      })
    }
  }

 
  // login() {
  //   this.submitted = true;
  //   this.errorMessages = [];
  
  //   this.accountService.login().subscribe(() => {
  //     if (this.accountService.isLoggedIn) {
  //       // Usually you would use the redirect URL from the auth service.
  //       // However to keep the example simple, we will always redirect to `/admin`.
  //       const redirectUrl = '/admin';

  //       // #docregion preserve
  //       // Set our navigation extras object
  //       // that passes on our global query params and fragment
  //       const navigationExtras: NavigationExtras = {
  //         queryParamsHandling: 'preserve',
  //         preserveFragment: true
  //       };

  //       // Redirect the user
  //       this.router.navigate([redirectUrl], navigationExtras);
  //       // #enddocregion preserve
  //     }
  //   });
  // }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl('/account/send-email/resend-email-confirmation-link');
  }
}
