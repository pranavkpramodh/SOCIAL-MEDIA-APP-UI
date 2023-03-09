import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginedUser = ''
  loginedUserName = ''
  loginedUserInfo: any = [];

  editShow:boolean = false;
  profileShow:boolean = true;

  otherusername='';
  allPosts:any = [];
  likescount= '';
  dp='';
  pictures=''

  // subscription!:Subscription;

  constructor(private ui:UserInfoService, private us:UserServiceService, private fb:FormBuilder) { }

  num= ''
  fullName= ''
  uname= ''


  editProfileForm = this.fb.group({
    num:[''],
    fullName:[''],
    uname:[''],
    cuname:[''],
 
  })

  ngOnInit(): void {
    this.loginedUser = JSON.parse(localStorage.getItem('currentUser') || '' );
    this.loginedUserName = JSON.parse(localStorage.getItem('currentUser') || '' );
    // this.loginedser = JSON.parse(localStorage.getItem('currentUser') || '' );

    // this.subscription = this.ui.otherUsers.subscribe(user => {
    //   console.log(user);
      
    // })

    this.getMyprofile();
    this.otherlikes();
    // this.otherposts();


  }

  updateuser(){
    
    let num = this.editProfileForm.value.num;
    let fullName =  this.editProfileForm.value.fullName;
    let uname = this.editProfileForm.value.uname;
    let loginedUser = this.editProfileForm.value.cuname;
    console.log(num,fullName,uname,loginedUser);

    


    this.us.updateuser(loginedUser,num, uname, fullName).subscribe((result:any) => {
      console.log(result);
      localStorage.setItem('currentUsername', JSON.stringify(result.posts.uname))
      localStorage.setItem('currentUser', JSON.stringify(result.posts.fullName))
      
      alert(result.message);
    },(result:any)=>{
      alert(result.error.message);

    })



  }




   showedit(){
    this.editShow =! this.editShow
   }
  
   showprofile(){
    this.profileShow =! this.profileShow
   }
  





  getMyprofile(){ 
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '' );

    this.us.getMyProfile(this.loginedUser).subscribe((result:any) => {
      // console.log(result.myDetails.uname);
      this.loginedUserInfo = result.myDetails
          
        this.pictures = this.loginedUserInfo.posts; 

          this.dp = this.pictures[this.pictures.length-1]

      
      console.log(this.loginedUserInfo, "logine");
      
    }) 

  }

 
  
  otherlikes(){
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '' );
    console.log(this.otherusername);
    
    this.us.otherlikes(this.loginedUser).subscribe(
      (result:any) => {
        console.log(result.user);
        // alllikes
        this.likescount = result.user.likescount;
 

        
      }
      )
  }


  // otherposts(){
  //   this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '' );
  //   this.us.otherposts(this.loginedUser).subscribe(
  //     (result:any) => {
  //       console.log(result.user);
  //       // allPosts
  //       this.allPosts.push(result.user.postUrls);
  //       console.log(this.allPosts);
  //       for(let i of this.allPosts){
  //         this.pictures = i; 

  //         this.dp = this.pictures[this.pictures.length-1]
          
  //       }
  //       console.log(this.dp, "dp");
        
  //       console.log(this.allPosts,"df");    
        
  //     }
  //     )
  // }


  
 
}
 