import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SemesterService } from 'src/app/services/semester.service';
import { Semester } from 'src/app/shared/semester.model';

@Component({
  selector: 'app-list-semester',
  templateUrl: './list-semester.component.html',
  styleUrls: ['./list-semester.component.scss']
})
export class ListSemesterComponent implements OnInit {

 
  semesterList: any;
  isCreate: boolean = false;
  isEdit: boolean = false;
  displayedColumns: string[] = [ 'description'];
  
  typeList: string[] = ['LECTURE','LABORATORY'];
  
  newSemesterForm: FormGroup = new FormGroup({});
  selected: string | undefined;
  selectedSemester: Semester = new Semester();
  editSemesterForm: FormGroup = new FormGroup({});
  constructor(private semesterService: SemesterService,  
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.refreshGrid();
   
   
  }
  
  createSemester(val: boolean){
    this.newSemesterForm = this.formBuilder.group({      
      'description': new FormControl('')
    })
    this.isEdit = !val;
    this.isCreate = val;
  }
  cancel(){
    this.isEdit = false;
    this.isCreate = false;
    this.selectedSemester = new Semester();
    this.editSemesterForm = new FormGroup({});
  }
  editSemester(val: boolean,semester: any){
    this.selectedSemester = semester;
    this.editSemesterForm = this.formBuilder.group({
      'id': new FormControl(this.selectedSemester.id),
      'description': new FormControl(this.selectedSemester.description),
  });
    this.isCreate = !val;
    this.isEdit = val;
    
    
  }

  saveNew(action: string){
    let dataToSend : Semester;
    if(action == "CREATE"){
      dataToSend = this.newSemesterForm.value;
    }else{
      dataToSend = this.editSemesterForm.value;
    }
    
    this.semesterService.saveSemester(dataToSend).subscribe(data =>{
        this._snackBar.open("Semester saved.");
        this.refreshGrid();
        this.cancel();
    }, err=>{
      this._snackBar.open("Unable to save Semester");      
    });
    this.refreshGrid();
    this.cancel();
    
  }

  refreshGrid(){
    this.semesterService.listSemester().subscribe((data : any) =>{
      this.semesterList = data;
    });
  }
 
}
