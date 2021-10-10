import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { SemesterService } from 'src/app/services/semester.service';
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

  subscription: Subscription | undefined;
  source = interval(1000);
  
  
  constructor(private schedulerService: SchedulerService, 
    private courseService: CourseService,
    private semesterService: SemesterService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.refreshGrid();   
    this.refreshSemester();
    this.subscription = this.source.subscribe(val => this.refreshGrid());
  }

  createScheduler(val: boolean){
    this.newSchedulerForm = this.formBuilder.group({
      'status': new FormControl(''),
      'description': new FormControl(''),
      'lectureHours': new FormControl(''),
      'labHours': new FormControl(''),
      'category': new FormControl('')
    })
    this.isCreate = val;
  }

  cancel(){
    this.isCreate = false;
  }
  refreshGrid(){
    this.schedulerService.listScheduler().subscribe((data : any) =>{
      this.schedulerList = data;
      this.isCreate = false;
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
}
