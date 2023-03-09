import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { UserInfoService } from '../user-info.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-otheruserprofile',
  templateUrl: './otheruserprofile.component.html',
  styleUrls: ['./otheruserprofile.component.css'],
})
export class OtheruserprofileComponent implements OnInit {
  user:any = []
  userf:any = []
  subscription!:Subscription;
  loginedUser= '';
  otheruser= '';
  followerscount = '';
  followingcount = ''; 
  lfollowerscount = '';
  lfollowingcount = '';
  followers =''; 
  btnstyle = 'rgb(61, 152, 255)'
  following ='';
  posts =''; 
  otheruserdetails:any = [];
  followbtn = '';
  otherusername='';
  allPosts:any = [];
  likescount= ''
  pictures = '';
  dp = '';
  clickeduname = '';


  constructor(private ui:UserInfoService, private us:UserServiceService, private router:Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.clickeduname = this.activatedroute.snapshot.params['uname'];
    
  
    this.otherprofile()
    this.otherlikes();
    this.otherposts()

  } 

  followingUser(){
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername' ) || '' )
    this.otheruser =this.user.uname;    
    console.log(this.otherusername);
    
    this.us.followingUser(this.loginedUser, this.clickeduname).subscribe((result:any) => {

    })
    

  } 


  follow(){
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername' ) || '' )

    this.otheruser =this.user.uname;    

    // console.log(this.otheruser);
    this.us.follow(this.loginedUser, this.clickeduname).subscribe((result:any) => {
      // this.followerscount = result.length
      console.log(result.user.follwers.length,"ggg");
        

      this.followerscount = result.user.follwers.length;
      this.followingcount = result.user.following.length;
      
 
      if(this.loginedUser != this.clickeduname){
        alert(result.message)
        this.followbtn = result.following;
        this.btnstyle = "rgb(61, 152, 255)";


      }

    },
    result => {
      this.followerscount=result.error.total
      // console.log(this.followerscount);
      // if(this.loginedUser != this.otheruser){
        alert(result.error.message)
        this.followbtn = result.error.follow
        this.btnstyle = " ";
        window.location.reload()
      }
    // }

    )


  }

  // following(){

  // }


  otherprofile(){
    this.otherusername = JSON.parse(localStorage.getItem('otheruser') || '' )
    
    this.us.otherprofile(this.clickeduname).subscribe((result:any) => {
      this.otheruserdetails = result.otheruser
      console.log(this.otheruserdetails);
      
      this.followerscount = result.otheruser.follwers.length;
      this.followingcount = result.otheruser.following.length;
      // console.log(this.followerscount);
      // console.log(this.followingcount);
      
      
      

    },result => {
      alert(result.error.message)
    }
    )
  }


  searcheduser(uname:any, followers:any, following:any, fullName:any){
    console.log(uname);
    alert('orks')
  }


  otherlikes(){
    this.otherusername = JSON.parse(localStorage.getItem('otheruser') || '' )
    
    this.us.otherlikes(this.clickeduname).subscribe(
      (result:any) => {
        console.log(result.user);
        // alllikes
        this.likescount = result.user.likescount;
 

        
      }
      )
  }


  
  otherposts(){
    this.otherusername = JSON.parse(localStorage.getItem('otheruser') || '' )
    this.us.otherposts(this.clickeduname).subscribe(
      (result:any) => {
        console.log(result.user);
        // allPosts
        this.allPosts.push(result.user.posts);
        for(let i of this.allPosts){
          this.pictures = i; 

          this.dp = this.pictures[this.pictures.length-1]

          
          
        }
        console.log(this.dp);
        
        console.log(this.allPosts,"df");       
        
      }
      )
  }






}
