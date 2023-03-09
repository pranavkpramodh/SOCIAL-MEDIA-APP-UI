import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpostComponent } from './addpost/addpost.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OtheruserprofileComponent } from './otheruserprofile/otheruserprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'register', component:RegisterComponent },
  { path: 'home', component:HomeComponent },
  // { path: 'tools', component:BirthComponent }
  { path: 'addpost', component:AddpostComponent },
  { path: 'profile', component:ProfileComponent },
  { path: 'otherprofile/:uname', component:OtheruserprofileComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
