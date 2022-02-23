import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Domvalue } from 'src/app/shared/domvalue.model';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ReferenceService } from 'src/app/services/reference.service';
import { Classroom } from 'src/app/shared/classroom.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-list-classroom',
  templateUrl: './list-classroom.component.html',
  styleUrls: ['./list-classroom.component.scss']
})
export class ListClassroomComponent implements OnInit {

  classroomList: any;
  isCreate: boolean = false;
  isEdit: boolean = false;
  displayedColumns: string[] = ['name', 'description', 'category', 'type'];
  
  typeList: string[] = ['LECTURE','LABORATORY'];
  
  newClassroomForm: FormGroup = new FormGroup({});
  domainValueTypes!: Domvalue[];
  selected: string | undefined;
  selectedClassroom: Classroom = new Classroom();
  editClassroomForm: FormGroup = new FormGroup({});
  
  enableDelete: boolean = false;

  constructor(private classroomService: ClassroomService, 
    private referenceService: ReferenceService,
    private formBuilder: FormBuilder,    
    private snack: DialogService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
     this.refreshGrid();
   
    this.referenceService.getCatgeory().subscribe((data : any) =>{
      this.domainValueTypes = data;
    });
  }
  
  createClassroom(val: boolean){
    this.newClassroomForm = this.formBuilder.group({
      'name': new FormControl(''),
      'description': new FormControl(''),
      'coursetype': new FormControl(''),
      'category': new FormControl([])
    })
    this.isEdit = !val;
    this.isCreate = val;
  }
  cancel(){
    this.isEdit = false;
    this.isCreate = false;
    this.selectedClassroom = new Classroom();
    this.editClassroomForm = new FormGroup({});
    
    this.enableDelete = false;
  }
  canDelete(){
    let dataToSend : Classroom;
    let dataWithSched: any;
    dataToSend = this.editClassroomForm.value;

    this.classroomService.canDelete(dataToSend).subscribe(data =>{
      dataWithSched = data;
      console.log(dataWithSched.length);
      if(dataWithSched.length == 0){
        this.enableDelete = true;
      }else{
        this.enableDelete = false;
      }
    }, err=>{
      this.snack.openSnackBar("Unable to delete Classroom");      
    });
  }
  delete(){
    this.isEdit = false;
    this.isCreate = false;
    let dataToSend : Classroom;
    dataToSend = this.editClassroomForm.value;

    this.classroomService.delete(dataToSend).subscribe(data =>{
      this.snack.openSnackBar("Classroom deleted.");
        this.refreshGrid();
        this.cancel();
    }, err=>{
      this.snack.openSnackBar("Unable to delete Classroom");      
    });
    this.refreshGrid();
    this.cancel();

  }
  editClassroom(val: boolean,classroom: any){
    this.selectedClassroom = classroom;
    this.editClassroomForm = this.formBuilder.group({
      'id': new FormControl(this.selectedClassroom.id),
      'name': new FormControl(this.selectedClassroom.name),
      'description': new FormControl(this.selectedClassroom.description),
      'category': new FormControl(this.selectedClassroom.category), 
      'coursetype': new FormControl(this.selectedClassroom.coursetype)
  });
    this.isCreate = !val;
    this.isEdit = val;
    
    this.canDelete();
  }

  saveNew(action: string){
    let dataToSend : Classroom;
    if(action == "CREATE"){
      dataToSend = this.newClassroomForm.value;
    }else{
      dataToSend = this.editClassroomForm.value;
    }
    
    this.classroomService.saveClassroom(dataToSend).subscribe(data =>{
      this.snack.openSnackBar("Classroom saved.");
      this.cancel();
      this.refreshGrid();
    }, err=>{
      this.snack.openSnackBar("Unable to save classroom");      
    });    

    
    
  }

  refreshGrid(){
    this.classroomService.listClassroom().subscribe((data : any) =>{
      this.classroomList = data;
      this.changeDetectorRefs.detectChanges();
    });
  }
  compareCategory(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
 }
 compareType(object1: string, object2: string) {
  return object1 === object2;
}
}
