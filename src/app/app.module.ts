import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BirthComponent } from './birth/birth.component';
import { ToolsComponent } from './tools/tools.component';
import { StoryComponent } from './story/story.component';
import { AddpostComponent } from './addpost/addpost.component';
import { ProfileComponent } from './profile/profile.component';
import { OtheruserprofileComponent } from './otheruserprofile/otheruserprofile.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BirthComponent,
    ToolsComponent,
    StoryComponent,
    AddpostComponent,
    ProfileComponent,
    OtheruserprofileComponent,
    FilterPipe,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
