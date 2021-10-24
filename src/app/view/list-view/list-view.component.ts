import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';
import { SemesterService } from 'src/app/services/semester.service';
import { Semester } from 'src/app/shared/semester.model';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Classroom } from 'src/app/shared/classroom.model';
import { SchedDetailService } from 'src/app/services/schedDetail.service';
import { Filter } from 'src/app/shared/filter.model';
import { Dailysched } from 'src/app/shared/dailysched.model';
import { ScheduleDetail } from 'src/app/shared/schedDetail.model';
import { Coursesched } from 'src/app/shared/coursesched.model';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  semesterList!: Semester[];
  newFilterForm: FormGroup = new FormGroup({
    'sem': new FormControl(''),
    'prof': new FormControl(''),
    'room': new FormControl(''),
    'type': new FormControl('1')
  });
  isByProfessor: boolean = true;
  userList!: User[];
  roomList!: Classroom[];
  displayedColumns: string[] = ['Time','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday'];
  schedulerList!: any;

  dailysched: Array<Dailysched> = [
    { time:"06:00-07:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },    
    { time:"07:00-08:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"08:00-09:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"09:00-10:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"10:00-11:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"11:00-12:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"12:00-13:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"13:00-14:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"14:00-15:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"15:00-16:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"16:00-17:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"17:00-18:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
    { time:"18:00-19:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() }
  ];
  response!: ScheduleDetail[];

  isHide: boolean = false;
  docRef: any;
  constructor( private semesterService: SemesterService,
    private classroomService: ClassroomService,
    private schedDetailService: SchedDetailService,
    private userService: UserService,
    private formBuilder: FormBuilder,  
    private snack: DialogService) { }

  ngOnInit(): void {
    this.getSemester();
    this.getUser();
    this.getClassroom();
  }
  getUser(){
    this.userService.getAllProf().subscribe((data : any) =>{
      this.userList = data;
    });
  }
  emptyDataSource(){
    return 
  }
  getSemester(){
    this.semesterService.listSemester().subscribe((data : any) =>{
      this.semesterList = data;
    });
  }
  getClassroom(){
    this.classroomService.listClassroom().subscribe((data : any) =>{
      this.roomList = data;
    });
  }
  filter(){
    let dataToSend = new Filter();
    dataToSend.sem = this.newFilterForm.controls['sem'].value.id;
    dataToSend.type = this.newFilterForm.controls['type'].value;
    if(this.isByProfessor)
      dataToSend.prof = this.newFilterForm.controls['prof'].value.id;
    else
      dataToSend.room = this.newFilterForm.controls['room'].value.id;
    
      this.isHide = false;
    this.schedDetailService.getSchedule(dataToSend).subscribe((data : any) =>{
      this.response = data;      
      if(this.response !== null){
        
        this.dailysched = [
          { time:"06:00-07:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },    
          { time:"07:00-08:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"08:00-09:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"09:00-10:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"10:00-11:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"11:00-12:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"12:00-13:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"13:00-14:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"14:00-15:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"15:00-16:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"16:00-17:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"17:00-18:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() },
          { time:"18:00-19:00",monday:new Coursesched(),tuesday:new Coursesched(),wednesday: new Coursesched(),thursday: new Coursesched(), friday:new Coursesched() }
        ];
          this.convert();
      }
    });
    if(!this.isHide){
      this.snack.openSnackBar('No Schedule found...');
    }
  }
  radioChange(event: any){
    if(event.value === "1"){
      this.isByProfessor = true;
    }else{
      this.isByProfessor = false;
    }
  }
  
  isEmpty(elem: any){
    return Object.keys(elem).length !== 0;
  }
  convert(){
    let i =0;
    let arr = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY'];
    let time = ['06:00','07:00','08:00','09:00','10:00',
        '11:00','12:00','13:00','14:00','15:00','16:00','17:00',
        '18:00'];
    for(var hour of time){             
        for(var val of this.response){
             if(val.startTime === hour){
                let tmp = this.dailysched[i];
                tmp.time = val.startTime +" - "+val.endTime;
                for( var day of arr){   
                  if(val.day === day){ 
                    this.isHide = true;
                    if(val.day === 'MONDAY'){
                      tmp.monday.course = val.schedule.course.name;
                      tmp.monday.section = val.schedule.course.section;
                      tmp.monday.room = val.classroom.name;
                      tmp.monday.hour = val.startTime +" - "+val.endTime;
                      if(val.schedule.professor !== null){
                         tmp.monday.prof = val.schedule.professor.name;
                      }                    
                    }
                    if(val.day === 'TUESDAY'){
                      tmp.tuesday.course = val.schedule.course.name;
                      tmp.tuesday.section = val.schedule.course.section;
                      tmp.tuesday.room = val.classroom.name;                    
                      tmp.tuesday.hour = val.startTime +" - "+val.endTime;
                      if(val.schedule.professor !== null){
                         tmp.tuesday.prof = val.schedule.professor.name;
                      }                    
                    }
                    if(val.day === 'WEDNESDAY'){
                      tmp.wednesday.course = val.schedule.course.name;
                      tmp.wednesday.section = val.schedule.course.section;
                      tmp.wednesday.room = val.classroom.name;   
                      tmp.wednesday.hour = val.startTime +" - "+val.endTime;  
                                        
                      if(val.schedule.professor !== null){
                         tmp.wednesday.prof = val.schedule.professor.name;
                      }                   
                    }
                    if(val.day === 'THURSDAY'){
                      tmp.thursday.course = val.schedule.course.name;
                      tmp.thursday.section = val.schedule.course.section;                      
                      tmp.thursday.room = val.classroom.name;
                      tmp.thursday.hour = val.startTime +" - "+val.endTime;  
                      if(val.schedule.professor !== null){
                         tmp.thursday.prof = val.schedule.professor.name;
                      }                    
                    }
                    if(val.day === 'FRIDAY'){
                      tmp.friday.course = val.schedule.course.name;
                      tmp.friday.section = val.schedule.course.section;  
                      tmp.friday.room = val.classroom.name;
                      tmp.friday.hour = val.startTime +" - "+val.endTime;  
                      if(val.schedule.professor !== null){
                         tmp.friday.prof = val.schedule.professor.name;
                      }                  
                    }
                  }
              }
            }
        }
        i++;
    }
    console.log(this.dailysched);
  }
  

print() {
    var printdata = this.docRef.nativeElement.outerHTML;
     
    var tab = window.open('') as Window;
    tab.document.open();
    tab.document.write(printdata);
    setTimeout(() => {
        tab.stop();
        tab.print();
        tab.close();
    }, 300);
}
}
function ViewChild(arg0: string, arg1: { static: boolean; }) {
  throw new Error('Function not implemented.');
}

