import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.css']
})
export class BirthComponent implements OnInit {

  bday = ''

   
  constructor(private fb:FormBuilder, private us:UserServiceService, private router:Router) { }
  
  bdayForm = this.fb.group({
    bday:['', [Validators.required]]

  })



  ngOnInit(): void {
  }

  // birthday(){
  //   console.log(this.bdayForm);
  //   let bday = this.bdayForm.value;

  //   if(this.bdayForm.valid){
  //     console.log(bday);
      
  //     this.us.birthday(bday)
  //     .subscribe((result:any) =>{
  //       alert(result.message)

  //     },
  //     result => {
  //       alert(result.error.message)
  //     }
  //     )

  //   }
    
  // }

}
