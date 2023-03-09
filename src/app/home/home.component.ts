import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { UserInfoService } from '../user-info.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userPosts: any = [];
  usersList: any = []; 
  posteduser = '';
  otheruserdetails: any = [];
  subscription!: Subscription;
  loginedUser = '';
  loginedUserName = '';
  allUsers: any = [];
  allUserNames: any = [];
  loginedUserFollowers: any = [];
  loginedUserFollowing: any = [];
  suggested: any = [];
  suggestedusers:any =[];
  otheruser= '';
  likecolor='';
  likecount:any ='';
  currentpost='';
  likecounto:any = ''
  lastlike:any =''
  posts:any = [];
  allPosts:any = [];
  errMsg = ''; 
  logeduserFollowing:any= []
  obj:any={}
  myPosts:any = [];
  dp='';
  red:boolean = false;

  // dummy='325537466_1861318494209777_2719947505190623513_n.jpg'


  constructor(
    private us: UserServiceService,
    private router: Router,
    private http: HttpClient,
    private ui: UserInfoService
  ) {}

  ngOnInit(): void { 

    this.otherposts()
 
    this.us.showpost().subscribe(
      
      (result:any) => {
        
        this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '');
        this.us.getMyProfile(this.loginedUser).subscribe((logeduser:any)=> {
          console.log(logeduser.myDetails.following);
         let logeduserFollowing = logeduser.myDetails.following;
        
        this.posts = result.posts;
        
        console.log(this.posts, "pp");
        console.log(logeduserFollowing);
        let arr = [];

        for (let i of this.posts){
          console.log(i.uname == this.loginedUser, "frfr");
       
          console.log(i,"j");
          for(let j of logeduserFollowing){
            

            if (i.uname == this.loginedUser){
              arr.push(i)
              this.dp=i.postUrls              
              console.log(arr,"kjjj");
              break;
            }

            if(i.uname == j){
              
              arr.push(i);
              
              
              console.log("arr");
            }
            
            
            this.allPosts = arr;
            this.myPosts = this.allPosts
          
            console.log(i);
            console.log(j); 
          } 
          }

        this.myPosts.reverse()
        if(this.myPosts.length == 0){
          this.errMsg = "empty";
        }
   
      })
      })

    // this.us.showpost().subscribe(
      
    //   (result:any) => {
        
    //     this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '');
    //     this.us.getMyProfile(this.loginedUser).subscribe((logeduser:any)=> {
    //       console.log(logeduser.myDetails.following);
    //      let logeduserFollowing = logeduser.myDetails.following;
        
    //     this.posts = result.posts;
        
    //     let newArr = this.posts.filter(function(item:any){
          
    //       return logeduserFollowing.includes(item.uname)
    //     })
    //     console.log(newArr,"obb");

    //     if(newArr.length != 0){

    //         let logedArr = result.posts.filter(function(el:any) {
    //         let loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '');
    //         let hold = []
    //         hold.push(loginedUser)  
            
    //         return hold.includes(el.uname)
    //       })
           
    //       this.allPosts = newArr;
    //       this.allPosts.push(logedArr[0])
    //       this.allPosts = this.allPosts.reverse();
    //       console.log(this.allPosts);
          
          


    //     }else{
    //       this.errMsg = "empty"
    //     }
        
    //   })
    //   })




    this.us.getUsersList().subscribe((result: any) => {
      this.userPosts = result.userlist.reverse();
      console.log(this.userPosts, "yf");
      
      this.usersList = result.userlist;

      for (let user of this.usersList) {
        this.allUserNames.push(user.uname);
      }

      this.loginedUser = JSON.parse(
        localStorage.getItem('currentUsername') || ''
      );
      this.loginedUserName = JSON.parse(
        localStorage.getItem('currentUser') || ''
      );
      localStorage.removeItem('followers');
      localStorage.removeItem('following');
      localStorage.removeItem('posts');
    });

    this.loginedUser = JSON.parse(
      localStorage.getItem('currentUsername') || ''
    );
    this.suggetions(this.loginedUser);

  }

  getuser() {
    this.router.navigateByUrl('/otherprofile');
  }

  otherprofile(posteduser: any) {
    this.us.otherprofile(posteduser)
    console.log(posteduser);
    localStorage.setItem('otheruser', JSON.stringify(posteduser))
        this.router.navigate(['/otherprofile', posteduser]);

      }

    // this.us.otherprofile(this.otheruser).subscribe(
    //   (result: any) => {
    //     // console.log(result.otheruser);
    //     this.otheruserdetails = result.otheruser;
    //     console.log(this.otheruserdetails);
        
    //     // localStorage.setItem('followers', JSON.stringify(result.otheruser.follwers.length))
    //     this.ui.changeUser(this.otheruserdetails);
    //     // this.us.otherUsers()
    //   },
    //   (result) => {
    //     alert(result.error.message);
    //   }
    // );
 

  // getUserData(user:any){
  //   // this.us.getUserData()

  // }

  suggetions(loginedUser: any) {
    this.us.suggetions(loginedUser).subscribe((result: any) => {
      this.loginedUserFollowers = result.loginedUser.follwers;
      this.loginedUserFollowing = result.loginedUser.following;
      console.log( this.loginedUserFollowing);
      
      
      console.log(this.allUserNames);
      // console.log(result.loginedUser, "jj");
      let allUserNames = this.allUserNames;
      let loginedUserFollowers = this.loginedUserFollowers;
      let removedarray = allUserNames.filter(function (el: any) {
        return !loginedUserFollowers.includes(el);
      });
      // let index = removedarray.indexOf(loginedUser)
 

      let arr: any[] = [];
      arr.push(loginedUser);
      let suggested = removedarray.filter(function (e: any) {
        return !arr.includes(e);
      });
      this.suggested = suggested;
      console.log(suggested,"sud");


      let loginedUserFollowing = this.loginedUserFollowing
      let suggestedusers = suggested.filter(function (e: any) {
        return !loginedUserFollowing.includes(e);
      });
      this.suggestedusers = suggestedusers;
      console.log(suggestedusers,"ljh");

      // for(let username of this.allUserNames){
    });
  }

 

  
  like(post:any){
    console.log( post);
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '');
    let loginedUser = this.loginedUser;
    let uname = post.uname;
    let likeInfo = {
        loginedUser: loginedUser,
        uname:uname
    } 
    console.log(likeInfo);
    this.us.like(likeInfo).subscribe(
      (result:any) => {
        // this.addlike()
        this.likecolor = 'red';
        this.currentpost = uname;
        this.likecount=result.data.likescount
        this.likecounto=this.likecount-1
        this.lastlike = loginedUser;
        localStorage.setItem('likecount', JSON.stringify(this.likecount))
        alert(result.message)


    },(result:any) => {
      this.likecolor = 'white';
      // console.log(this.likecount);
      
      this.likecount=result.error.data.likescount
      this.likecounto=this.likecount-1
      let len = result.error.data.likes.length-1;
      this.lastlike = result.error.data.likes[len];
      console.log(this.lastlike);
      localStorage.setItem('likecount', JSON.stringify(this.likecount))
      alert(result.error.message)

    }
    
    )
    
  }


  otherposts(){
    this.loginedUser = JSON.parse(localStorage.getItem('currentUsername') || '' );
    this.us.otherposts(this.loginedUser).subscribe(
      (result:any) => {
        console.log(result.user);
        // allPosts
        this.allPosts.push(result.user.postUrls);
        console.log(this.allPosts);
        for(let i of this.allPosts){
          this.dp = i;
          console.log(this.dp);
          
        }
        
        
      }
      )
  }


  // showpost(){
  //   this.us.showpost().subscribe(
  //     (result:any) => {
  //       this.posts = result.posts
  //       alert(result.message);
        
  //     })
  // }
 



  






// function addlike() {
// }
//   suggetions(loginedUser: any) {
//     this.us.suggetions(loginedUser).subscribe((result: any) => {
//       this.loginedUserFollowers = result.loginedUser.follwers;
//       console.log(this.loginedUserFollowers);
      
      
//       console.log(this.allUserNames);
//       // console.log(result.loginedUser, "jj");
//       let allUserNames = this.allUserNames;
//       let loginedUserFollowers = this.loginedUserFollowers;
//       let removedarray = allUserNames.filter(function (el: any) {
//         return !loginedUserFollowers.includes(el);
//       });
//       // let index = removedarray.indexOf(loginedUser)


//       let arr: any[] = [];
//       arr.push(loginedUser);
//       let suggested = removedarray.filter(function (e: any) {
//         return !arr.includes(e);
//       });
//       this.suggested = suggested;
//       // console.log(suggested);
//       // for(let username of this.allUserNames){
//     });
//   }
// }
}
