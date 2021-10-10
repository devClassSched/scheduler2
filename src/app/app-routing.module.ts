import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ListCourseComponent } from './course/list-course/list-course.component';
import { ListClassroomComponent } from './classroom/list-classroom/list-classroom.component';
import { ListSemesterComponent } from './semester/list-semester/list-semester.component';
import { SchedulerComponent } from './scheduler/scheduler/scheduler.component';


const routes: Routes = [
  {path:'users', component: ListUsersComponent},
 
  {path:'course', component: ListCourseComponent},
  {path:'classroom', component: ListClassroomComponent},
  {path:'semester', component: ListSemesterComponent},
  {path:'scheduler', component: SchedulerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
