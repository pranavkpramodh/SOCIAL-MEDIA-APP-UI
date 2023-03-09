import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  num = '';
  fullName = '';
  uname = '';
  pswd = ''; 
  bday = '';
  
  constructor(private fb:FormBuilder, private us:UserServiceService, private router:Router) { }

  registerForm = this.fb.group({
    num:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]*')]],
    fullName:['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    uname:['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.]*')]],
    pswd:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    bday:['', [Validators.required]]
  
  
  })

  ngOnInit(): void {
  }

  register(){
    // console.log(this.registerForm);

    let num = this.registerForm.value.num;
    let fullName = this.registerForm.value.fullName;
    let uname = this.registerForm.value.uname;
    let pswd = this.registerForm.value.pswd; 
    let bday = this.registerForm.value.bday; 
    
    if(this.registerForm.valid){
      this.us.register( num, fullName, uname, pswd, bday )

      .subscribe((result:any) => {
        alert(result.message);
        this.router.navigateByUrl('');
      },
      result => {
        alert(result.error.message)

      })

    }
    
  }

}
