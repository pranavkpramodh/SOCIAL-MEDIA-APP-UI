import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname = '';
  pswd = '';
  // router: any;

  constructor(private fb:FormBuilder, private us:UserServiceService, private router:Router) { }

  ngOnInit(): void { 

    localStorage.removeItem('isLogged')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('currentUsername')
   

  }

  loginForm = this.fb.group({
    uname:['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.]*') ]],
    pswd:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })


  login(){
    console.log(this.loginForm);
    let uname = this.loginForm.value.uname;
    let pswd = this.loginForm.value.pswd;

    if(this.loginForm.valid){
      this.us.login(uname, pswd).subscribe((result: any) => {

        if(result.token){
            
        alert(result.message)
        this.router.navigateByUrl('home');
        // console.log(result.token);
        localStorage.setItem('currentUsername', JSON.stringify(result.currentUsername))
        localStorage.setItem('currentUser', JSON.stringify(result.currentUser))
        localStorage.setItem('token', JSON.stringify(result.token))
        localStorage.setItem('isLogged', JSON.stringify(result.isLogged))
        // console.log(result);
        
        
      } 
    
    },
      result => {
        alert(result.error.message)
      })
    }
    
    
  }

}
