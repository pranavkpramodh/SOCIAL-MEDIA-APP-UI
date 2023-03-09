import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  constructor(private fb:FormBuilder, private us:UserServiceService, private router:Router) { }

  loginedUser = '';
  user:any = [];
  images:any=[];

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '');

  }

  addpostForm = this.fb.group({
    desp:['', []],
    img:['', [Validators.required]]

  })

  addpost(){
    alert("Posted Successful")
    this.router.navigateByUrl("home")
  }
 

  preview(){
    console.log(this.addpostForm.value.img);
    let desp = this.addpostForm.value.desp;
    let temp = this.addpostForm.value.img;
    let img = temp?.slice(12)
    console.log(img);

     
    if(this.addpostForm.valid){
      this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '');
      this.us.preview(this.loginedUser, desp, img).subscribe((result:any) => {
        this.user = result.user;
        console.log(this.user);
        
        this.images = img;
        
        // let b = alert(result.message)

      })
    }(result:any) => {
      alert(result.error.message)

    }
    
  }

} 
