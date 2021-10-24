import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Domvalue } from 'src/app/shared/domvalue.model';
import { ReferenceService } from 'src/app/services/reference.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  userList: any;
  isCreate: boolean = false;
  isEdit: boolean = false;
  displayedColumns: string[] = ['name', 'role', 'specialization', 'hours'];
  
  typeList: string[] = ['PROFESSOR','ADMIN','DEPARTMENT_HEAD'];
  
  newUserForm: FormGroup = new FormGroup({});
  domainValueTypes!: Domvalue[];
  selected: string | undefined;
  selectedUser: User = new User();
  editUserForm: FormGroup = new FormGroup({});
  constructor(private userService: UserService, 
    private referenceService: ReferenceService,
    private formBuilder: FormBuilder,
    private snack: DialogService) { }

  ngOnInit(): void {
     this.refreshGrid();
   
    this.referenceService.getCatgeory().subscribe((data : any) =>{
      this.domainValueTypes = data;
    });
  }
  
  createUser(val: boolean){
    this.newUserForm = this.formBuilder.group({
      'name': new FormControl(''),
      'password': new FormControl(''),
      'specialization': new FormControl([]), 
      'role': new FormControl(''),
      'allocatedHours': new FormControl('')
    })
    this.isEdit = !val;
    this.isCreate = val;
  }
  cancel(){
    this.isEdit = false;
    this.isCreate = false;
    this.selectedUser = new User();
    this.editUserForm = new FormGroup({});
  }
  editUser(val: boolean,User: any){
    this.selectedUser = User;
    this.editUserForm = this.formBuilder.group({
      'id': new FormControl(this.selectedUser.id),
      'name': new FormControl(this.selectedUser.name),
      'password': new FormControl(this.selectedUser.password),
      'specialization': new FormControl(this.selectedUser.specialization), 
      'role': new FormControl(this.selectedUser.role),
      'allocatedHours': new FormControl(this.selectedUser.allocatedHours)
  });
    this.isCreate = !val;
    this.isEdit = val;
    
    
  }

  saveNew(action: string){
    let dataToSend : User;
    if(action == "CREATE"){
      dataToSend = this.newUserForm.value;
    }else{
      dataToSend = this.editUserForm.value;
    }
    
    this.userService.saveUser(dataToSend).subscribe(data =>{
      this.snack.openSnackBar('User saved...');
        this.refreshGrid();
        this.cancel();
    }, err=>{
      this.snack.openSnackBar("Unable to save User");      
    });
    this.refreshGrid();
    this.cancel();
    
  }

  refreshGrid(){
    this.userService.listUser().subscribe((data : any) =>{
      this.userList = data;
    });
  }
  compareCategory(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
 }

}
