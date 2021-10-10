import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';

import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { ClassroomModule } from './classroom/classroom.module';
import { CourseModule } from './course/course.module';
import { SchedulerComponent } from './scheduler/scheduler/scheduler.component';
import { SchedulerModule } from './scheduler/scheduler.module';
import { SemesterModule } from './semester/semester.module';
import { UsersModule } from './users/users.module';
import {MatIconModule} from '@angular/material/icon';
import { DialogModule } from './dialog/dialog.module';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    ClassroomModule,
    CourseModule,
    SchedulerModule,
    SemesterModule,
    UsersModule,
    DialogModule,
    MatSidenavModule,
    MatIconModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
