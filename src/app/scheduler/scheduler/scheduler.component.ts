import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { SemesterService } from 'src/app/services/semester.service';
import { Course } from 'src/app/shared/course.model';
import { Scheduler } from 'src/app/shared/scheduler.model';
import { Semester } from 'src/app/shared/semester.model';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  schedulerList: any;
  typeList: string[] = ['CREATED','STARTED','COMPLETED'];
  displayedColumns: string[] = ['icon','status', 'totalcourses', 'completedcourses', 'coursenotcompleted','semester'];
  isCreate: boolean = false;
  semesterList!: Semester[];
  newSchedulerForm: FormGroup = new FormGroup({});
  courseList!: Course[];
  courseSize!: number;
  showForm: boolean = false;
  source = interval(1000);
  docRef: any;
  //subscription: Subscription = this.source.subscribe(val => this.refreshGrid());;
  
  
  
  constructor(private schedulerService: SchedulerService, 
    private courseService: CourseService,
    private semesterService: SemesterService,
    private formBuilder: FormBuilder,
    private snack: DialogService) { }

  ngOnInit(): void {
    this.refreshGrid();   
    this.refreshSemester();
    this.courseService.listCourse().subscribe((data : any)=>{
      this.courseList = data;
    });
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
}
  getAllCourses(){
    this.courseSize =this.courseList.length;
  }
  createScheduler(val: boolean){
    this.getAllCourses();
    this.newSchedulerForm = this.formBuilder.group({
      'status': new FormControl(0),
      'totalCourses': new FormControl(this.courseSize),
      'courseNotCompleted': new FormControl(this.courseSize),
      'sem': new FormControl('')
    })
   // this.subscription.unsubscribe();
    this.isCreate = val;
    this.showForm = val;
  }
  refresh(){
    this.refreshGrid();
    this.refreshSemester();
  }
  subscribe(){
   // this.subscription = this.source.subscribe(val => this.refreshGrid());
  }
  cancel(){
    this.isCreate = false;
    this.showForm = false;
  }
  refreshGrid(){

    this.schedulerService.listScheduler().subscribe((data : any) =>{
      this.schedulerList = data;
      this.isCreate = false;
      this.schedulerList.sort((a: Scheduler, b: Scheduler) => (a.id > b.id ? -1 : 1));
      this.schedulerList.forEach( (element : Scheduler) =>{
        if( element.status !== 'COMPLETED'){
          this.isCreate = true;
        }
      })
    });
   
  }
  refreshSemester(){
    this.semesterService.getSemesterNotIn().subscribe((data : any) =>{
      this.semesterList = data;
    });
  }
  delete(dataToSend : any){

    this.schedulerService.deleteScheduler(dataToSend).subscribe(data =>{
      this.snack.openSnackBar("Job  deleted.");       
      this.refresh();
    }, err=>{
      this.snack.openSnackBar("Unable to delete job.");   
      this.refresh();   
    });
  }
  saveNew(action: string){
    let dataToSend : Scheduler;
    dataToSend = this.newSchedulerForm.value;
    
    this.schedulerService.saveScheduler(dataToSend).subscribe(data =>{
      this.snack.openSnackBar("Job Scheduler saved.");    
      this.cancel();
      this.refresh();   
    }, err=>{
      this.snack.openSnackBar("Unable to save job scheduler");   
      this.cancel();
      this.refresh();    
    });
       
   // this.subscribe();
  }

  
}
