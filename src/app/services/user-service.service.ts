import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  

  constructor(private http:HttpClient ) { }

  searchKey = new BehaviorSubject('')

  register(num:any, fullName:any, uname:any, pswd:any, bday:any){
    const data = {
          num,
          fullName,
          uname, 
          pswd,
          bday    
    }
    
    // return this.http.post('http://localhost:3000/register', data)
    return this.http.post('http://localhost:3002/register', data)
  }


  login(uname:any, pswd:any){
    const data = {
      uname,
      pswd
    }
    // return this.http.post('http://localhost:3000/login', data)
    return this.http.post('http://localhost:3002/login', data)
  }

  getUsersList(){
    return this.http.get('http://localhost:3002/home')

  }

  suggetions(loginedUser:any){
    let data={
      loginedUser
    }
    return this.http.post('http://localhost:3002/suggetions', data)
    
  }

  logout(currentUsername:any){
    let data={
      currentUsername:currentUsername
    }
    return this.http.post('http://localhost:3002/logout',data)

  }

  otherprofile(uname:any){
    console.log(uname);
    
    let data={
      uname
    }
     
    return this.http.post('http://localhost:3002/otherprofile',data)
  }

  
  searchedProfile(uname:any){
    console.log(uname);
    let data={
      uname
    }
    
    return this.http.post('http://localhost:3002/search',data)
  }


  follow(loginedUser:any, otheruser:any){
    let data = {
      loginedUser,
      otheruser
    }
    return this.http.post('http://localhost:3002/follow', data)
  }

  followingUser(loginedUser:any, otheruser:any){
    let data = {
      loginedUser,
      otheruser
    }
    return this.http.post('http://localhost:3002/following', data)

  }

  getMyProfile(loginedUser:any){
    let data = {
      loginedUser:loginedUser
    }
    return this.http.post('http://localhost:3002/profile', data)
  }


  like(likeInfo:any){
   
    
    return this.http.post('http://localhost:3002/like', likeInfo)


  }


  getNotification(uname:any){
    let data = {
      uname
    }
    return this.http.post('http://localhost:3002/getNotification',data )

  }
 

  
  // add post
  preview(loginedUser:any, desp:any, img:any){
    let data = {
      loginedUser,
      desp,
      img
    }
    return this.http.post('http://localhost:3002/addpost',data )

  }

  showpost(){
    return this.http.get('http://localhost:3002/showpost')
  }

  updateuser(loginedUser:any, num:any, uname:any, fullName:any){
    let data = {
      loginedUser,
      num,
      uname,
      fullName
      
    }
    return this.http.post('http://localhost:3002/updateuser', data)
 
  }


  otherlikes(otherusername:any){
    let data = {
      otherusername
    }
    return this.http.post('http://localhost:3002/otherlikes', data)

  }


  otherposts(otherusername:any){
    let data = {
      otherusername
    }

    return this.http.post('http://localhost:3002/otherposts', data)


  }

} 


