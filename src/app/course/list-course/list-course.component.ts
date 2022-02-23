import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Domvalue } from 'src/app/shared/domvalue.model';
import { CourseService } from 'src/app/services/course.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { Course } from 'src/app/shared/course.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Classroom } from 'src/app/shared/classroom.model';
import { Semester } from 'src/app/shared/semester.model';
import { DialogService } from 'src/app/services/dialog.service';
import { SemesterService } from 'src/app/services/semester.service';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  courseList: any;
  isCreate: boolean = false;
  isEdit: boolean = false;
  displayedColumns: string[] = ['name', 'description','section', 'category', 'lectureHours','lectureRoom','labHours','labRoom'];
  
  typeList: string[] = ['LECTURE','LABORATORY'];
  
  newCourseForm: FormGroup = new FormGroup({});
  domainValueTypes!: Domvalue[];
  selected: string | undefined;
  selectedCourse: Course = new Course();
  editCourseForm: FormGroup = new FormGroup({});
  lectureRoomList!: Classroom[];
  labRoomList!: Classroom[];
  semList!: Semester[];
  enableDelete: boolean = false;

  constructor(private courseService: CourseService, 
    private referenceService: ReferenceService,
    private classroomService: ClassroomService,
    private semesterService: SemesterService,
    private formBuilder: FormBuilder,
    private snack: DialogService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
     this.refreshGrid();
   
     this.classroomService.getALlLabRoom().subscribe((data : any) =>{
       this.labRoomList = data;
     });
     this.semesterService.listSemester().subscribe((data : any) =>{
      this.semList = data;
    });
     this.classroomService.getALlLectureRoom().subscribe((data : any) =>{
      this.lectureRoomList = data;
    });
    this.referenceService.getCatgeory().subscribe((data : any) =>{
      this.domainValueTypes = data;
    });
  }
  
  createCourse(val: boolean){
    this.newCourseForm = this.formBuilder.group({
      'name': new FormControl(''),
      'description': new FormControl(''),
      'section': new FormControl(''),
      'lectureHours': new FormControl(''),
      'lectureRoom': new FormControl(''),
      'labRoom': new FormControl(''),
      'labHours': new FormControl(''),
      'category': new FormControl(''),
      'semester': new FormControl('')
    })
    this.isEdit = !val;
    this.isCreate = val;
  }
  cancel(){
    this.isEdit = false;
    this.isCreate = false;
    this.selectedCourse = new Course();
    this.editCourseForm = new FormGroup({});
    this.enableDelete = false;
  }

  canDelete(){
    let dataToSend : Course;
    let dataWithSched: any;
    dataToSend = this.editCourseForm.value;

    this.courseService.canDelete(dataToSend).subscribe(data =>{
      dataWithSched = data;
      console.log(dataWithSched.length);
      if(dataWithSched.length == 0){
        this.enableDelete = true;
      }else{
        this.enableDelete = false;
      }
    }, err=>{
      this.snack.openSnackBar("Unable to delete Course");      
    });
  }
  delete(){
    this.isEdit = false;
    this.isCreate = false;
    let dataToSend : Course;
    dataToSend = this.editCourseForm.value;

    this.courseService.delete(dataToSend).subscribe(data =>{
      this.snack.openSnackBar("Course deleted.");
        this.refreshGrid();
        this.cancel();
    }, err=>{
      this.snack.openSnackBar("Unable to delete Course");      
    });
    this.refreshGrid();
    this.cancel();

  }
  editCourse(val: boolean,course: any){
    this.selectedCourse = course;
    this.editCourseForm = this.formBuilder.group({
      'id': new FormControl(this.selectedCourse.id),
      'name': new FormControl(this.selectedCourse.name),
      'description': new FormControl(this.selectedCourse.description),      
      'section': new FormControl(this.selectedCourse.section),
      'category': new FormControl(this.selectedCourse.category), 
      'lectureHours': new FormControl(this.selectedCourse.lectureHours),
      'labHours': new FormControl(this.selectedCourse.labHours),
      'labRoom': new FormControl(this.selectedCourse.labRoom),
      'lectureRoom': new FormControl(this.selectedCourse.lectureRoom),
      'semester': new FormControl(this.selectedCourse.semester)
  });
   
    this.canDelete();
    this.isCreate = !val;
    this.isEdit = val;
    
      }

  saveNew(action: string){
    let dataToSend : Course;
    if(action == "CREATE"){
      dataToSend = this.newCourseForm.value;
    }else{
      dataToSend = this.editCourseForm.value;
    }
    
    this.courseService.saveCourse(dataToSend).subscribe(data =>{
      this.snack.openSnackBar("Course saved.");
        this.cancel();
        this.refreshGrid();
    }, err=>{
      this.snack.openSnackBar("Unable to save Course");      
    });
  
    
  }

  refreshGrid(){
    this.courseService.listCourse().subscribe((data : any) =>{
      this.courseList = data;
      this.changeDetectorRefs.detectChanges();
    });
  }
  compareCategory(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
 }

}
