import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Domvalue } from 'src/app/shared/domvalue.model';
import { CourseService } from 'src/app/services/course.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { Course } from 'src/app/shared/course.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-course',
  templateUrl: './list-course.component.html',
  styleUrls: ['./list-course.component.scss']
})
export class ListCourseComponent implements OnInit {

  courseList: any;
  isCreate: boolean = false;
  isEdit: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'category', 'lectureHours','labHours'];
  
  typeList: string[] = ['LECTURE','LABORATORY'];
  
  newCourseForm: FormGroup = new FormGroup({});
  domainValueTypes!: Domvalue[];
  selected: string | undefined;
  selectedCourse: Course = new Course();
  editCourseForm: FormGroup = new FormGroup({});
  constructor(private courseService: CourseService, 
    private referenceService: ReferenceService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.refreshGrid();
   
    this.referenceService.getCatgeory().subscribe((data : any) =>{
      this.domainValueTypes = data;
    });
  }
  
  createCourse(val: boolean){
    this.newCourseForm = this.formBuilder.group({
      'name': new FormControl(''),
      'description': new FormControl(''),
      'lectureHours': new FormControl(''),
      'labHours': new FormControl(''),
      'category': new FormControl('')
    })
    this.isEdit = !val;
    this.isCreate = val;
  }
  cancel(){
    this.isEdit = false;
    this.isCreate = false;
    this.selectedCourse = new Course();
    this.editCourseForm = new FormGroup({});
  }
  editCourse(val: boolean,course: any){
    this.selectedCourse = course;
    this.editCourseForm = this.formBuilder.group({
      'id': new FormControl(this.selectedCourse.id),
      'name': new FormControl(this.selectedCourse.name),
      'description': new FormControl(this.selectedCourse.description),
      'category': new FormControl(this.selectedCourse.category), 
      'lectureHours': new FormControl(this.selectedCourse.lectureHours),
      'labHours': new FormControl(this.selectedCourse.labHours)
  });
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
        this._snackBar.open("Course saved.");
        this.refreshGrid();
        this.cancel();
    }, err=>{
      this._snackBar.open("Unable to save Course");      
    });
    this.refreshGrid();
    this.cancel();
    
  }

  refreshGrid(){
    this.courseService.listCourse().subscribe((data : any) =>{
      this.courseList = data;
    });
  }
  compareCategory(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
 }

}
