import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[CommonService, Component],
})
export class LoginComponent implements OnInit {

  btnName = 'Log In'; 
  title = 'Welcome to AutoRecruits';
  loginForm:FormGroup;
  LoginErrUser : any; LoginErrAll: any;  flag : any;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private CommonService:CommonService, private Component:Component,  private route: ActivatedRoute, private router: Router) 
  {
    this.getformReady();
    if (this.CommonService.currentUserValue) {  this.router.navigate(['/dashboard']); }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  getformReady()
  {
    this.loginForm = this.formBuilder.group({
      'username' : ['', Validators.required],
      'password' : ['', [Validators.required,Validators.minLength(8)]],
      'flag'     : [''],
    });
  }

  loginAction()
  {
    this.CommonService.loginAction(this.loginForm.value)
    .subscribe((dataResponse: any) => {
        if(dataResponse.status==200)
        {
          this.LoginErrUser = "";
          this.LoginErrAll = "";
          this.CommonService.showSnackBar(dataResponse.message, 'Manage Candidates');
          //this.router.navigate(['/dashboard']);
          window.location.reload();
          this.router.navigate([this.returnUrl]);
        }
        else
        {
          this.LoginErrAll = dataResponse.message;
        }
      }, 
      (err: any) => {
        console.log(err);
      });
  }

  checkLoginUserId(data)
  {
    this.LoginErrAll =  "";
    let patterMobile:any = /^([9876]{1,1})+([0-9]{9,9})$/;
    let patternEmail:any = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if(patterMobile.test(data.username))
    {
       this.flag = "Mobile";
       this.CommonService.checkLoginUserId(this.loginForm.value)
       .subscribe((dataResponse: any) => {
          if(dataResponse.status==201)
          {
            this.LoginErrUser = data.message;
          }
          else
          {
            this.LoginErrUser = "";
          }
        }, 
        (err: any) => 
        {
          this.LoginErrUser = "";
        });
    }
    else if(patternEmail.test(data.username))
    {
       this.flag = "Email";
       this.CommonService.checkLoginUserId(this.loginForm.value)
       .subscribe((dataResponse: any) => {
          if(dataResponse.status==201)
          {
            this.LoginErrUser = data.message;
          }
          else
          {
            this.LoginErrUser = "";
          }
        }, 
        (err: any) => 
        {
          this.LoginErrUser = "";
        });
    }
    else
    {
        this.LoginErrUser = "Invalid Username";
    }

  }

}
