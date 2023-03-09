import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  menuShow:boolean = false; 
  searchShow:boolean = false;
  notificationShow:boolean = false;

  allusers:any = [];
  currentUsername =''
  searchKey='' ;
  loginedUser='';
  notifications:any = []

  constructor(private us:UserServiceService, private router:Router, private ui:UserInfoService, private http :HttpClient) { }

  ngOnInit(): void {


    this.us.getUsersList().subscribe((result:any)=>{
      this.allusers = result.userlist;
      
    })   

    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '')


    this.getNotification(this.loginedUser)


  }
// search function
  search(event:any){
     this.searchKey = event.target.value
    // this.us.searchKey.next(searchKey)
    console.log(this.searchKey);
    
  }
  
 

  getNotification(loginedUser:any){
    // console.log(loginedUser);
    this.us.getNotification(loginedUser).subscribe(
      (result:any) => {
        this.notifications = result.notification
        // console.log(this.notificaton);
    },(result:any) => {
      alert(result.error.message)
    }
    
    )
  }

  showMenu(){ 
    this.menuShow =! this.menuShow;                                     
  }

  showSearch(){
    this.searchShow =! this.searchShow; 

  }

  showNotification(){
    this.notificationShow =! this.notificationShow;
  }

  logout(){
    
    this.currentUsername = JSON.parse(localStorage.getItem('currentUsername') || '')
    this.us.logout(this.currentUsername).subscribe((result:any) => {
      alert(result.message);
    },result => {
      alert(result.error.message)
    })
    
    this.router.navigateByUrl('/')
    localStorage.removeItem('currentUsername');
    localStorage.removeItem('token');
    localStorage.removeItem('otheruser');
    localStorage.removeItem('likecount');

 
  }


 

}
