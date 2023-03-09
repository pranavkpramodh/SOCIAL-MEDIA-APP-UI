import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  public otherUsers = new BehaviorSubject(' ');

  otheruser = this.otherUsers.asObservable();

  constructor() { }
  changeUser(user:any){ 
    this.otherUsers.next(user);//update current user

  }




}
